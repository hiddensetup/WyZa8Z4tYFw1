<?php

/*
 * ==========================================================
 * INIT.PHP
 * ==========================================================
 *
 * This file loads the chat code and initialize the chat
 */

if (!file_exists('../config.php')) {
    die();
}

if (!defined('SB_PATH')) define('SB_PATH', dirname(dirname(__FILE__)));

require('../config.php');

require('functions.php');
sb_init_translations();
sb_component_chat();

function sb_component_chat()
{
    sb_js_global();
    sb_css();
    $header_headline = sb_get_setting('header-headline');
    $header_message = sb_get_setting('header-msg');
    $background = sb_get_setting('header-img');
    $icon = sb_get_setting('chat-icon');
    $header_type = sb_get_setting('header-type', 'agents');
    $disable_dashboard = sb_get_setting('disable-dashboard');
    $texture = sb_get_setting('chat-background');
    $css = '';
    $departments_menu = sb_get_multi_setting('departments-settings', 'departments-dashboard');
    $agents_menu = sb_get_multi_setting('agents-menu', 'agents-menu-active');

    if (sb_get_setting('rtl') || in_array(sb_get_user_language(), ['ar', 'he', 'ku', 'fa', 'ur'])) $css .= ' sb-rtl';
    if (sb_get_setting('chat-position') == 'left') $css .= ' sb-chat-left';
    if ($disable_dashboard) $css .= ' sb-dashboard-disabled';

    if (empty($icon)) {
        $icon = sb_get_setting('chat-sb-icons');
        if (!empty($icon)) {
            $icon = STMBX_URL . '/media/' . $icon;
        }
    }
?>
    <div class="sb-main sb-chat sb-no-conversations<?php echo $css ?>" style="display: none; transition: none;">
        <div class="sb-body" style="max-height: 570px;background: white;">
            <div class="sb-scroll-area<?php if ($texture != '') echo ' sb-texture-' . substr($texture, -5, 1) ?>">
                <div class="sb-header sb-header-main sb-header-type-<?php echo $header_type ?>" <?php if ($background) echo 'style="background-image: url(' . $background . ')"' ?>>
                    <i class="sb-icon-close <?php echo $disable_dashboard ? 'sb-responsive-close-btn' : 'sb-dashboard-btn' ?>"></i>
                    <div class="sb-content">
                        <?php if ($header_type == 'brand') echo '<div class="sb-brand"><img src="' . sb_get_setting('brand-img') . '" alt="" /></div>' ?>
                        <div class="sb-title">
                            <?php echo sb_($header_headline ? $header_headline : 'Steambox®') ?>
                        </div>
                        <div class="sb-text">
                            <?php echo sb_($header_message ? $header_message : 'Atención personalizada por expertos 24/7!') ?>
                        </div>
                        <?php
                        if ($header_type == 'agents') {
                            $agents = sb_db_get('SELECT first_name, profile_image FROM sb_users WHERE user_type = "agent" OR user_type = "admin" LIMIT 3', false);
                            $code = '';
                            for ($i = 0; $i < count($agents); $i++) {
                                $code .= '<div><span>' . $agents[$i]['first_name'] . '</span><img src="' . $agents[$i]['profile_image'] . '" alt="" /></div>';
                            }
                            echo '<div class="sb-profiles">' . $code . '</div>';
                        }
                        ?>
                    </div>
                    <!-- <div class="sb-label-date-top"></div> -->
                </div>
                <div class="sb-list sb-active"></div>
                <div class="sb-dashboard">
                    <div class="sb-dashboard-conversations">
                        <div class="sb-title">
                            <?php sb_e('Conversations') ?>
                        </div>
                        <ul class="sb-user-conversations<?php if (sb_get_setting('force-one-conversation')) echo ' sb-one-conversation' ?>"></ul>
                        <?php if (!$agents_menu && !$disable_dashboard) echo (!$departments_menu ? '<div class="sb-btn sb-btn-new-conversation">' . sb_('New conversation') . '</div>' : '') . '<div class="sb-btn sb-btn-all-conversations">' . sb_('View all') . '</div>' ?>
                    </div>
                    <?php if ($departments_menu) sb_departments('dashboard') ?>
                    <?php if ($agents_menu) sb_agents_menu() ?>
                    <?php if (sb_get_setting('articles-active')) echo sb_get_rich_message('articles') ?>
                </div>
                <div class="sb-panel sb-panel-articles"></div>
            </div>
            <?php sb_component_editor() ?>
        </div>
        <div class="sb-chat-btn">
            <span data-count="0"></span>
            <img class="sb-icon" alt="" src="<?php echo $icon ? $icon : STMBX_URL . '/media/button-chat.svg' ?>" />
            <img class="sb-close" alt="" src="<?php echo STMBX_URL ?>/media/button-close.svg" />
        </div>
        <i class="sb-icon sb-icon-close sb-responsive-close-btn"></i>
        <?php if (sb_get_setting('chat-sound', 'n') != 'n') echo '<audio id="sb-audio" preload="auto"><source src="' . STMBX_URL . '/media/sound.mp3" type="audio/mpeg"></audio><audio id="sb-audio-out" preload="auto"><source src="' . STMBX_URL . '/media/sound-out.mp3" type="audio/mpeg"></audio>' ?>
        <div class="sb-lightbox-media">
            <div></div>
            <i class="sb-icon-close"></i>
        </div>
        <div class="sb-lightbox-overlay"></div>
    </div>
<?php }

function sb_agents_menu()
{
    $agents = sb_db_get('SELECT id, first_name, last_name, profile_image FROM sb_users WHERE user_type = "agent"', false);
    $code = '<div class="sb-dashboard-agents"><div class="sb-title">' .  sb_(sb_get_multi_setting('agents-menu', 'agents-menu-title', 'Agents')) . '</div><div class="sb-agents-list">';
    for ($i = 0; $i < count($agents); $i++) {
        $code .= '<div data-id="' . $agents[$i]['id'] . '"><img src="' . $agents[$i]['profile_image'] . '"><span>' . $agents[$i]['first_name'] . ' ' . $agents[$i]['last_name'] . '</span></div>';
    }
    echo $code . '</div></div>';
}

?>
