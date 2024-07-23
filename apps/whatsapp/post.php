<?php
require('../../include/functions.php');

// Retrieve the blacklist
$blacklist_json = sb_get_multi_setting('blacklist', 'blacklist');
$blacklist = json_decode($blacklist_json, true);
if (!is_array($blacklist)) {
    $blacklist = [];
}

// Check if the cloud-active setting is enabled
$cloud_active = sb_get_multi_setting('whatsapp-cloud', 'cloud-active');
if (!$cloud_active) {
    die();
}

if (isset($_GET['hub_mode']) && $_GET['hub_mode'] == 'subscribe') {
    $verify_token = sb_get_multi_setting('whatsapp-cloud', 'whatsapp-cloud-key', 'cloud-active');
    if ($_GET['hub_verify_token'] == $verify_token) {
        echo $_GET['hub_challenge'];
    }
    die();
}

$raw = file_get_contents('php://input');
file_put_contents('debug.json', $raw);

flush();

if (function_exists('fastcgi_finish_request')) {
    fastcgi_finish_request();
}

if ($raw) {
    $response = json_decode($raw, true);

    if (isset($response['entry'], $response['entry'][0]['changes'])) {
        $response = $response['entry'][0]['changes'][0]['value'];
    }

    $error = isset($response['statuses']) && is_array($response['statuses']) ? $response['statuses'][0]['errors'][0]['code'] : false;

    if (isset($response['messages']) && !$error) {
        $GLOBALS['SB_FORCE_ADMIN'] = true;
        $user_id = false;
        $conversation_id = false;
        $phone = '+' . $response['contacts'][0]['wa_id'];
        $user = sb_get_user_by('phone', $phone);
        $phone_number_id = $response['metadata']['phone_number_id'];
        $department = sb_whatsapp_cloud_get_token($phone_number_id, true);
        $payload = [];
        $message = '';
        $attachments = [];
        $reply_msg = '';
        $new_conversation = false;

        $message_2 = $response['messages'][0];
        $replyid = null;

        // Check if the incoming message has context and is not forwarded
        if (isset($message_2['context']) && $message_2['source'] !== 'forwarded') {
            $replyid = $message_2['context']['id'];
        }

        if ($replyid !== null) {
            $original_message = sb_db_get('SELECT * FROM sb_messages WHERE payload LIKE "%\"' . sb_db_escape($replyid) . '\"%"');
            if ($original_message) {
                $payload['waid'] = $original_message['waid'];
                
                // Always include the original message text, even if it's empty
                $original_text = !empty($original_message['message']) ? $original_message['message'] : "[No text]";
                $reply_msg = '{+' . $message_2['context']['from'] . '@s.whatsapp.net} 〚' . $original_text . '〛';
                
                $attachment_found = false;
                
                // Check if the original message had attachments
                if (!empty($original_message['attachments'])) {
                    $original_attachments = json_decode($original_message['attachments'], true);
                    if (is_array($original_attachments)) {
                        foreach ($original_attachments as $attachment) {
                            if (isset($attachment[1]) && file_exists($attachment[1])) {
                                // Add existing attachment to the current message's attachments
                                $attachments[] = $attachment;
                                $attachment_found = true;
                            }
                        }
                    }
                }
                
                // If no attachments were found, add a note
                if (!$attachment_found) {
                    $reply_msg .= "\n";
                }
            } else {
                $reply_msg = "〚Reply〛 \n" . $original_message['message'];
            }
        }
        
        // Process the message type
        $message_type = $message_2['type']; // Define the message type
        
        switch ($message_type) {
            case 'location':
                $lat = $message_2['location']['latitude'];
                $lng = $message_2['location']['longitude'];
                $address = parse_location($lat, $lng);
                $message = $address;
                $payload['latitude']  = $lat;
                $payload['longitude'] = $lng;
                break;

            case 'reaction':
                $emoji = html_entity_decode($message_2['reaction']['emoji'], ENT_COMPAT, 'UTF-8');
                $message = "#" . strip_tags($emoji);
                break;

            case 'button':
                $message = $message_2['button']['text'];
                break;

            case 'text':
                $message = $message_2['text']['body'];
                break;

            case 'contacts':
                foreach ($message_2['contacts'] as $contact) {
                    $message .= get_contact_data($contact);
                }
                break;

            case 'interactive':
                $message = $message_2['interactive'][$message_2['interactive']['type']]['title'];
                break;

            case 'document':
            case 'image':
            case 'audio':
            case 'video':
            case 'sticker':
                handle_media_message($message_2, $phone_number_id);
                break;

            default:
                handle_other_messages($message_2, $phone_number_id);
                break;
        }

        if ($reply_msg != '') {
            $message = $reply_msg . ' ' . $message;
        }

        $payload['waid'] = $message_2['id'];
        $payload = json_encode($payload);
        // file_put_contents('json_log.txt', print_r($response, true));

        // User and conversation
        if (!$user) {
            $name = sb_split_name($response['contacts'][0]['profile']['name']);
            $extra = ['phone' => [$phone, 'Phone']];


            $user_id = sb_add_user(['first_name' => $name[0], 'last_name' => $name[1], 'user_type' => 'lead'], $extra);
            $user = sb_get_user($user_id);
        } else {
            $user_id = $user['id'];
            $conversation_id = sb_whatsapp_get_conversation_id($user_id);
        }

        $GLOBALS['SB_LOGIN'] = $user;

        if (!$conversation_id) {
            $conversation_id = sb_isset(sb_new_conversation($user_id, 2, '', $department, -1, 'wa', $phone_number_id), 'details', [])['id'];
            $new_conversation = true;
        } else if ($payload && sb_isset(sb_db_get('SELECT COUNT(*) AS `count` FROM sb_messages WHERE conversation_id =  ' . $conversation_id . ' AND payload LIKE "%' . sb_db_escape($payload) . '%"'), 'count') != 0) {
            die();
        }

        // Send message
        $response = sb_send_message($user_id, $conversation_id, $message, $attachments, 2, $payload);

        // Dialogflow, Notifications, Bot messages
        $response_extarnal = sb_messaging_platforms_functions($conversation_id, $message, $attachments, $user, ['source' => 'wa', 'platform_value' => $phone, 'new_conversation' => $new_conversation]);

        // Queue
        if (sb_get_multi_setting('queue', 'queue-active')) {
            sb_queue($conversation_id, $department, true);
        }

        // Online status
        sb_update_users_last_activity($user_id);

        $GLOBALS['SB_FORCE_ADMIN'] = false;
    } else if ($error === 470 || $error == 131047) {
        $phone = '+' . $response['contacts'][0]['wa_id'];
        $user = sb_get_user_by('phone', $phone);

        if (!isset($response['ErrorMessage']) && isset($response['MessageStatus'])) {
            $response['ErrorMessage'] = $response['MessageStatus'];
        }

        if ($user) {
            $agents_ids = sb_get_agents_ids();
            $message = sb_db_get('SELECT id, message, attachments, conversation_id FROM sb_messages WHERE user_id IN (' . implode(',', $agents_ids) . ') AND conversation_id IN (SELECT id FROM sb_conversations WHERE source = "wa" AND user_id = ' . $user['id'] . ') ORDER BY id DESC LIMIT 1');

            if ($message) {
                $GLOBALS['SB_FORCE_ADMIN'] = true;
                $conversation_id = $message['conversation_id'];
                $user_language = sb_get_user_language($user['id']);
                $user_name = sb_get_user_name($user);
                $user_email = sb_isset($user, 'email', '');
                $conversation_url_parameter = $conversation_id && $user ? ('?conversation=' . $conversation_id . '&token=' . $user['token']) : '';

                // WhatsApp Template
                $phone_number_id = $conversation_id && is_array(sb_get_setting('whatsapp-cloud-numbers')) ? sb_isset(sb_db_get('SELECT extra FROM sb_conversations WHERE id = ' . sb_db_escape($conversation_id, true)), 'extra') : false;
                $response_template = sb_whatsapp_send_template($phone, $user_language, $conversation_url_parameter, $user_name, $user_email, false, $phone_number_id);

                if ($response_template && isset($response_template['messages'])) {
                    $response = ['whatsapp-template-fallback' => true];
                } else if (isset($response_template['errors'])) {
                    $response = ['ErrorCode' => true, 'ErrorMessage' => $response_template['errors'][0]['details']];
                }

                sb_update_message($message['id'], false, false, $response);
                $GLOBALS['SB_FORCE_ADMIN'] = false;
            }
        }
    }
}

function parse_location($lat, $lng)
{
    $google_maps_url = 'https://maps.google.com/maps?q=' . $lat . ',' . $lng;
    return $google_maps_url;
}

function sb_whatsapp_get_conversation_id($user_id)
{
    return sb_isset(sb_db_get('SELECT id FROM sb_conversations WHERE source = "wa" AND user_id = ' . $user_id . ' ORDER BY id DESC LIMIT 1'), 'id');
}

function sb_whatsapp_get_extension($mime_type)
{
    switch ($mime_type) {
        case 'video/mp4':
            return '.mp4';
        case 'image/gif':
            return '.gif';
        case 'image/png':
            return '.png';
        case 'image/jpg':
        case 'image/jpeg':
            return '.jpg';
        case 'image/webp':
        case 'image/webp;type=sticker':
            return '.webp';
        case 'audio/ogg':
            return '.ogg';
        case 'audio/mpeg':
            return '.mp3';
        case 'audio/amr':
            return '.amr';
        case 'application/pdf':
            return '.pdf';
    }
    // Handle OGG and MP3 formats
    if (strpos($mime_type, 'audio/ogg') !== false) {
        return '.ogg';
    } elseif (strpos($mime_type, 'audio/mpeg') !== false) {
        return '.mp3';
    } else {
        return false;
    }
}

function get_contact_data($entries, $label)
{
    $result = '';
    if (isset($entries)) {
        foreach ($entries as $entry) {
            $value = sb_isset($entry, 'phone', sb_isset($entry, 'email', sb_isset($entry, 'formatted_name', '')));
            $type = sb_isset($entry, 'type', 'Unknown');
            $result .= "($type): $value, ";
        }
        // Remove trailing comma and space
        $result = rtrim($result, ', ');
    }
    return $result;
}

function handle_media_message($message_2, $phone_number_id)
{
    global $message, $attachments;

    $file_data = $message_2[$message_2['type']];
    $mime = sb_isset($file_data, 'mime_type');
    $file_ext = sb_whatsapp_get_extension($mime);
    $file_name = sb_isset($file_data, 'filename', $file_data['id']) . $file_ext;
    $media_url = sb_isset(sb_whatsapp_cloud_curl($file_data['id'], false, $phone_number_id, 'GET'), 'url');

    if ($media_url) {
        $url = sb_download_file($media_url, $file_name, $mime, ['Authorization: Bearer ' . sb_whatsapp_cloud_get_token($phone_number_id)]);
    }

    $attachments = [[basename($url), $url]];

    // Check if there is a caption
    if (isset($file_data['caption']) && $file_data['caption'] != $file_name) {
        $message .= ': ' . $file_data['caption'];
    }
}

function handle_other_messages($message_2, $phone_number_id)
{
    global $message, $attachments;

    $file_data = $message_2[$message_2['type']];
    $mime = sb_isset($file_data, 'mime_type');
    file_put_contents('img_data.txt', print_r(count($file_data), true), FILE_APPEND);
    $file_ext = sb_whatsapp_get_extension($mime);
    $file_name = sb_isset($file_data, 'filename', $file_data['id']) . $file_ext;
    $media_url = sb_isset(sb_whatsapp_cloud_curl($file_data['id'], false, $phone_number_id, 'GET'), 'url');

    if ($media_url) {
        $url = sb_download_file($media_url, $file_name, $mime, ['Authorization: Bearer ' . sb_whatsapp_cloud_get_token($phone_number_id)]);
    }

    file_put_contents('download.txt', print_r(['url' => $media_url, 'file' => $file_data, 'base' => 'Authorization: Bearer ' . sb_whatsapp_cloud_get_token($phone_number_id)], true), FILE_APPEND);
    array_push($attachments, [basename($url), $url]);

    // Set the $message variable to the caption
    $message = isset($file_data['caption']) ? $file_data['caption'] : '';

    // Debugging: output the $message variable
    file_put_contents('message_debug.txt', print_r(['message' => $message], true), FILE_APPEND);
}


die();
