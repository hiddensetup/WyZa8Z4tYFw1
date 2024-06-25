<?php
define('SB_WHATSAPP', 'CLOUD');

function sb_whatsapp_send_message($to, $message = '', $attachments = [], $phone_number_id = false) //$payload
{
    if (strpos($message, '*~Registro de contacto*') !== false) {
        return ['success' => false, 'error' => ''];
    }
    if (empty($message) && empty($attachments)) {
        return ['success' => false, 'error' => 'Message or attachments cannot be empty'];
    }

    // Check if WhatsApp cloud is active
    $cloud_active = sb_get_multi_setting('whatsapp-cloud', 'cloud-active');
    if (!$cloud_active) {
        return ['success' => false, 'error' => 'WhatsApp cloud is not active'];
    }

    // If WhatsApp cloud is active, proceed with sending message
    $cloud_phone_id = sb_get_multi_setting('whatsapp-cloud', 'whatsapp-cloud-phone-id');
    $to = trim(str_replace('+', '', $to));
    $user = sb_get_user_by('phone', $to);
    $response = false;
    $merge_field = false;
    $message = sb_merge_fields($message, [$user]);
    $message = sb_whatsapp_rich_messages($message, ['user_id' => $user['id']]);
    if ($message[1]) $attachments = $message[1];
    $message = $message[0];
    $interactive_buttons = get_interactive_buttons($message);
    if ($interactive_buttons) {
        $message_without_buttons = remove_interactive_buttons($message);
        $query = ['messaging_product' => 'whatsapp', 'recipient_type' => 'individual', 'to' => $to, 'type' => 'interactive', 'interactive' => ['type' => 'button', 'body' => ['text' => $message_without_buttons,], 'action' => ['buttons' => $interactive_buttons,],],];
        $response = $cloud_phone_id ? sb_whatsapp_cloud_curl("$cloud_phone_id/messages", $query, $phone_number_id) : sb_whatsapp_cloud_curl('messages', $query, $cloud_phone_id);
    } else {
        foreach ($attachments as $attachment) {
            $link = $attachment[1];
            $media_type = determine_media_type($link);
            $query = ['messaging_product' => 'whatsapp', 'recipient_type' => 'individual', 'to' => $to, 'type' => $media_type,];
            if (in_array($media_type, ['audio', 'video'])) {
                $query[$media_type] = ['id' => $attachment[2]];
            } elseif ($media_type == 'image') {
                $query['image'] = ['link' => $link];
            } elseif ($media_type == 'document') {
                $query['document'] = ['link' => $link, 'caption' => $attachment[0]];
            }
            $response = $cloud_phone_id ? sb_whatsapp_cloud_curl("$cloud_phone_id/messages", $query) : sb_whatsapp_cloud_curl('messages', $query);
        }
        
        if ($message_without_buttons = remove_interactive_buttons($message)) {
            $query = ['messaging_product' => 'whatsapp', 'recipient_type' => 'individual', 'to' => $to, 'type' => 'text', 'text' => ['preview_url' => has_preview_url($message_without_buttons), 'body' => $message_without_buttons,],];
            $response = $cloud_phone_id ? sb_whatsapp_cloud_curl("$cloud_phone_id/messages", $query, $phone_number_id) : sb_whatsapp_cloud_curl('messages', $query);
        }
    }

    // // Log the response to a text file
    // $logFile = __DIR__ . '/response_log.txt';
    // file_put_contents($logFile, json_encode($response) . PHP_EOL, FILE_APPEND);

    return $response;
}

function has_preview_url($text)
{
    return (bool)preg_match('/(https?:\/\/\S+)/', $text);
}

function determine_media_type($link)
{
    $type = strtolower(sb_isset(pathinfo($link), 'extension'));
    switch ($type) {
        case 'jpg':
        case 'jpeg':
        case 'png':
            return 'image';
        case 'mp4':
        case '3gpp':
            return 'video';
        case 'aac':
        case 'mpeg':
        case 'mp3':
            return 'audio';
        default:
            return 'document';
    }
}

function sb_whatsapp_cloud_curl($url_part, $post_fields = false, $phone_number_id = false, $type = 'POST')
{
    $url = "https://graph.facebook.com/v18.0/$url_part";
    $headers = ['Authorization: Bearer ' . sb_whatsapp_cloud_get_token($phone_number_id), 'Content-Type: application/json',];
    $response = sb_curl($url, json_encode($post_fields), $headers, $type);

    // Log the response to a text file
    $logFile = __DIR__ . '/response_log.txt';
    file_put_contents($logFile, json_encode($response) . PHP_EOL, FILE_APPEND);


    return is_string($response) ? json_decode($response, true) : $response;
}

function sb_whatsapp_cloud_get_token($phone_number_id = false, $return_department = false)
{
    if ($phone_number_id) {
        $numbers = sb_get_setting('whatsapp-cloud-numbers');
        foreach ($numbers as $number) {
            if ($number['whatsapp-cloud-numbers-phone-id'] == $phone_number_id) {
                return trim($number[$return_department ? 'whatsapp-cloud-numbers-department' : 'whatsapp-cloud-numbers-token']);
            }
        }
    }
    return trim($return_department ? sb_get_setting('whatsapp-department') : sb_get_multi_setting('whatsapp-cloud', 'whatsapp-cloud-token'));
}

function sb_whatsapp_send_meta_template($template)
{
    $query = ['messaging_product' => 'whatsapp', 'recipient_type' => 'individual', 'to' => $template['to'], 'type' => $template['type'],];
    $cloud_phone_id = sb_get_multi_setting('whatsapp-cloud', 'whatsapp-cloud-phone-id');
    $variables = [];
    foreach ($template['variables'] as $parameter) {
        $variables[] = ["type" => "text", "text" => $parameter];
    };
    $query['template'] = ['name' => $template['template_name'], 'language' => ['code' => $template['language']], 'components' => [],];
    if ($template['type'] === 'template') {
        $query['template']['components'][] = ["type" => "body", "parameters" => $variables];
    }
    $response = sb_whatsapp_cloud_curl($cloud_phone_id . '/messages', $query, $cloud_phone_id);
    return $response;
}

function sb_whatsapp_send_template($phone, $user_language = '', $conversation_url_parameter = '', $user_name = '', $user_email = '', $template_name = false, $phone_number_id = false)
{
    if ($template) {
        return sb_whatsapp_send_message($phone, str_replace(['{conversation_url_parameter}', '{recipient_name}', '{recipient_email}'], [$conversation_url_parameter, $user_name, $user_email], sb_translate_string($template, $user_language)), [], $phone_number_id);
    } else {
        $settings = sb_get_setting('whatsapp-template-cloud');
        $template_languages = explode(',', str_replace(' ', '', $settings['whatsapp-template-cloud-languages']));
        $template_language = false;
        for ($i = 0; $i < count($template_languages); $i++) {
            if (substr($template_languages[$i], 0, 2) == $user_language) {
                $template_language = $template_languages[$i];
                break;
            }
        }
        if (!$template_language) $template_language = $template_languages[0];
        $query = ['type' => 'template', 'template' => ['name' => $template_name ? $template_name : $settings['whatsapp-template-cloud-name'], 'language' => ['code' => $template_language]]];
        $parameter_sections = [$settings['whatsapp-template-cloud-parameters-header'], $settings['whatsapp-template-cloud-parameters-body']];
        $components = [];
        for ($i = 0; $i < 2; $i++) {
            if ($parameter_sections[$i]) {
                $parameters = explode(',', trim(str_replace(['{conversation_url_parameter}', '{recipient_name}', '{recipient_email}'], [$conversation_url_parameter, $user_name, $user_email], $parameter_sections[$i])));
                $count = count($parameters);
                if ($count) {
                    for ($j = 0; $j < $count; $j++) {
                        $parameters[$j] = ['type' => 'text', 'text' => $parameters[$j]];
                    }
                    array_push($components, ['type' => $i ? 'body' : 'header', 'parameters' => $parameters]);
                }
            }
        }
        if (count($components)) $query['template']['components'] = $components;
        return sb_whatsapp_send_message($phone, $query, $phone_number_id);
    }
    return false;
}

function sb_whatsapp_create_template_parameter($type, $text, $conversation_url_parameter, $user_name, $user_email)
{
    $parameter = ['type' => $type];
    $parameter[$type] = str_replace(['{conversation_url_parameter}', '{recipient_name}', '{recipient_email}'], [$conversation_url_parameter, $user_name, $user_email], $text);
    if (!$parameter[$type]) $parameter[$type] = '[]';
    return $parameter;
}

function generate_unique_button_id()
{
    return 'UNIQUE_BUTTON_ID_' . time() . '_' . rand(1000, 9999);
}

function remove_interactive_buttons($message)
{
    return preg_replace('/\s*\[.*?\]\s*/', ' ', $message);
}

function get_interactive_buttons($message)
{
    if (preg_match_all('/\[(.+?)\]/', $message, $matches)) {
        $button_texts = $matches[1];
        $buttons = [];
        foreach ($button_texts as $button_text) {
            $button_id = generate_unique_button_id();
            $buttons[] = ['type' => 'reply', 'reply' => ['id' => $button_id, 'title' => trim($button_text),],];
        }
        return $buttons;
    }
    return false;
}

function sb_whatsapp_rich_messages($message, $extra = false)
{
    $shortcode = sb_get_shortcode($message);
    $attachments = false;

    if ($shortcode) {
        switch ($shortcode['shortcode_name']) {
            case 'rating':
                $message = [
                    'type' => 'interactive',
                    'interactive' => [
                        'type' => 'button',
                        'body' => ['text' => $shortcode['message']],
                        'action' => [
                            'buttons' => [
                                [
                                    'type' => 'reply',
                                    'reply' => ['id' => 'rating-positive', 'title' => sb_($shortcode['label-positive'])]
                                ],
                                [
                                    'type' => 'reply',
                                    'reply' => ['id' => 'rating-negative', 'title' => sb_($shortcode['label-negative'])]
                                ]
                            ]
                        ]
                    ]
                ];
                
                if (!empty($shortcode['title'])) {
                    $message['interactive']['header'] = ['type' => 'text', 'text' => $shortcode['title']];
                }
                break;

            case 'image':
                $attachments = [[$shortcode['url'], $shortcode['url']]];
                $message = ''; // Clear the message as we're sending an image
                break;

            // Add other cases here if needed
        }
    }

    return [$message, $attachments];
}