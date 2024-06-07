<?php
define('SB_WAWEB', 'Go');

function sb_waweb_send_message($to, $message = '', $attachments = [])
{

    // Check if the message contains "~Registro de contacto"
    if (strpos($message, '*~Registro de contacto*') !== false) {
        return ['success' => false, 'error' => 'Template sent'];
    }

    if (empty($message) && empty($attachments)) return false;

    $to = trim(str_replace('+', '', $to));
    $user = sb_get_user_by('phone', $to);
    $response = false;
    $merge_field = false;

    // Custom Messaging
    $goproxy = !empty(sb_get_multi_setting('waweb-go', 'waweb-go-active')) && !empty(sb_get_multi_setting('waweb-go', 'waweb-go-url'));

    // Security
    if (!sb_is_agent() && !sb_is_agent($user) && sb_get_active_user_ID() != sb_isset($user, 'id') && empty($GLOBALS['SB_FORCE_ADMIN'])) {
        return new SBError('security-error', 'sb_waweb_send_message');
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
        $wawebGoUrl = sb_get_multi_setting('waweb-go', 'waweb-go-url');
        $goUrl = WX_URL_GO; // Use the base URL constant
        $port = sb_get_multi_setting('waweb-go', 'waweb-go-qr');
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
    } else {
        if ($message) {
            $query = ['messaging_product' => 'waweb', 'recipient_type' => 'individual', 'to' => $to];
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
