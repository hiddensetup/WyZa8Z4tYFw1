<?php
define('SB_WAWEB', 'Go');

function sb_waweb_send_message($to, $message = '', $attachments = [])
{
    if (empty($message) && empty($attachments)) return json_encode(['status' => 'error', 'message' => 'Message and attachments are empty']);

    $to = trim(str_replace('+', '', $to));

   
        // Retrieve and process the blacklist
        $blacklist_waweb_string = sb_get_setting('blacklist_waweb');
        $blacklist_waweb = array_map('trim', explode(',', $blacklist_waweb_string)); 
        

        // Check if sender's phone is blacklist
        if (in_array($to, $blacklist_waweb)) {
            die(); 
        }

    $user = sb_get_user_by('phone', $to);
    $response = false;
    $merge_field = false;

    // Custom Messaging
    $goproxy = !empty(sb_get_multi_setting('waweb-go', 'waweb-go-active'));

    // Security
    if (!sb_is_agent() && !sb_is_agent($user) && sb_get_active_user_ID() != sb_isset($user, 'id') && empty($GLOBALS['SB_FORCE_ADMIN'])) {
        return json_encode(['status' => 'error', 'message' => 'Security error']);
    }

    // Send the message
    if (is_string($message)) {
        $message = sb_merge_fields($message, [$user]);
        $message = sb_waweb_rich_messages($message, ['user_id' => $user['id']]);
        if ($message[1]) $attachments = $message[1];
        $message = $message[0];
    }

    // Handle attachments
    $attachments_count = count($attachments);
    $supported_mime_types = ['jpg', 'webp', 'jpeg', 'png', 'gif', 'pdf', 'mp3', 'ogg', 'amr', 'mp4', 'mpeg'];
    foreach ($attachments as $attachment) {
        $extension = strtolower(sb_isset(pathinfo($attachment[1]), 'extension'));
        if (in_array($extension, $supported_mime_types)) {
            // handle attachment
        } else {
            $attachment_info = "Attachment: " . $attachment[1] . " (" . $extension . ")";
            // send a text message with the attachment info
        }
    }

    if ($goproxy) {
        $wawebGoUrl = WX_TOKEN;
        $goUrl = WX_URL_GO; // Use the base URL constant
        $port = WX_PORT_GO;
        $url = $goUrl . ':' . $port . "/api/message/send?auth=" . $wawebGoUrl;
        $header = ['Content-Type: application/json'];
        $query = [
            "receiver" => $to,
            "message"  => $message,
            "caption"  => $message,
        ];

        if ($attachments_count) {
            $query['media'] = str_replace(' ', '%20', $attachments[0][1]);
            $response = sb_curl($url, json_encode($query), $header);
        } else {
            $response = sb_curl($url, json_encode($query), $header);
        }
        if ($attachments_count > 1) {
            for ($i = 1; $i < $attachments_count; $i++) {
                $query = ["receiver" => $to];
                $query['media'] = str_replace(' ', '%20', $attachments[$i][1]);
                $response = sb_curl($url, json_encode($query), $header);
            }
        }
        return $response;
    } 
}

function sb_waweb_rich_messages($message, $extra = false)
{
    $shortcode = sb_get_shortcode($message);
    $attachments = false;
    if ($shortcode) {
        $shortcode_id = sb_isset($shortcode, 'id', '');
        $shortcode_name = $shortcode['shortcode_name'];
        $message = trim(str_replace($shortcode['shortcode'], '', $message) . (isset($shortcode['title']) ? ' *' . sb_($shortcode['title']) . '*' : '') . PHP_EOL . sb_(sb_isset($shortcode, 'message', '')));
        switch ($shortcode_name) {
            case 'image':
                $attachments = [[$shortcode['url'], $shortcode['url']]];
                break;
            case 'rating':
                $message = ['type' => 'interactive', 'interactive' => [
                    'type' => 'button',
                    'body' => ['text' => $shortcode['message']],
                    'action' => [
                        'buttons' => [
                            ['type' => 'reply', 'reply' => ['id' => 'rating-positive', 'title' => sb_($shortcode['label-positive'])]],
                            ['type' => 'reply', 'reply' => ['id' => 'rating-negative', 'title' => sb_($shortcode['label-negative'])]]
                        ]
                    ]
                ]];
                if (!empty($shortcode['title'])) {
                    $message['interactive']['header'] = ['type' => 'text', 'text' => $shortcode['title']];
                }
        }
    }
    return [$message, $attachments];
}
