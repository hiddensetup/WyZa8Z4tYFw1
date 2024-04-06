<?php
require('../../include/functions.php');

// Get the 'messenger-page-token' from your settings using sb_get_multi_setting
$facebookPageToken = sb_get_multi_setting('messenger-pages', 'messenger-page-token');

$raw = file_get_contents('php://input');
if ($raw) {
    $payload = json_decode($raw, true);
    if (isset($payload['object']) && $payload['object'] === 'page') {
        foreach ($payload['entry'] as $entry) {
            foreach ($entry['messaging'] as $messaging_event) {
                // Handle file attachments
                if (isset($messaging_event['message']['attachments'])) {
                    foreach ($messaging_event['message']['attachments'] as $attachment) {
                        if ($attachment['type'] === 'image') {
                            $attachment_id = $attachment['id'];
                            $image_url = $attachment['payload']['url'];

                        }
                    }
                }
                sb_messenger_listener($messaging_event);
            }
        }
    }
}
?>
