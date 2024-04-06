<?php

/*
 * ==========================================================
 * PUSHER.PHP
 * ==========================================================
 * */

require_once('../config.php');
if (!isset($_POST['channel_name'])) die();
// file_put_contents('newset.txt',print_r($_POST['channel_name'],true),FILE_APPEND);
require('functions.php');
$active_user = sb_get_active_user(sb_isset($_POST, 'login'));
if ($active_user) {
    require SB_PATH . '/vendor/pusher/autoload.php';
    
    // Configure Pusher directly using values from $_POST
    $pusher = new Pusher\Pusher($_POST['pusher-key'], $_POST['pusher-secret'], $_POST['pusher-id'], ['cluster' => $_POST['pusher-cluster']]);
    
    if (strpos($_POST['channel_name'], 'presence') === false) {
        die($pusher->socket_auth($_POST['channel_name'], $_POST['socket_id']));
    } else {
        die($pusher->presence_auth($_POST['channel_name'], $_POST['socket_id'], $active_user['id'], ['id' => $active_user['id'], 'first_name' => $active_user['first_name'], 'last_name' => $active_user['last_name'], 'user_type' => $active_user['user_type']]));
    }
} else die('Forbidden');





