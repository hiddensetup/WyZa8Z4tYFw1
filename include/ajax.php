<?php

/*
 * ==========================================================
 * AJAX.PHP
 * ==========================================================
 *
 * AJAX functions. This file must be executed only via AJAX. © 2017-2022 steambox.dev. All rights reserved.
 *
 */
if (file_exists('../config.php')) require_once('../config.php');
$GLOBALS['SB_LANGUAGE'] = sb_post('language');
require_once('functions.php');
if (!defined('SB_API') && !sb_security()) die(sb_json_response(new SBError('security-error', $_POST['function'])));

switch ($_POST['function']) {
    case 'emoji':
        die(file_get_contents(SB_PATH . '/resources/json/emoji.json'));
    case 'saved-replies':
        die(sb_json_response(sb_get_setting('saved-replies')));
    case 'save-settings':
        die(sb_json_response(sb_save_settings($_POST['settings'], sb_post('external_settings', []), sb_post('external_settings_translations', []))));
    case 'get-settings':
        die(sb_json_response(sb_get_settings()));
    case 'get-all-settings':
        die(sb_json_response(sb_get_all_settings()));
    case 'get-front-settings':
        die(sb_json_response(sb_get_front_settings()));
    case 'get-block-setting':
        die(sb_json_response(sb_get_block_setting($_POST['value'])));
    case 'add-user':
        die(sb_json_response(sb_add_user($_POST['settings'], sb_post('settings_extra', []))));
    case 'add-user-and-login':
        die(sb_json_response(sb_add_user_and_login(sb_post('settings', []), sb_post('settings_extra', []))));
    case 'get-user':
        die(sb_json_response(sb_get_user($_POST['user_id'], sb_post('extra'))));
    case 'get-users':
        die(sb_json_response(sb_get_users(sb_post('sorting', ['creation_time', 'DESC']), sb_post('user_types', []), sb_post('search', ''), sb_post('pagination'), sb_post('extra'), sb_post('tags'), sb_post('users_id'))));
    case 'get-new-users':
        die(sb_json_response(sb_get_new_users($_POST['datetime'])));
    case 'get-user-extra':
        die(sb_json_response(sb_get_user_extra($_POST['user_id'], sb_post('slug'), sb_post('default'))));
    case 'get-user-language':
        die(sb_json_response(sb_get_user_language(sb_post('user_id'))));
    case 'get-user-from-conversation':
        die(sb_json_response(sb_get_user_from_conversation($_POST['conversation_id'], sb_post('agent'))));
    case 'get-online-users':
        die(sb_json_response(sb_get_online_users(sb_post('sorting', 'creation_time'), sb_post('agents'))));
    case 'search-users':
        die(sb_json_response(sb_search_users($_POST['search'])));
    case 'get-active-user':
        die(sb_json_response(sb_get_active_user(sb_post('login-cookie'), sb_post('db'), sb_post('login_app'), sb_post('user_token'))));
    case 'get-agent':
        die(sb_json_response(sb_get_agent($_POST['agent_id'])));
    case 'delete-user':
        die(sb_json_response(sb_delete_user($_POST['user_id'])));
    case 'delete-users':
        die(sb_json_response(sb_delete_users($_POST['user_ids'])));
    case 'update-user':
        die(sb_json_response(sb_update_user($_POST['user_id'], $_POST['settings'], sb_post('settings_extra', []))));
    case 'count-users':
        die(sb_json_response(sb_count_users()));
    case 'get-users-with-details':
        die(sb_json_response(sb_get_users_with_details($_POST['details'], sb_post('user_ids'))));
    case 'update-user-to-lead':
        die(sb_json_response(sb_update_user_to_lead($_POST['user_id'])));
    case 'get-conversations':
        die(sb_json_response(sb_get_conversations(sb_post('pagination'), sb_post('status_code'), sb_post('department'), sb_post('agent'), sb_post('source'), sb_post('tag'))));
    case 'get-new-conversations':
        die(sb_json_response(sb_get_new_conversations($_POST['datetime'], sb_post('department'), sb_post('source'), sb_post('tag'))));
    case 'get-conversation':
        die(sb_json_response(sb_get_conversation(sb_post('user_id'), $_POST['conversation_id'])));
    case 'search-conversations':
        die(sb_json_response(sb_search_conversations($_POST['search'])));
    case 'new-conversation':
        die(sb_json_response(sb_new_conversation($_POST['user_id'], sb_post('status_code'), sb_post('title', ''), sb_post('department', -1), sb_post('agent_id', -1), sb_post('source'), sb_post('extra'), sb_post('tags'))));
    case 'get-user-conversations':
        die(sb_json_response(sb_get_user_conversations($_POST['user_id'], sb_post('exclude_id', -1), sb_post('agent'))));
    case 'get-new-user-conversations':
        die(sb_json_response(sb_get_new_user_conversations($_POST['user_id'], $_POST['datetime'])));
    case 'update-conversation-status':
        die(sb_json_response(sb_update_conversation_status($_POST['conversation_id'], $_POST['status_code'])));
    case 'update-conversation-source':
        die(sb_json_response(sb_update_conversation_source($_POST['conversation_id'], $_POST['source'])));
    case 'update-clientStatus-conversations':
        die(sb_json_response(sb_update_clientStatus_conversations($_POST['conversation_id'], $_POST['label'])));
    case 'get-clientStatus-conversations':
        die(sb_json_response(sb_get_clientStatus_conversations($_POST['conversation_id'], $_POST['label'])));
    case 'update-conversation-department':
        die(sb_json_response(sb_update_conversation_department($_POST['conversation_id'], $_POST['department'], sb_post('message'))));
    case 'update-conversation-agent':
        die(sb_json_response(sb_update_conversation_agent($_POST['conversation_id'], $_POST['agent_id'], sb_post('message'))));
    case 'queue':
        die(sb_json_response(sb_queue(sb_post('conversation_id'), sb_post('department'))));
    case 'update-users-last-activity':
        die(sb_json_response(sb_update_users_last_activity($_POST['user_id'], sb_post('return_user_id', -1), sb_post('check_slack'))));
    case 'is-typing':
        die(sb_json_response(sb_is_typing($_POST['user_id'], $_POST['conversation_id'])));
    case 'is-agent-typing':
        die(sb_json_response(sb_is_agent_typing($_POST['conversation_id'])));
    case 'set-typing':
        die(sb_json_response(sb_set_typing(sb_post('user_id'), sb_post('conversation_id'), sb_post('source'))));
    case 'login':
        die(sb_json_response(sb_login(sb_post('email', ''), sb_post('password', ''), sb_post('user_id', ''), sb_post('token', ''))));
    case 'logout':
        die(sb_json_response(sb_logout()));
    case 'update-login':
        die(sb_json_response(sb_update_login(sb_post('profile_image', ''), sb_post('first_name', ''), sb_post('last_name', ''), sb_post('email', ''), sb_post('department', ''), sb_post('user_id', ''))));
    case 'get-new-messages':
        die(sb_json_response(sb_get_new_messages($_POST['user_id'], $_POST['conversation_id'], $_POST['datetime'], sb_post('last_id'))));
    case 'send-message':
        die(sb_json_response(sb_send_message($_POST['user_id'], $_POST['conversation_id'], sb_post('message', ''), sb_post('attachments', []), sb_post('conversation_status_code', -1), sb_post('payload'), sb_post('queue'), sb_post('recipient_id'))));
    case 'update-message':
        die(sb_json_response(sb_update_message($_POST['message_id'], sb_post('message'), sb_post('attachments'), sb_post('payload'))));
    case 'delete-message':
        die(sb_json_response(sb_delete_message($_POST['message_id'])));
    case 'close-message':
        die(sb_json_response(sb_close_message($_POST['conversation_id'], $_POST['bot_id'])));
    case 'csv-users':
        die(sb_json_response(sb_csv_users()));
    case 'csv-conversations':
        die(sb_json_response(sb_csv_conversations(sb_post('conversation_id', -1))));
    case 'csv-users-add':
        die(sb_csv_users_add($_FILES));
    case 'transcript':
        die(sb_json_response(sb_transcript($_POST['conversation_id'], sb_post('type'))));
    case 'update-user-and-message':
        die(sb_json_response(sb_update_user_and_message($_POST['user_id'], sb_post('settings', []), sb_post('settings_extra', []), sb_post('message_id', ''), sb_post('message', ''), sb_post('payload'))));
    case 'get-rich-message':
        die(sb_json_response(sb_get_rich_message($_POST['name'], sb_post('settings'))));
    case 'create-email':
        die(sb_json_response(sb_email_create($_POST['recipient_id'], $_POST['sender_name'], $_POST['sender_profile_image'], $_POST['message'], sb_post('attachments', []), sb_post('department'), sb_post('conversation_id'))));
    case 'send-email':
        die(sb_json_response(sb_email($_POST['recipient_id'], $_POST['message'], sb_post('attachments', []), sb_post('sender_id', -1))));
    case 'send-custom-email':
        die(sb_json_response(sb_email_send($_POST['to'], $_POST['subject'], sb_email_default_parts($_POST['message'], sb_post('recipient_id')))));
    case 'send-test-email':
        die(sb_json_response(sb_email_send_test($_POST['to'], $_POST['email_type'])));
        // case 'slack-users':
        //     die(sb_json_response(sb_slack_users()));
        // case 'archive-slack-channels':
        //     die(sb_json_response(sb_archive_slack_channels(sb_post('conversation_user_id'))));
        // case 'slack-presence':
        //     die(sb_json_response(sb_slack_presence(sb_post('agent_id'), sb_post('list'))));
        // case 'slack-channels':
        //     die(sb_json_response(sb_slack_get_channels(sb_post('code'))));
    case 'clean-data':
        die(sb_json_response(sb_clean_data()));
    case 'user-autodata':
        die(sb_json_response(sb_user_autodata($_POST['user_id'])));
    case 'current-url':
        die(sb_json_response(sb_current_url(sb_post('user_id'), sb_post('url'))));
    case 'get-translations':
        die(sb_json_response(sb_get_translations()));
    case 'get-translation':
        die(sb_json_response(sb_get_translation($_POST['language_code'])));
       
    case 'installation':
        die(sb_json_response(sb_installation($_POST['details'])));
        
    case 'webhooks':
        die(sb_json_response(sb_webhooks($_POST['function_name'], $_POST['parameters'])));
    case 'system-requirements':
        die(sb_json_response(sb_system_requirements()));
    case 'get-departments':
        die(sb_json_response(sb_get_departments()));
    case 'push-notification':
        die(sb_json_response(sb_push_notification(sb_post('title'), sb_post('message'), sb_post('icon'), sb_post('interests'), sb_post('conversation_id'), sb_post('user_id'))));
    case 'delete-leads':
        die(sb_json_response(sb_delete_leads()));
    case 'cron-jobs':
        die(sb_json_response(sb_cron_jobs()));
    case 'path':
        die(sb_json_response(sb_('The secret path is:') . '<br>' . SB_PATH));
    case 'subscribe-email':
        die(sb_json_response(sb_subscribe_email($_POST['email'])));
    case 'agents-online':
        die(sb_json_response(sb_agents_online()));
      
    case 'email-piping':
        die(sb_json_response(sb_email_piping(sb_post('force'))));
    case 'reports':
        die(sb_json_response(sb_reports($_POST['name'], sb_post('date_start'), sb_post('date_end'))));
    case 'reports-update':
        die(sb_json_response(sb_reports_update($_POST['name'], sb_post('value'), sb_post('external_id'), sb_post('extra'))));
    case 'pusher-trigger':
        die(sb_json_response(sb_pusher_trigger($_POST['channel'], $_POST['event'], sb_post('data'))));
    case 'is-online':
        die(sb_json_response(sb_is_user_online($_POST['user_id'])));
    case 'get-notes':
        die(sb_json_response(sb_get_notes($_POST['conversation_id'])));
    case 'add-note':
        die(sb_json_response(sb_add_note($_POST['conversation_id'], $_POST['user_id'], $_POST['name'], $_POST['message'], $_POST['alert'], $_POST['time_zone'], $_POST['status'])));
    case 'update-note':
        die(sb_json_response(sb_update_note($_POST['conversation_id'], $_POST['note_id'], $_POST['status'])));
    case 'delete-note':
        die(sb_json_response(sb_delete_note($_POST['conversation_id'], $_POST['note_id'])));
        // case 'messenger-send-message':
        //     die(sb_json_response(sb_messenger_send_message($_POST['psid'], $_POST['facebook_page_id'], sb_post('message', ''), sb_post('attachments', []), sb_post('metadata', []))));
    case 'whatsapp-send-message':
        die(sb_json_response(sb_whatsapp_send_message($_POST['to'], sb_post('message', ''), sb_post('attachments', []), sb_post('phone_id'), sb_post('payload'))));
    case 'whatsmeow-send-message':
        die(sb_json_response(sb_whatsmeow_send_message($_POST['to'], sb_post('message', ''), sb_post('attachments', []))));
    case 'whatsapp-send-template':
        die(sb_json_response(sb_whatsapp_send_template($_POST['phone'], sb_post('language', ''), sb_post('conversation_url_parameter', ''), sb_post('user_name', ''), sb_post('user_email', ''), sb_post('template_name'), sb_post('phone_id'))));
        // case 'whatsapp-send-meta-template':
        //      die(sb_json_response(sb_whatsapp_send_meta_template($_POST['payload'])));
    case 'whatsapp-send-meta-template':
        die(sb_json_response(sb_whatsapp_send_meta_template($_POST['payload'], $cloud_phone_id)));
    case 'telegram-send-message':
        die(sb_json_response(sb_telegram_send_message($_POST['chat_id'], sb_post('message', ''), sb_post('attachments', []))));
    case 'telegram-synchronization':
        die(sb_json_response(sb_telegram_synchronization($_POST['token'], sb_post('cloud_token'))));
        // case 'twitter-send-message':
        //     die(sb_json_response(sb_twitter_send_message($_POST['twitter_id'], sb_post('message', ''), sb_post('attachments', []))));
        // case 'twitter-subscribe':
        //     die(sb_json_response(sb_twitter_subscribe(sb_post('cloud_token'))));
        // case 'gbm-send-message':
        //     die(sb_json_response(sb_gbm_send_message($_POST['google_conversation_id'], sb_post('message', ''), sb_post('attachments', []), sb_post('token'))));
        // case 'wechat-send-message':
        //     die(sb_json_response(sb_wechat_send_message($_POST['open_id'], sb_post('message', ''), sb_post('attachments', []), sb_post('token'))));
    case 'send-sms':
        die(sb_json_response(sb_send_sms($_POST['message'], $_POST['to'], sb_post('template', true), sb_post('conversation_id'), sb_post('attachments'))));
    case 'direct-message':
        die(sb_json_response(sb_direct_message($_POST['user_ids'], $_POST['message'], sb_post('subject'), $_POST['template'])));
    case 'automations-get':
        die(sb_json_response(sb_automations_get()));
    case 'automations-run':
        die(sb_json_response(sb_automations_run($_POST['automation'], sb_post('validate'))));
    case 'automations-run-all':
        die(sb_json_response(sb_automations_run_all()));
    case 'automations-validate':
        die(sb_json_response(sb_automations_validate($_POST['automation'])));
    case 'chat-css':
        die(sb_json_response(sb_css(sb_post('color_1'), sb_post('color_2'), sb_post('color_3'), true)));
    case 'get-avatar':
        die(sb_json_response(sb_get_avatar($_POST['first_name'], sb_post('last_name'))));
    case 'get-agents-ids':
        die(sb_json_response(sb_get_agents_ids(sb_post('admins', true))));
    case 'get-agents-in-conversation':
        die(sb_json_response(sb_get_agents_in_conversation($_POST['conversation_id'])));
    case 'count-conversations':
        die(sb_json_response(sb_count_conversations(sb_post('status_code'))));
        // case 'updates-available':
        //     die(sb_json_response(sb_updates_available()));
        // case 'google-translate':
        //     die(sb_json_response(sb_google_translate($_POST['strings'], $_POST['language_code'])));
        case 'set-rating':
            die(sb_json_response(sb_set_rating($_POST['settings'], sb_post('payload'), sb_post('message_id'), sb_post('message'))));
        case 'get-rating':
            die(sb_json_response(sb_get_rating($_POST['user_id'])));
    
    
    case 'get-setting':
        die(sb_json_response($_POST['type'] == 'multi' ? sb_get_multi_setting($_POST['setting'], $_POST['key']) : sb_get_setting($_POST['setting'])));
    case 'get-select-setting':
        die(sb_json_response(sb_get_select_setting($_POST['setting'])));
        // case 'google-language-detection-update-user':
        //     die(sb_json_response(sb_google_language_detection_update_user($_POST['string'], sb_post('user_id'), sb_post('token'))));
    case 'export-settings':
        die(sb_json_response(sb_export_settings()));
    case 'import-settings':
        die(sb_json_response(sb_import_settings($_POST['file_url'])));
    case 'delete-file':
        die(sb_json_response(sb_file_delete($_POST['path'])));
    case 'check-conversations-assignment':
        die(sb_json_response(sb_check_conversations_assignment($_POST['conversations_ids'], sb_post('agent_id'), sb_post('department'))));
        // case 'verification-cookie':
        //     die(sb_json_response(sb_verification_cookie($_POST['code'], $_POST['domain'])));
    case 'on-close':
        die(sb_on_close());
    case 'update-tags':
        die(sb_json_response(sb_tags_update($_POST['conversation_id'], sb_post('tags', []), sb_post('add'))));
    case 'get-tags':
        die(sb_json_response(sb_tags_get()));
    default:
        die('["error", "Steambox error [ajax.php]: No functions found with name: ' . $_POST['function'] . '."]');
}

function sb_json_response($result)
{
    if (sb_is_error($result)) {
        return defined('SB_API') ? sb_api_error($result) : json_encode(['error', $result->code(), $result->function_name(), $result->message()]);
    } else {
        return defined('SB_API') ? sb_api_success($result) : json_encode(sb_is_validation_error($result) ? ['validation-error', $result->code()] : ['success', $result]);
    }
}

function sb_post($key, $default = false)
{
    return isset($_POST[$key]) ? ($_POST[$key] == 'false' ? false : ($_POST[$key] == 'true' ? true : $_POST[$key])) : $default;
}

function sb_security()
{
    $security = [
        'admin' => ['twitter-subscribe', 'telegram-synchronization', 'delete-file', 'import-settings', 'export-settings', 'automations-save', 'get-articles-categories', 'save-articles-categories', 'path', 'reports', 'app-get-key', 'app-activation'],
    
        'agent' => ['get-tags', 'save-settings', 'reports', 'get-all-settings', 'whatsapp-send-template', 'on-close', 'check-conversations-assignment', 'count-conversations', 'reports-update', 'get-agents-ids', 'send-custom-email', 'get-users-with-details', 'direct-message', 'messenger-send-message', 'wechat-send-message', 'whatsmeow-send-message', 'telegram-send-message', 'twitter-send-message', 'get-user-language', 'get-notes', 'add-note', 'delete-note', 'user-online', 'get-user-from-conversation', 'clean-data', 'save-translations', 'get-rating', 'save-articles', 'update', 'archive-slack-channels', 'add-user', 'delete-user', 'delete-users', 'get-user-conversations', 'update-user'],
    
        'user' => ['update-tags', 'google-language-detection-update-user', 'google-translate', 'get-agents-in-conversation', 'update-conversation-agent', 'update-conversation-department', 'get-label-conversations', 'get-avatar', 'search-user-conversations', 'update-login', 'update-user', 'get-user', 'get-user-extra', 'update-user-to-lead', 'new-conversation', 'get-user-conversations', 'get-new-user-conversations', 'update-message', 'delete-message', 'update-user-and-message', 'get-conversation', 'get-new-messages', 'set-rating', 'create-email', 'send-email'],
        
        'login' => ['transcript', 'automations-get', 'send-sms', 'pusher-trigger', 'subscribe-email', 'push-notification', 'queue', 'update-conversation-status', 'update-users-last-activity', 'is-typing', 'send-message', 'set-typing', 'user-autodata', 'saved-replies']
    ];
    $function = $_POST['function'];
    $user_id = sb_post('user_id', -1);
    $active_user = sb_get_active_user(sb_post('login-cookie'));

    // No check
    $no_check = true;
    foreach ($security as $key => $value) {
        if (in_array($function, $security[$key])) {
            $no_check = false;
            break;
        }
    }
    if ($no_check) {
        return true;
    }

    // Login check
    if (in_array($function, $security['login']) && $active_user) {
        return true;
    }
    if ($active_user && isset($active_user['user_type'])) {
        $user_type = $active_user['user_type'];
        $current_user_id = sb_isset($active_user, 'id', -2);
        if ($user_id == -1) {
            $user_id = $current_user_id;
            $_POST['user_id'] = $current_user_id;
        }
        // User check
        if (in_array($function, $security['user']) && (sb_is_agent($user_type) || $user_id == $current_user_id)) {
            return true;
        }

        // Agent check
        if (in_array($function, $security['agent']) && sb_is_agent($user_type)) {
            return true;
        }

        // Admin check
        if (in_array($function, $security['admin']) && $user_type == 'admin') {
            return true;
        }
    }
    return false;
}
