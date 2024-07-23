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
        if (empty(sb_get_multi_setting('whatsmeow-go', 'whatsmeow-go-active'))) {
            die();
        }

        $response = $_POST;

        if (empty($response['Conversation']) && empty($_FILES["attachment"])) {
            die();
        }


        $GLOBALS['SB_FORCE_ADMIN'] = true;

        $adminPhone      = sb_get_multi_setting('whatsmeow-go', 'whatsmeow-go-phone');
        $phone           = '+' . api_whatsmeow_parse_phone($response['Chat']);
        $senderPhone = '+' . api_whatsmeow_parse_phone($response['Sender']);
        $isAdmnAnswer =  false;
        $user_id         = false;
        $conversation_id = false;
         // Retrieve and process the blacklist
         $blacklist_whatsmeow_string = sb_get_setting('blacklist_whatsmeow');
         $blacklist_whatsmeow = array_map('trim', explode(',', $blacklist_whatsmeow_string)); 
         
 
        if ($senderPhone == $adminPhone) {
            $isAdminAnswer = true;
            $phone         = '+' . api_whatsmeow_parse_phone($response['Chat']);
        }

          // Check if sender's phone is blacklist
          if (in_array($phone, $blacklist_whatsmeow)) {
            die(); 
        }
        $user            = sb_get_user_by('phone', $phone);
        $department      = sb_get_setting('whatsmeow-department');
        $payload = array('isGroup' => !empty($_POST['isGroup']) ? true : false,);
        $message         = $response['Conversation'] != '' ? $response['Conversation'] : $response['Caption'];

        if ($isAdminAnswer && !$user) {
            die();
        }

        // User and conversation
        if (!$user) {
            $name          = trim($response['SenderName']);
            $space_in_name = strpos($name, ' ');
            $first_name    = $space_in_name ? trim(substr($name, 0, $space_in_name)) : $name . $space_in_name;
            $last_name     = $space_in_name ? trim(substr($name, $space_in_name)) : '';
            $extra         = ['phone' => [$phone, 'Phone']];
            $user_id       = sb_add_user(['first_name' => $first_name, 'last_name' => $last_name, 'user_type' => 'lead'], $extra);
            $user          = sb_get_user($user_id);
        } else {
            $user_id         = $user['id'];
            $conversation_id = sb_whatsmeow_get_conversation_id($user_id);
        }

        $GLOBALS['SB_LOGIN'] = $user;

        if (!$conversation_id) {
            $conversation_id = sb_isset(sb_new_conversation($user_id, 2, '', $department, -1, 'ww'), 'details', [])['id'];
        }


        // Attachments
        $attachments = [];
        if (isset($_FILES['attachment'])) {
            if (0 < $_FILES['attachment']['error']) {
                // skip upload
            } else {
                $file_name      = $_FILES['attachment']['name'];
                $directory_date = date('d-m-y');
                $path           = '../../uploads/' . $directory_date;
                $url            = STMBX_URL . '/uploads/' . $directory_date;

                if (!file_exists($path)) {
                    mkdir($path, 0777, true);
                }

                move_uploaded_file($_FILES['attachment']['tmp_name'], $path . '/' . $file_name);

                array_push($attachments, [$file_name, $url . '/' . $file_name]);
            }
        }

        // Send message
        $response = sb_send_message($isAdminAnswer ? 1 : $user_id, $conversation_id, $message, $attachments, 2, $payload);


        if (!$isAdminAnswer) {
            // Dialogflow, Notifications, Bot messages
            $response_external = sb_messaging_platforms_functions($conversation_id, $message, $attachments, $user, ['source' => 'ww', 'platform_value' => $phone]);

            // Queue
            if (sb_get_multi_setting('queue', 'queue-active')) {
                sb_queue($conversation_id, $department, true);
            }

            // Online status
            sb_update_users_last_activity($user_id);
        }

        $GLOBALS['SB_FORCE_ADMIN'] = false;
    }
    echo "api whatsmeow";
} catch (Throwable $e) {
    var_dump($e);
}


function sb_whatsmeow_get_conversation_id($user_id)
{
    return sb_isset(sb_db_get('SELECT id FROM sb_conversations WHERE source = "ww" AND user_id = ' . $user_id . ' ORDER BY id DESC LIMIT 1'), 'id');
}



function api_whatsmeow_parse_phone($jid)
{
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
