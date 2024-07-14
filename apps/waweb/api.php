<?php
file_put_contents("api.txt", print_r($_POST, true), FILE_APPEND);

$raw = file_get_contents('php://input');
flush();
if (function_exists('fastcgi_finish_request')) {
    fastcgi_finish_request();
}

try {
    if (!empty($_POST['Chat'])) {
        require('../../include/functions.php');
        
        // Check if 'waweb-go' is active
        if (empty(sb_get_multi_setting('waweb-go', 'waweb-go-active'))) {
            die();
        }

        $response = $_POST;

        // Ensure conversation or attachment is present
        if (empty($response['Conversation']) && empty($_FILES["attachment"])) {
            die();
        }

        $GLOBALS['SB_FORCE_ADMIN'] = true;

        $adminPhone = sb_get_multi_setting('waweb-go', 'waweb-go-phone');
        $phone = '+' . api_waweb_parse_phone($response['Chat']);
        $senderPhone = '+' . api_waweb_parse_phone($response['Sender']);
        $isAdminAnswer = ($senderPhone == $adminPhone || $response['IsFromMe'] == 'true');
        $user_id = false;
        $conversation_id = false;

        // User and conversation handling
        if (!$isAdminAnswer) {
            $user = sb_get_user_by('phone', $phone);
            if (!$user) {
                $name = trim($response['SenderName']);
                $space_in_name = strpos($name, ' ');
                $first_name = $space_in_name ? trim(substr($name, 0, $space_in_name)) : $name;
                $last_name = $space_in_name ? trim(substr($name, $space_in_name)) : '';
                $extra = ['phone' => [$phone, 'Phone']];
                $user_id = sb_add_user(['first_name' => $first_name, 'last_name' => $last_name, 'user_type' => 'lead'], $extra);
                $user = sb_get_user($user_id);
            } else {
                $user_id = $user['id'];
                $conversation_id = sb_waweb_get_conversation_id($user_id);
            }
        } else {
            $phone = '+' . api_waweb_parse_phone($response['Chat']);
        }

        $GLOBALS['SB_LOGIN'] = $user;

        if (!$conversation_id) {
            $conversation_id = sb_isset(sb_new_conversation($user_id, 2, '', $department, -1, 'wx'), 'details', [])['id'];
        }

        // Handle attachments
        $attachments = [];
        if (isset($_FILES['attachment']) && $_FILES['attachment']['error'] === UPLOAD_ERR_OK) {
            $file_name = $_FILES['attachment']['name'];
            $directory_date = date('d-m-y');
            $path = '../../uploads/' . $directory_date;
            $url = STMBX_URL . '/uploads/' . $directory_date;

            if (!file_exists($path)) {
                mkdir($path, 0777, true);
            }

            move_uploaded_file($_FILES['attachment']['tmp_name'], $path . '/' . $file_name);
            array_push($attachments, [$file_name, $url . '/' . $file_name]);
        }

        // Send message
        $message = !empty($response['Conversation']) ? $response['Conversation'] : $response['Caption'];
        $payload = ['isGroup' => !empty($response['IsGroup'])];

        $response = sb_send_message($isAdminAnswer ? 1 : $user_id, $conversation_id, $message, $attachments, 2, $payload);

        if (!$isAdminAnswer) {
            // Dialogflow, Notifications, Bot messages
            $response_external = sb_messaging_platforms_functions($conversation_id, $message, $attachments, $user, ['source' => 'wx', 'platform_value' => $phone]);

            // Queue
            if (sb_get_multi_setting('queue', 'queue-active')) {
                sb_queue($conversation_id, $department, true);
            }

            // Update online status
            sb_update_users_last_activity($user_id);
        }

        // Set the 'IsFromMe' field correctly
        $response['IsFromMe'] = $isAdminAnswer ? 'true' : 'false';

        // Log the response to check the values
        file_put_contents("response.txt", print_r($response, true), FILE_APPEND);

        $GLOBALS['SB_FORCE_ADMIN'] = false;
    }
    echo "api waweb";
} catch (Throwable $e) {
    // Log errors
    file_put_contents("error_log.txt", $e->getMessage(), FILE_APPEND);
}

function sb_waweb_get_conversation_id($user_id) {
    return sb_isset(sb_db_get('SELECT id FROM sb_conversations WHERE source = "wx" AND user_id = ' . $user_id . ' ORDER BY id DESC LIMIT 1'), 'id');
}

function api_waweb_parse_phone($jid) {
    // Split the string using either ':' or '@' as delimiters
    $phone_parts = preg_split('/[:@]/', $jid);

    // Get the first part of the resulting array
    $phone = $phone_parts[0];

    // Remove any non-numeric characters from the phone number
    $phone = preg_replace('/[^0-9]/', '', $phone);

    // Check if the resulting phone number is not empty
    if (!empty($phone)) {
        // Check if there is a second part (domain) in the array and if it's '@g.us'
        if (isset($phone_parts[1]) && $phone_parts[1] === 'g.us') {
            // Concatenate the phone number with the domain
            return $phone . '@' . $phone_parts[1];
        } else {
            return $phone;
        }
    }

    return false;
}

die();
