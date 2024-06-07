<?php

function sb_profile_box()
{ ?>
    <div class="sb-profile-box sb-lightbox">
        <div class="sb-top-bar">
            <div class="sb-profile">
                <img src="<?php echo STMBX_URL ?>/media/user.svg" />
                <span class="sb-name"></span>
            </div>
            <div>
                <a style="color: var(--chat-app-logo-color);" data-value="email" class="sb-btn-icon" data-sb-tooltip="<?php sb_e('Send email') ?>">
                    <i class="bi-envelope-at"></i>
                </a>
                <a data-value="sms" class="sb-btn-icon" data-sb-tooltip="<?php sb_e('Send text message') ?>">
                    <i class="bi-chat-square-dots"></i>
                </a>
                <?php if (((sb_is_agent(false, true, true) && !sb_supervisor()) || sb_get_multi_setting('agents', 'agents-edit-user')) || (sb_supervisor() && sb_get_multi_setting('supervisor', 'supervisor-edit-user'))) echo ' <a class="sb-edit sb-btn sb-icon" data-button="toggle" data-hide="sb-profile-area" data-show="sb-edit-area"><i class="bi-pencil-square"></i>' . sb_('Edit user') . '</a>' ?>


                <a class="sb-select sb-btn sb-icon">
                    <i class="bi-plus-lg"></i><?php sb_e('New chat') ?>
                    <ul id="getSource" class="desktop-dropmod">


                        <?php include SB_PATH . "/apps/" . $sb_apps[0] . "/functions.php";
                        $cloud_active = sb_get_multi_setting('whatsapp-cloud', 'cloud-active'); ?>
                        <?php if ($cloud_active) : ?>
                            <li class="sb-start-conversation" onclick="updateSource('wa')">
                                <?php sb_e('<i class="bi-whatsapp"></i> WhatsApp API') ?>
                            </li>
                            <hr>

                        <?php endif; ?>
                        <li class="sb-start-tk-conversation" onclick="updateSource('tk')">
                            <?php sb_e('<i class="bi-chat-text"></i> Live chat') ?>
                        </li>
                        <?php include SB_PATH . "/apps/" . $sb_apps[1] . "/functions.php";
                        $goproxy = !empty(sb_get_multi_setting('whatsmeow-go', 'whatsmeow-go-active')); ?>
                        <?php if ($goproxy) : ?>
                            <li class="sb-start-qr-conversation" onclick="updateSource('ww')">
                                <?php sb_e('<i class="sb-start-conversation bi-qr-code"></i> WhatsApp QR'); ?>
                            </li>
                        <?php endif; ?>
                        <?php include SB_PATH . "/apps/" . $sb_apps[2] . "/functions.php";
                        $goproxy = !empty(sb_get_multi_setting('waweb-go', 'waweb-go-active')); ?>
                        <?php if ($goproxy) : ?>
                            <li class="sb-start-qr-conversation" onclick="updateSource('wx')">
                                <?php sb_e('<i class="sb-start-conversation bi-whatsapp"></i> WhatsApp Web'); ?>
                            </li>
                        <?php endif; ?>

                    </ul>

                </a>
                <a class="sb-close sb-btn-icon" data-button="toggle" data-hide="sb-profile-area" data-show="sb-table-area">
                    <i class="bi-x-lg"></i>
                </a>
            </div>
        </div>
        <div class="sb-main sb-scroll-area">

            <div>
                <div class="sb-title">
                    <?php sb_e('Profile') ?>
                </div>
                <div class="sb-agent-area"></div>
                <div class="sb-profile-list sb-profile-list-conversation<?php echo $collapse ?>"></div>

            </div>
            <div class="profile-log-background">
                <div class="sb-title">
                    <!-- <div><?php sb_e('Conversation history') ?></div> -->
                    <p class="profile-bubble-message">Desde aquí puedes <strong>continuar conversaciones existentes 🧑&zwj;💻</strong>. Pulsa sobre la conversación que deseas continuar (recomendado) o crea una conversación nueva pulsando <strong> + Nuevo </strong>.</p>

                    <p class="profile-bubble-message"> *Ten en cuenta que en Steambox tienes la opción de generar conversaciones separadas por agente (como tickets) o continuar conversaciones existentes. El cliente siempre verá la misma conversación de WhatsApp.</p>
                
                </div>
                <ul class="sb-user-conversations"></ul>
            </div>
        </div>
    </div>
<?php } ?>

<?php

/*
 * ----------------------------------------------------------
 * PROFILE EDIT BOX
 * ----------------------------------------------------------
 *
 * Profile editing area used in admin side
 *
 */

function sb_profile_edit_box()
{ ?>
    <div class="sb-profile-edit-box sb-lightbox">
        <div class="sb-info"></div>
        <div class="sb-top-bar">
            <div class="sb-profile">
                <img src="<?php echo STMBX_URL ?>/media/user.svg" />
                <span class="sb-name"></span>
            </div>
            <div>
                <a class="sb-save sb-btn sb-icon">
                    <i class="bi-check-lg"></i><?php sb_e('Save changes') ?>
                </a>
                <a class="sb-close sb-btn-icon" data-button="toggle" data-hide="sb-profile-area" data-show="sb-table-area">
                    <i class="bi-x-lg"></i>
                </a>
            </div>
        </div>
        <div class="sb-main sb-scroll-area">

            <div class="sb-details">
                <div class="sb-title">
                    <?php sb_e('Edit details') ?>
                </div>


                <div class="sb-edit-box">
                    <div id="profile_image" data-type="image" class="sb-input sb-input-image sb-profile-image">
                        <span><?php sb_e('Profile image') ?></span>
                        <div class="image">
                            <div class="bi-x-lg"></div>
                        </div>
                    </div>

                    <div id="user_type" data-type="select" name="user_type" class="sb-input sb-input-select">
                        <span><?php sb_e('Type') ?></span>
                        <select name="user_type">
                            <option value="agent"><?php sb_e('Agent') ?></option>
                            <option value="admin"><?php sb_e('Admin') ?></option>
                            <option value="lead"><?php sb_e('Lead') ?></option>
                        </select>
                    </div>

                    <?php sb_departments('select') ?>

                    <div id="first_name" data-type="text" name="first_name" class="sb-input">
                        <span><?php sb_e('First name') ?></span>
                        <input type="text" name="first_name" required />
                    </div>

                    <div id="last_name" data-type="text" name="last_name" class="sb-input">
                        <span><?php sb_e('Last name') ?></span>
                        <input type="text" name="last_name" required />
                    </div>

                    <div id="password" data-type="password" name="password" class="sb-input">
                        <span><?php sb_e('Password') ?></span>
                        <input type="text" name="password" />
                    </div>

                    <div id="email" data-type="email" name="email" class="sb-input">
                        <span><?php sb_e('Email') ?></span>
                        <input type="email" name="email" />
                    </div>
                </div>




                <a class="sb-delete sb-btn-text sb-btn-red">
                    <i class="bi-trash"></i><?php sb_e('Delete user') ?>
                </a>
            </div>
            <div class="sb-additional-details">
                <div class="sb-title">
                    <?php sb_e('Edit additional details') ?>
                </div>
                <!--// added  ↓ ↑ -->
                <div class="sb-edit-box">
                    <div id="phone" data-type="text" name="phone" class="sb-input">
                        <span><?php sb_e('Phone') ?></span>
                        <input type="text" name="phone" />
                    </div>

                    <div id="address" data-type="text" name="address" class="sb-input">
                        <span><?php sb_e('Address') ?></span>
                        <input type="text" name="address" />
                    </div>

                    <div id="city" data-type="text" name="city" class="sb-input">
                        <span><?php sb_e('City') ?></span>
                        <input type="text" name="city" />
                    </div>

                    <div id="country" data-type="select" class="sb-input">
                        <span><?php sb_e('Country') ?></span>
                        <?php echo sb_select_countries() ?>
                    </div>

                    <div id="postal_code" data-type="text" name="postal_code" class="sb-input">
                        <span><?php sb_e('Postal code') ?></span>
                        <input type="text" name="postal_code" />
                    </div>

                    <div id="language" data-type="select" class="sb-input">
                        <span><?php sb_e('Language') ?></span>
                        <?php echo sb_select_languages() ?>
                    </div>

                    <div id="birthdate" data-type="date" name="birthdate" class="sb-input">
                        <span><?php sb_e('Birthdate') ?></span>
                        <input type="date" name="birthdate" />
                    </div>

                    <div id="company" data-type="text" name="company" class="sb-input">
                        <span><?php sb_e('Company') ?></span>
                        <input type="text" name="company" />
                    </div>

                    <div id="facebook" data-type="text" name="facebook" class="sb-input">
                        <span><?php sb_e('Facebook') ?></span>
                        <input type="text" name="facebook" />
                    </div>

                    <div id="twitter" data-type="text" name="twitter" class="sb-input">
                        <span><?php sb_e('Twitter') ?></span>
                        <input type="text" name="twitter" />
                    </div>

                    <div id="linkedin" data-type="text" name="linkedin" class="sb-input">
                        <span><?php sb_e('LinkedIn') ?></span>
                        <input type="text" name="linkedin" />
                    </div>

                    <div id="website" data-type="text" name="website" class="sb-input">
                        <span><?php sb_e('Website') ?></span>
                        <input type="text" name="website" />
                    </div>

                    <div id="timezone" data-type="text" name="timezone" class="sb-input">
                        <span><?php sb_e('Timezone') ?></span>
                        <input type="text" name="timezone" />
                    </div>

                    <?php
                    $additional_fields = sb_get_setting('user-additional-fields');
                    if ($additional_fields != false && is_array($additional_fields)) {
                        $code = '';
                        for ($i = 0; $i < count($additional_fields); $i++) {
                            $value = $additional_fields[$i];
                            if ($value['extra-field-name'] != '') {
                                $code .= '<div id="' . $value['extra-field-slug'] . '" data-type="text" class="sb-input"><span>' . $value['extra-field-name'] . '</span><input type="text" name="' . $value['extra-field-slug'] . '"></div>';
                            }
                        }
                        echo $code;
                    }
                    ?>
                </div>

            </div>
        </div>
    </div>
<?php } ?>
<?php

/*
 * ----------------------------------------------------------
 * LOGIN BOX
 * ----------------------------------------------------------
 *
 * Administration area login box
 *
 */

 function displayMessage()
 {
    $jsonString = '{
        "payment": "<h2 style=\"color:var(--chat-text-primary)\"><i class=\"bi-info-circle-fill\"></i> ¡Pago Requerido! </h2><span style=\"color:var(--chat-text-primary)\">Para seguir disfrutando de Steamboxchat, necesitas realizar un pago. ¡No dejes que la diversión se detenga! Haz clic <button class=\"sb-btn\" onclick=\"window.location.href=\'' . PAYMENT_LINK . '\'\">aquí</button> para realizar tu pago ahora mismo.</span><br><br><span style=\"color:var(--chat-text-primary)\">¿Necesitas ayuda? No dudes en contactarnos.</span>",
        "trial": "<h2 style=\"color:var(--chat-text-primary)\"> ¡Prueba Finalizada! </h2><span style=\"color:var(--chat-text-primary)\">Tu período de prueba ha terminado. ¡Pero no te preocupes! Puedes seguir disfrutando de Steambox mientras eliges un plan. Continua ahora por solo $8.5 USD por día. Haz clic en el botón a continuación para continuar tu experiencia.</span><br><br><button class=\"sb-btn\" style=\"background: var(--chat-app-theme-color);width: 75%; margin: 10px auto;\" onclick=\"window.location.href=\'' . PAYMENT_LINK . '\'\">Continuar 1 día más</button><br><br><span style=\"color:var(--chat-text-primary)\"><span style=\"color:var(--chat-text-primary)\">¿Sabías que con Steambox también puedes generar códigos QR dinámicos y acortar enlaces con tu propio dominio? Accede gratis desde <a style=\"color:var(--chat-text-url);font-size:13px\" href=\"https://qrcode.steamboxchat.com\">qrcode.steamboxchat.com</a></span>",
        "overloaded": "<h2 style=\"color:var(--chat-text-primary)\"><i class=\"bi-info-circle-fill\"></i> ¡Sistema Sobrecargado! </h2><span style=\"color:var(--chat-text-primary)\">Estamos experimentando una alta demanda en nuestros servidores en este momento. Por favor, sé paciente y vuelve a intentarlo más tarde. Agradecemos tu comprensión.</span><br><br><span style=\"color:var(--chat-text-primary)\">Mientras tanto, ¿por qué no exploras otras funciones de Steambox? ¡Hay mucho por descubrir!</span>"
    }
    ';
    
            
 
     $messages = json_decode($jsonString, true);

     $message_type = defined('MESSAGE_TYPE') ? MESSAGE_TYPE : '';
 
     if (array_key_exists($message_type, $messages)) {
         $message = $messages[$message_type];
 
         echo '<div id="login-message" style="padding-top:40px">';
         echo '<div class="alert-special">';
         // echo '<span class="closebtn-special" onclick="this.parentElement.style.display=\'none\';">&times;</span>';
         echo $message;
         echo '</div>';
         echo '</div>';
 
         // Return true if a message is to be displayed
         return true;
     } else {
         // Return false if no message is to be displayed
         return false;
     }
 }
 
 function sb_login_box()
 { 
     // Check if a message is to be displayed
     $messageDisplayed = displayMessage();
 ?>
     <form class="sb sb-rich-login sb-admin-box sb-form-container" <?php echo ($messageDisplayed ? 'style="display:none;"' : ''); ?>>
     <div></div>
        <div class="sb-top-bar">
            <div id="announcement">
                <?php
                // If no message is to be displayed, show the login form
                if (!$messageDisplayed) {
                ?>
                    <!-- Your login form HTML goes here -->
                    <img style="margin: 50px auto 10px auto;" src="<?php echo sb_get_setting('login-icon') != false ? sb_get_setting('login-icon') : '/media/cube.svg' ?>" />
                <?php } ?>
            </div>
        </div> 
        <div class="sb-main" id="email">
            <div class="sb-input">
                <label style="color: var(--chat-text-secondary); font-size:14px; position: relative; top: 19px; left: 0px; background: var(--chat-app-background); padding: 1px 5px;" for="text"><?php sb_e('Email') ?></label>
                <input style="width: calc(100% - 30px);height: 45px;" type="text" />
            </div>
            <div class="sb-block-space"></div>
            <div class="sb-input" id="password">
                <label style=" color: var(--chat-text-secondary); font-size:14px; position: relative; top: 19px; left: 0px; background: var(--chat-app-background); padding: 1px 5px; " for="password"><?php sb_e('Password') ?></label>
                <input style="width: calc(100% - 30px);height: 45px;" type="password" />
            </div>
            <div class="sb-bottom">
                <div style="padding: 5px 90px;margin-top: 0px!important;width: fit-content!important;"" class="sb-btn sb-submit-login"><?php sb_e('Login') ?></div>

            </div>


        </div>

        <div style="display: flex;flex-wrap: wrap;justify-content: space-evenly" class="sb-text">
            <div style="margin: 0.2rem auto 1rem auto;max-width: 270px;" class="sb-info"></div>
           
            <a target="_blank" style="font-size: .8rem; text-decoration: none; color: var(--chat-text-primary); margin-right:4px" href="https://steamboxchat.com/privacy"> Privacy Policy</a><a style=" text-decoration: none; color: var(--chat-text-tertiary-color);    font-size: .8rem;  " target="_blank" href="https://steamboxchat.com/terms">Terms and Condition</a>
            <small>&copy; <?php echo date("Y"); ?> Steamboxchat</small>

        </div>
    </form>


    <img id="sb-error-check" style="display:none" src="<?php echo STMBX_URL . '/media/icon.svg' ?>" />
    <script>
        (function($) {
            $(document).ready(function() {
                $('.sb-admin-start').removeAttr('style');
                $('.sb-submit-login').on('click', function() {
                    SBF.loginForm(this, false, function() {
                        location.reload();
                    });
                });
                $('#sb-error-check').one('error', function() {
                    // $('.sb-info').html('It looks like the chat URL has changed. Edit the config.php file(it\'s in the Steambox folder) and update the STMBX_URL constant with the new URL.').addClass('sb-active');
                });
                SBPusher.initServiceWorker();
            });
            $(window).keydown(function(e) {
                if (e.which == 13) {
                    $('.sb-submit-login').click();
                }
            });
        }(jQuery));
    </script>


<?php } ?>
<?php

/*
 * ----------------------------------------------------------
 * CONFIRMATION ALERT BOX
 * ----------------------------------------------------------
 *
 * Ask a yes / no question to confirm an operation
 *
 */

function sb_dialog()
{ ?>
    <div class="sb-dialog-box sb-lightbox">
        <div class="sb-title"></div>
        <p></p>
        <hr style="margin: 20px;background: var(--chat-border-color);">
        <div style="display: flex;flex-wrap: wrap;justify-content: flex-end;">
            <a class="sb-confirm sb-btn"><?php sb_e('Confirm') ?></a>
            <a class="sb-cancel sb-btn sb-btn-red"><?php sb_e('Cancel') ?></a>
            <a class="sb-close sb-btn"><?php sb_e('Close') ?></a>
        </div>
    </div>
<?php } ?>

<?php

/*
 * ----------------------------------------------------------
 * UPDATES BOX
 * ----------------------------------------------------------
 *
 * Display the updates box
 *
 */

function sb_updates_box()
{ ?>
    <div class="sb-lightbox sb-updates-box">
        <iframe id="customer-support" style="display:none;width:100%;height:100%;border:none;border-radius:1rem"></iframe>
    </div>


<?php } ?>

<?php

/*
 * ----------------------------------------------------------
 * SYSTEM REQUIREMENTS BOX
 * ----------------------------------------------------------
 *
 * Display the system requirements box
 *
 */

function sb_requirements_box()
{ ?>
    <div class="sb-lightbox sb-requirements-box">
        <div class="sb-info"></div>
        <div class="sb-top-bar">
            <div><?php sb_e('System requirements') ?></div>
            <div>
                <a class="sb-close sb-btn-icon">
                    <i class="bi-x-lg"></i>
                </a>
            </div>
        </div>
        <div class="sb-main"></div>
    </div>
<?php } ?>
<?php

/*
 * ----------------------------------------------------------
 * APP BOX
 * ----------------------------------------------------------
 *
 * Display the app box
 *
 */

function sb_app_box()
{ ?>
    <div class="sb-lightbox sb-app-box" data-app="">
        <div class="sb-info"></div>
        <div class="sb-top-bar">
            <div></div>
            <div>
                <a class="sb-close sb-btn-icon">
                    <i class="bi-x-lg"></i>
                </a>
            </div>
        </div>
        <div class="sb-main">
            <p></p>
            <div class="sb-title"></div>
            <div class="sb-input-setting sb-type-text">
            </div>
            <div class="sb-bottom">
            </div>
        </div>
    </div>
<?php } ?>
<?php

/*
 * ----------------------------------------------------------
 * NOTES BOX
 * ----------------------------------------------------------
 *
 * Display the notes box
 *
 */

function sb_notes_box()
{ ?>
    <div class="sb-lightbox sb-notes-box">
        <div class="sb-info"></div>
        <div class="sb-top-bar">
            <div><?php sb_e('Add new note') ?></div>
            <div>
                <a class="sb-close sb-btn-icon">
                    <i class="bi-x-lg"></i>
                </a>
            </div>
        </div>
        <div class="sb-main">
            <div class="sb-input-setting sb-type-textarea">
                <textarea maxlength="620" placeholder="<?php sb_e('Write here your note...') ?>"></textarea>
                <div class="load-reminder reminder-box sb-hide">
                    <div class="reminder-box-content">
                        <div class="sb-input-setting">
                            <input style="margin:10px 0px;" type="text" id="alertdate" name="datetimes" />
                            <select id="zones">
                                <option value="">select timezone</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="sb-bottom" style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap: wrap;flex-direction: column-reverse;">
                <div style="display:flex;">
                    <a style="" class="sb-add-note sb-btn sb-icon"><i class="bi-stickies"></i><?php sb_e('Save note') ?></a>
                </div>
            </div>
        </div>
    </div>
<?php } ?>


<?php

/*
 * ----------------------------------------------------------
 * TAGS BOX
 * ----------------------------------------------------------
 *
 * Display the tags box
 *
 */

function sb_tags_box()
{ ?>
    <div class="sb-lightbox sb-tags-box">
        <div class="sb-info"></div>
        <div class="sb-top-bar">
            <div><?php sb_e('Manage tags') ?></div>
            <div>
                <a class="sb-close sb-btn-icon">
                    <i class="bi-x-lg"></i>
                </a>
            </div>
        </div>
        <div class="sb-main">
            <div class="sb-tags-cnt"></div>
            <div class="sb-bottom">
                <a id="sb-save-tags" class="sb-btn"><i class="bi-check-lg"></i>
                    <?php sb_e('Save changes') ?>
                </a>
            </div>
        </div>
    </div>
<?php } ?>


<?php

/*
 * ----------------------------------------------------------
 * DIRECT MESSAGE BOX
 * ----------------------------------------------------------
 *
 * Display the direct message box
 *
 */
function sb_direct_message_box()
{ ?>

    <div class="sb-lightbox sb-direct-message-box">
        <div class="sb-info"></div>
        <div class="sb-top-bar">
            <div>
            </div>
            <div>
                <a class="sb-close sb-btn-icon">
                    <i class="bi-x-lg"></i>
                </a>
            </div>
        </div>


        <div class="sb-main sb-scroll-area">
            <p style="margin: 5px 0px;"> <?php sb_e('Enter user IDs separated by commas.') ?> </p>
            <div class="sb-input-setting sb-type-text sb-first" style="display: flex;flex-direction: column;">
                <input class="sb-direct-message-users" type="text" name="user_ids" placeholder="<?php sb_e('User IDs separated by commas') ?>">
                <div class="sb-selector">
                    <br>
                    <?php
                    include '/apps/whatsmeow/functions.php';
                    $goproxy = !empty(sb_get_multi_setting('whatsmeow-go', 'whatsmeow-go-active'));
                    ?>
                    <?php
                    include '/apps/waweb/functions.php';
                    $goproxy = !empty(sb_get_multi_setting('waweb-go', 'waweb-go-active'));
                    ?>
                    <select class="sb-select" name="broadcast_type">
                        <option value="message"> <?php sb_e('Broadcast on existing chat') ?> </option>
                        <option value="template" class="active-bulk-sender"> <?php sb_e('Broadcast without existing chat') ?> </option>
                        <!-- <?php if ($goproxy) : ?><option value="sms"> <?php sb_e('Broadcast Whatsmeow') ?> </option> <?php endif; ?> -->
                        <!-- <?php if ($goproxy) : ?><option value="sms"> <?php sb_e('Broadcast WhatsApp Web') ?> </option> <?php endif; ?> -->
                            </select>
                </div>
            </div>
            <div class="sb-title sb-direct-message-subject"> <?php sb_e('Subject') ?> </div>
            <div class="sb-input-setting sb-type-text sb-direct-message-subject">
                <input type="text" name="email_subject" placeholder="<?php sb_e('Email subject') ?>">
            </div>
            <div class="sb-title sb-direct-message-title-subject sb-direct-message-hide"> <?php sb_e('Message') ?> </div>
            <div class="sb-input-setting sb-type-textarea sb-direct-message-hide">
                <textarea style="height:160px" name="message" placeholder="<?php sb_e('Write your message here...') ?>" required></textarea>
            </div>
            <div id="form-container" style="display: flex;flex-direction: column;padding:5px 10px 10px 10px;width: calc(100% - 21px);" class="sb-bulk-sender sb-additional-details sb-hide">
                <form id="user-template-form">
                    <div class="sb-input-setting" style="gap:10px;display:flex;">
                        <select class="Language" name="Language" required>
                            <option value="es"> <?php sb_e('Español (es)') ?> </option>
                            <option value="es_AR"> <?php sb_e('Español (es_AR)') ?> </option>
                            <option value="en_US"> <?php sb_e('English (en)') ?> </option>
                            <option value="es_ES"> <?php sb_e('Español (es_ES)') ?> </option>
                            <option value="es_MX"> <?php sb_e('Español (es_MX)') ?> </option>

                        </select>
                        <select class="LoadedTemplate" name="LoadedTemplate">
                            <option value="">Select a template</option>
                        </select>
                    </div>
                    <div class="sb-input-setting api-cloud-bubble">
                        <div style="margin: auto;display: inline-flex;justify-content: center;width: 100%;">
                            <img src="/media/spike.png" style="width: 20px;vertical-align: top;margin-right: -4px;height: 30px;">
                            <textarea disabled="" type="text" class="BodyTemplate textarea-api" name="BodyTemplate"></textarea>
                        </div>
                    </div>

                    <div style="display: flex;flex-wrap: wrap;flex-direction: column;align-items: stretch;" class="sb-input-setting Variables">
                        <div class='variables'>
                            <input type="text" name="variable" placeholder="{{1}}" style="margin: 2px 2px;">
                        </div>
                        <div style="display: flex;justify-content: flex-start;margin: 1px;gap: 5px;align-items: center;">
                            <a type="button" class="RemVariableButton whatsapp_var_buttons_1 sb-btn"><i class="bi bi-dash-lg"></i></a>
                            <a type="button" class="AddVariableButton whatsapp_var_buttons_2 sb-btn"><i class="bi bi-plus-lg"></i></a>
                        </div>
                    </div>
                    <div class="sb-bottom send-meta">
                        <button class="sb-btn sb-icon sb-send-direct-message" style="width:fit-content;border: none;text-align: end;">
                            <i class="bi-cash-coin"></i> <?php sb_e('Send') ?>
                        </button>
                        <div></div>
                    </div>

                </form>

            </div>
            <div class="sb-bottom sb-direct-message-hide">
                <a class="sb-send-direct-message sb-direct-message-hide sb-btn sb-icon">
                    <i class="bi-megaphone"></i> <?php sb_e('Send') ?> </a>
                <div></div>
            </div>

        </div>

    </div>

<?php } ?>



<?php

/*
 * ----------------------------------------------------------
 * WHATSAPP META BOX
 * ----------------------------------------------------------
 *
 * Display the WhatsApp Meta lightbox in conversation section
 *
 */

function sb_send_template_box()
{ ?>
    <div class="sb-lightbox sb-send-template-box" style="height: calc(100% - 145px);" data-source="">
        <div class="sb-info"></div>
        <div class="sb-top-bar">
            <div>
                <i data-value="wa" class="bi-whatsapp"></i> <span style="margin-left:5px">WhatsApp API </span>
            </div>
            <div>
                <a class="sb-close sb-btn-icon">
                    <i class="bi-x-lg"></i>
                </a>
            </div>
        </div>

        <div class="sb-main sb-scroll-area">
            <div id="form-container meta" style="display: flex;flex-direction: column;" class="sb-additional-details">
                <form id="template-form">
                    <div class="sb-input-setting">
                        <select class="Language" name="Language" required>
                            <option value="es"> <?php sb_e('Español (es)') ?> </option>
                            <option value="es_AR"> <?php sb_e('Español (es_AR)') ?> </option>
                            <option value="en_US"> <?php sb_e('English (en)') ?> </option>
                            <option value="es_ES"> <?php sb_e('Español (es_ES)') ?> </option>
                            <option value="es_MX"> <?php sb_e('Español (es_MX)') ?> </option>
                        </select>
                    </div>

                    <div class="sb-input-setting">
                        <select class="LoadedTemplate" name="LoadedTemplate" id="templateSelect">
                            <option value="">Select a template</option>
                        </select>
                    </div>

                    <br>

                    <div class="sb-input-setting api-cloud-bubble">
                        <div style="margin: auto;display: inline-flex;justify-content: center;width: 100%;">
                            <img src="/media/spike.png" style="width: 20px;vertical-align: top;margin-right: -4px;height: 30px;">
                            <textarea disabled="" type="text" class="BodyTemplate textarea-api" name="BodyTemplate"></textarea>
                        </div>
                    </div>

                    <div style="display: flex;flex-wrap: wrap;flex-direction: column;margin-bottom: 10px;align-items: stretch;" class="sb-input-setting Variables">
                        <br>
                        <p style=" width: 100%; font-weight: 600;">Variables</p>
                        <div class='variables sb-repeater-add '>
                            <input type="text" name="variable" placeholder="{{1}}" style="margin: 2px 2px;">
                        </div>
                        <div style="align-self: flex-end;">
                            <a type="button" class="sb-repeater-add RemVariableButton whatsapp_var_buttons_1 sb-btn">- <?php sb_e('Delete') ?></a>
                            <a type="button" class="sb-repeater-add AddVariableButton whatsapp_var_buttons_2 sb-btn">+ <?php sb_e('Add') ?></a>
                        </div>
                    </div>

                    <div class="sb-bottom send-meta">
                        <button class="sb-repeater-add  sb-btn sb-icon" style="border: none;margin-top: 40px;text-align: end;" type="submit">
                            <i class="bi-cash-coin"></i> <?php sb_e('Send') ?>
                        </button>
                    </div>

                </form>
            </div>
        </div>

    </div>
    <script>
        const meta = new Metatemplate;
        meta.init("#template-form");
// Theme toggler
const themeToggleBtns = document.querySelectorAll('.themeToggleBtn');
const htmlTag = document.documentElement;
const metaThemeColor = document.querySelector('meta[name="theme-color"]');

// Function to update the theme
const updateTheme = () => {
    const currentTheme = htmlTag.dataset.theme;
    let newTheme;
    let newThemeColor;

    switch (currentTheme) {
        case 'dark':
            newTheme = 'light';
            newThemeColor = 'white'; // Light theme color
            htmlTag.classList.remove('dark'); // Remove dark class
            break;
        case 'light':
            newTheme = 'app';
            newThemeColor = 'white'; // WhatsApp theme color
            htmlTag.classList.remove('dark'); // Remove dark class
            break;
        case 'app':
            newTheme = 'insta';
            newThemeColor = 'white'; // Google theme color
            htmlTag.classList.remove('dark'); // Remove dark class
            break;
        case 'insta':
            newTheme = 'steambox';
            newThemeColor = ''; // Leave the color unchanged
            htmlTag.classList.remove('dark'); // Remove dark class
            break;
        case 'steambox':
        default:
            newTheme = 'dark';
            newThemeColor = ''; // Leave the color unchanged
            htmlTag.classList.add('dark'); // Add dark class
            break;
    }

    htmlTag.dataset.theme = newTheme;
    if (newThemeColor) {
        metaThemeColor.content = newThemeColor;
    }
    localStorage.setItem('theme', newTheme);
};

// Retrieve stored theme from local storage and apply it
const storedTheme = localStorage.getItem('theme');
if (storedTheme) {
    htmlTag.dataset.theme = storedTheme;
    switch (storedTheme) {
        case 'light':
            metaThemeColor.content = 'white'; // Default to light theme color
            break;
        case 'app':
            metaThemeColor.content = 'white'; // WhatsApp theme color
            break;
        case 'insta':
            // Leave the color unchanged
            break;
        case 'steambox':
            // Leave the color unchanged
            break;
        case 'dark':
        default:
            metaThemeColor.content = 'color(srgb 0.1091 0.0607 0.2083)';
            htmlTag.classList.add('dark'); // Add dark class for the dark theme
            break;
    }
} else {
    // Set default theme to "light"
    htmlTag.dataset.theme = 'light';
    metaThemeColor.content = 'white'; // Light theme color
}

// Add event listeners to theme toggle buttons
themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', updateTheme);
});




        // Rating
        const sendRatingButton = document.getElementById("send-rating-button");
        sendRatingButton.addEventListener("click", function() {
            SBChat.sendMessage(-1, "[rating]");
        });



        // Function to check if there are active WhatsApp conversation items and return the first one
        async function getFirstActiveWAConversationItem() {
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second

            const conversationItem = document.querySelector(
                "li.sb-active[data-conversation-source='wa']",
            );
            return conversationItem;
        }

        // Execute the following code asynchronously onload
        window.onload = async () => {
            const conversationItem = await getFirstActiveWAConversationItem();

            // Toggle visibility of the menu bar and floating text based on the presence of active WhatsApp conversations
            if (conversationItem) {
                setTimeout(() => toggleMenuBarAndFloatingText(false), 600); // Adding a slight delay after confirming WhatsApp conversations
            } else {
                toggleMenuBarAndFloatingText(true);
            }
        };

        // Function to toggle visibility of the menu bar and floating text
        async function toggleMenuBarAndFloatingText(visible) {
            await new Promise((resolve) => setTimeout(resolve, 0)); // Wait for the next tick

            const menuBar = document.querySelector(".sb-show-menu-bar");
            menuBar.style.visibility = visible ? "visible" : "hidden";

            const floatingText = document.getElementById("floatingText");
            floatingText.style.display = visible ? "none" : "block";
        }

        // Add click event listener to the document to handle clicks on conversation items
        document.addEventListener("click", handleConversationClick);

        // Function to handle click on conversation items
        async function handleConversationClick(event) {
            // Exclude clicks on ul.sb-menu elements
            if (event.target.closest("div.sb-header")) return;

            // Hide the floating text and menu bar initially
            toggleElementsVisibility();

            const conversationItem = event.target.closest(
                "li.sb-active[data-conversation-source='wa'][data-conversation-status][data-user-id][data-conversation-id][data-time]",
            );
            if (!conversationItem) return; // Exit if clicked outside the conversation item

            const source = conversationItem.dataset.conversationSource;
            const status = conversationItem.dataset.conversationStatus;

            // Toggle visibility of the menu bar and floating text based on the conversation source and status
            if (source === "wa" && !isNaN(status)) {
                await toggleMenuBarAndFloatingText(false);
            }
        }


        // Function to toggle visibility of floating text, sb-bar, and container
        function toggleElementsVisibility() {
            // Get references to the floatingText, sb-bar, and container elements
            const floatingText = document.getElementById("floatingText");
            const sbBar = document.querySelector(".sb-bar");
            const container = document.querySelector(".sb-show-menu-bar");

            // Toggle visibility of floating text
            floatingText.style.display = "none";
            // Make sb-bar visible
            sbBar.style.visibility = "visible";
            // Remove hidden style from container
            container.style.visibility = "visible";
        }

        // Add click event listener to the floatingText element
        floatingText.addEventListener("click", toggleElementsVisibility);

        // Function to toggle visibility of the WhatsApp button
        function toggleWhatsAppButton(visible) {
            const whatsAppButton = document.querySelector(".api-whatsapp-button");
            if (whatsAppButton) {
                whatsAppButton.style.visibility = visible ? "visible" : "hidden"; // Fix: Use the 'visible' argument to set visibility
            }
        }


        // Function to check if there are active WhatsApp conversation items and toggle the WhatsApp button accordingly
        function checkActiveWAConversation() {
            const conversationItem = document.querySelector(
                "li.sb-active[data-conversation-source='wa']",
            );
            toggleWhatsAppButton(conversationItem !== null);
        }

        // Add click event listener to the menu-plus element to toggle the WhatsApp button
        document
            .querySelector(".menu-plus.bi-plus-lg")
            .addEventListener("click", function() {
                const conversationItem = document.querySelector(
                    "li.sb-active[data-conversation-source='wa']",
                );
                if (conversationItem) {
                    toggleWhatsAppButton(true);
                } else {
                    toggleWhatsAppButton(false);
                }
            });

        // Add click event listener to the floatingText element to hide the WhatsApp button
        document.getElementById("floatingText").addEventListener("click", function() {
            toggleWhatsAppButton(false);
        });

        // Execute the following code when the DOM content is loaded
        document.addEventListener("DOMContentLoaded", function() {
            // Check initially on page load
            checkActiveWAConversation();
        });

        //DONT TOUCH THIS CODE BELOW

        // Get references to the elements
        const sbIconDrag = document.querySelector(".menu-plus");
        const sbBarIcons = document.querySelector(".sb-bar-icons");

        // Function to toggle the visibility of sb-bar-icons
        function toggleSbBarIcons() {
            sbBarIcons.classList.toggle("sb-hide");
        }

        // Add a click event listener to menu-plus to toggle the visibility
        sbIconDrag.addEventListener("click", toggleSbBarIcons);

        // Add a click event listener to sb-list and textarea to hide sb-bar-icons
        document.querySelector(".sb-list").addEventListener("click", function() {
            sbBarIcons.classList.add("sb-hide");
        });

        document
            .querySelector(".sorting-by-last-message")
            .addEventListener("click", function() {
                sbBarIcons.classList.add("sb-hide");
            });

        document.querySelector("textarea").addEventListener("click", function() {
            sbBarIcons.classList.add("sb-hide");
        });
    </script>
<?php } ?>

<?php

/*
 * ----------------------------------------------------------
 * LANGUAGES BOX
 * ----------------------------------------------------------
 *
 * Display the languages selector lightbox
 *
 */

function sb_languages_box()
{ ?>
    <div class="sb-lightbox sb-languages-box" data-source="">
        <div class="sb-top-bar">
            <div><?php sb_e('Choose a language') ?></div>
            <div>
                <a class="sb-close sb-btn-icon">
                    <i class="bi-x-lg"></i>
                </a>
            </div>
        </div>
        <div class="sb-main sb-scroll-area"></div>
    </div>
<?php } ?>

<?php

/*
 * ----------------------------------------------------------
 * ROUTING AGENTS LIST
 * ----------------------------------------------------------
 *
 * Display the agents list for the routing
 *
 */

function sb_routing_select($exclude_id = false)
{
    $agents = sb_db_get('SELECT id, first_name, last_name FROM sb_users WHERE (user_type = "agent" OR user_type = "admin")' . ($exclude_id ? (' AND id <> ' . sb_db_escape($exclude_id)) : ''), false);
    $code = '<div class="sb-inline sb-inline-agents"><i class="bi-person-raised-hand" style="padding: 0px 5px;"></i><h3>' . sb_('Agent') . '</h3><div id="conversation-agent" class="sb-select"><p>' . sb_('None') . '</p><ul class="sb-responsive-absolute-position"><li data-id="" data-value="">' . sb_('None') . '</li>';
    for ($i = 0; $i < count($agents); $i++) {
        $code .= '<li data-id="' . $agents[$i]['id'] . '">' . $agents[$i]['first_name'] . ' ' . $agents[$i]['last_name'] . '</li>';
    }
    echo $code . '</ul></div></div>';
}

?>

<?php

/*
 * ----------------------------------------------------------
 * INSTALLATION BOX
 * ----------------------------------------------------------
 *
 * Display the form to install Steambox
 *
 */

function sb_installation_box($error = false)
{
    global $SB_LANGUAGE;
    $SB_LANGUAGE = isset($_GET['lang']) ? $_GET['lang'] : strtolower(substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2));

?>

    <!-- *
 * ----------------------------------------------------------
 * SETUP DATABASE 
 * ----------------------------------------------------------
 *
 * -->

    <div class="sb-main sb-admin sb-admin-start">
        <form class="sb-intall sb-admin-box">
            <?php if ($error === false || $error == 'installation') echo '<div class="sb-info"></div>';
            else die('<div class="sb-info sb-active">' . sb_('We\'re having trouble connecting to your database. Please edit the file config.php and check your database connection details. Error: ') . $error . '.</div>'); ?>
            <div class="sb-top-bar">
                <div class="sb-title"><?php sb_e('Setup') ?></div>
                <div class="sb-text">
                    <?php sb_e('Please complete the process by entering the database details below. If you are not sure about these details, please contact us for support.') ?>
                </div>
            </div>

            <div class="sb-main">
                <div id="db-name" class="sb-input">
                    <span>Database Name</span>
                    <input type="text" required placeholder="Enter name" />
                </div>
                <div id="db-user" class="sb-input">
                    <span>Username</span>
                    <input type="text" required placeholder="Enter username" />
                </div>
                <div id="db-password" class="sb-input">
                    <span>Password</span>
                    <input type="text" placeholder="Enter password" />
                </div>
                <div id="db-host" class="sb-input">
                    <span>Host URL</span>
                    <input type="text" placeholder="Enter host or leave empty" required />
                </div>
                <div id="db-port" class="sb-input">
                    <span>Port</span>
                    <input type="text" placeholder="Enter port" />
                </div>
                <?php if ($error === false || $error == 'installation') { ?>
                    <div class="sb-text">
                        <div class="sb-title">Create your account</div>
                    </div>
                    <div id="first-name" class="sb-input">
                        <span>First Name</span>
                        <input type="text" required placeholder="Enter first name" />
                    </div>
                    <div id="last-name" class="sb-input">
                        <span>Last Name</span>
                        <input type="text" required placeholder="Enter last name" />
                    </div>
                    <div id="email" class="sb-input">
                        <span>Email</span>
                        <input type="email" required placeholder="Enter email" />
                    </div>
                    <div id="password" class="sb-input">
                        <span>Password</span>
                        <input type="password" required placeholder="Enter password" />
                    </div>
                    <div id="password-check" class="sb-input">
                        <span>Repeat Password</span>
                        <input type="text" required placeholder="Repeat password" />
                    </div>
                <?php } ?>
                <div class="sb-bottom">
                    <div class="sb-btn sb-submit-installation">Create account</div>
                </div>
            </div>

            <style>
                ::-webkit-scrollbar {
                    width: 10px !important;
                }

                ::-webkit-scrollbar-track {
                    background-color: #f1f1f1 !important;
                }

                ::-webkit-scrollbar-thumb {
                    background-color: #888 !important;
                    border-radius:  var(--chat-rounded-size-7) !important;
                }

                ::-webkit-scrollbar-thumb:hover {
                    background-color: #555 !important;
                }

                ::-webkit-scrollbar-thumb:active {
                    background-color: #333 !important;
                }
            </style>

        </form>
    </div>

<?php } ?>
<?php

/*
 * ----------------------------------------------------------
 * ADMIN AREA
 * ----------------------------------------------------------
 *
 * Display the administration area
 *
 */

function sb_component_admin()
{
    $sb_settings = json_decode(file_get_contents(SB_PATH . '/resources/json/settings.json'), true);
    $active_user = sb_get_active_user(false, true);
    $collapse = sb_get_setting('collapse') ? ' sb-collapse' : '';
    $apps = [
        ['SB_WHATSAPP', 'whatsapp', '<i class="bi bi-wind"></i> WhatsApp API', 'Lets your users reach you via WhatsApp. Read and reply to all messages sent to your WhatsApp Business account directly from Steamboxchat.'],
        ['SB_WHATSMEOW', 'whatsmeow', '<i class="bi bi-qr-code"></i> WhatsApp QR', 'Lets your users reach you via WhatsApp. Read and reply to all messages sent to your WhatsApp Business account directly from Steamboxchat.'],
        ['SB_WAWEB', 'waweb', '<i class="bi bi-whatsapp"></i> WhatsApp Web', 'Lets your users reach you via WhatsApp. Read and reply to all messages sent to your WhatsApp Business account directly from Steamboxchat.'],
        ['SB_TELEGRAM', 'telegram', '<i class="bi-telegram"></i> Telegram Bot', 'Connect your Telegram bot to Steamboxchat to read and reply to all messages sent to your Telegram bot directly in Steamboxchat.'],
        ['SB_GBM', 'gbm', '<i class="bi-google"></i> Google', 'Read and reply to messages sent from Google Search, Maps and brand-owned channels directly in Steamboxchat.'],
        ['SB_TWITTER', 'twitter', '<i class="bi-twitter-x"></i> Twitter', 'Lets your users reach you via Twitter. Read and reply to messages sent to your Twitter account directly from Steamboxchat.'],
        ['SB_MESSENGER', 'messenger', '<i class="bi-messenger"></i> Messenger', 'Read, manage and reply to all messages sent to your Facebook pages and Instagram accounts directly from Steamboxchat.'],
        ['SB_TICKETS', 'tickets', 'Tickets', 'Provide help desk support to your customers by including a ticket area, with all chat features included, on any web page in seconds.'],
    ];
    $logged = $active_user && sb_is_agent($active_user);
    $supervisor = sb_supervisor() ? sb_get_setting('supervisor') : false;
    $is_admin = $active_user && sb_is_agent($active_user, true, true) && !$supervisor;
    $sms = sb_get_multi_setting('sms', 'sms-user');
    $css_class = ($logged ? 'sb-admin' : 'sb-admin-start') . (sb_get_setting('rtl-admin') || (defined('SB_CLOUD_DEFAULT_RTL')) ? ' sb-rtl' : '') . ($supervisor ? ' sb-supervisor' : '');
    $active_areas = [
        'users' => $is_admin || ($supervisor && $supervisor['supervisor-users-area']),
        'settings' => $is_admin || ($supervisor && $supervisor['supervisor-settings-area']),
        'reports' => ($is_admin && !sb_get_multi_setting('performance', 'performance-reports')) || ($supervisor && $supervisor['supervisor-reports-area'])
    ]; // temp delete sb_get_setting('admin-agents-users-area')
    if ($supervisor && !$supervisor['supervisor-send-message']) {
        echo '<style>.sb-board .sb-conversation .sb-editor,#sb-start-conversation,.sb-top-bar [data-value="sms"],.sb-top-bar [data-value="email"],.sb-menu-users [data-value="message"],.sb-menu-users [data-value="sms"],.sb-menu-users [data-value="email"] { display: none !important; }</style>';
    }
?>
    <div class="sb-main <?php echo $css_class ?>" style="opacity: 0">
        <?php if ($logged) { ?>
            <div class="sb-header">
                <div class="sb-admin-nav">

                    <?php
                    $admin_icon = sb_get_setting('admin-icon', STMBX_URL . '/media/icons.svg');
                    if ($admin_icon == STMBX_URL . '/media/icons.svg') {
                        // Si el valor devuelto es igual al valor predeterminado, imprime el SVG directamente
                        echo '
        <a href="https://steamboxchat.com" target="_blank"><svg class="rotimg"  data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 138.59" style="width: 20px;">
            <path d="M111.26 93.48c0 24.08-17.59 45.11-53.91 45.11-25.23 0-51.81-9-57.35-35.74l35.56-11.09c.76 6.88 9.55 12 19.69 12 7.45 0 13-2.87 13-8 0-6.69-8.22-7.07-21.6-10.32C22.17 79.52 4.21 70.92 4.21 43.39 4.21 17.21 27.34 0 56.77 0c23.52 0 44.93 11.66 49.71 35.17l-35.37 8.61c-1.53-5.36-6.69-9-14-9-7.65 0-11.66 3.06-11.66 7.65 0 6.5 9.94 7.07 20.26 9.94 32.74 8.99 45.55 18.55 45.55 41.11M160 118a20.55 20.55 0 1 1-20.64-20.46A20.55 20.55 0 0 1 160 118" style="fill:var(--chat-text-primary);"></path>
        </svg></a>';
                    } else {
                        // Si se proporciona un valor diferente al predeterminado, muestra la imagen
                        echo '<img class="rotimg" style="position: fixed;bottom: 30px;height:30px;" src="' . $admin_icon . '" />';
                    }
                    ?>
                    <div>
                        <a id="sb-conversations" class="sb-active bi-chat-left-dots">
                            <span>
                                <?php sb_e('Conversations') ?>
                            </span>
                        </a>
                        <?php
                        if ($active_areas['users']) echo '<a id="sb-users" class="bi-people" ><span>' . sb_('Users') . '</span></a>';
                        if ($active_areas['reports']) echo '<a id="sb-reports" class="bi-chart"><span>' . sb_('Reports') . '</span></a>';
                        if ($active_areas['settings']) echo '<a id="sb-settings" class="bi-gear-fill"><span>' . sb_('Settings') . '</span></a>';

                        ?>
                    </div>

                </div>

                <div style="color:var(--chat-text-primary);" class="sb-admin-nav-right sb-menu-mobile">
                    <i style="padding:17px 0px;" class="bi-three-dots-vertical"></i>
                    <div class="sb-desktop">
                        <div class="sb-account">
                            <img src="<?php echo STMBX_URL ?>/media/user.svg" />
                            <div style="box-shadow:none;height: 143px;background: #3b73ff00;top: -132px;width: 50px;">
                                <ul class="sb-menu" style="min-width:142px">
                                    <li data-value="status" style="padding-left: 30px;padding-top:12px" class="sb-online"> <?php sb_e('Online') ?></li>
                                    <li href="#" class="themeToggleBtn"><i class="bi-circle" style=" background: var(--chat-app-theme-color); border-radius: 24px; color: white; padding:0.8px 1px 0px 1px"></i> <?php sb_e('Tema') ?></li>
                                    <hr>
                                    <li data-value="logout"><i class="bi-power"></i>
                                        <?php sb_e('Logout') ?>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <?php echo '<div class="help-center"><i style="color:var(--chat-list-active-text);" class="bi-server"></i></div>' ?>
                        <!-- <?php echo '<div class="help-center"><i style="color:var(--chat-list-active-text);" class="bi"></i></div>' ?> -->

                    </div>
                    <div class="sb-mobile" style="top: -150px;animation:scale-up-br 0.2s cubic-bezier(0,1.45,1,1);-webkit-animation:scale-up-br 0.2s cubic-bezier(0,1.45,1,1);padding:8px;font-size: 1.1rem;font-weight: 500;">
                        <a href="#" class="sb-online" data-value="status"><?php sb_e('Online') ?></a>
                        <a href="#" class="themeToggleBtn"> <i class="bi bi-palette2"></i> <?php sb_e('Tema') ?></a>
                        <hr>
                        <a href="#" class="logout"><i class="bi bi-power"></i> <?php sb_e('Logout') ?></a>

                    </div>

                </div>
            </div>
            <main>
                <div class="sb-active sb-area-conversations">

                    <div class="sb-board">
                        <div class="sb-admin-list">
                            <div class="sb-top">

                                <div class="sb-select inbox">
                                    <p class="non-hover" data-value="0">
                                     <i class="bi-inboxes-fill"></i>&nbsp; <?php sb_e('Inbox') ?><span> </span>
                                    </p>
                                    <ul style="min-width: 8rem;max-height: none;">
                                        <li data-value="0" class="sb-active">
                                         <i class="bi-arrow-clockwise"></i>&nbsp; <?php sb_e('Inbox') ?>
                                            <span></span>
                                        </li>
                                        <hr>
                                        <li data-value="6">
                                         <i class="bi-pin-fill"></i>&nbsp; <?php sb_e('Follow up') ?>
                                            <span></span>
                                        </li>
                                        <li data-value="3">
                                         <i class="bi-archive"></i>&nbsp; <?php sb_e('Archived') ?>
                                        </li>
                                        <?php if ($is_admin) { ?>
                                            <li data-value="4">
                                             <i class="bi-box"></i>&nbsp; <?php sb_e('Container') ?>
                                            </li>
                                        <?php } ?>
                                    </ul>
                                </div>
                                <div class="sb-flex">
                                    <?php sb_conversations_filter() ?>
                                    <div class="sb-search-btn">
                                        <i class="sb-icon bi-search"></i>
                                        <input type="text" autocomplete="false" name="search" placeholder="<?php sb_e('Search for keywords or users...') ?>" />
                                    </div>
                                </div>
                            </div>

                            <div class="sb-scroll-area pt-50">
                                <ul class="sorting-by-last-message"></ul>
                            </div>
                        </div>
                        <div class="sb-conversation">
                            <div class="sb-top">
                                <i class="sb-btn-back bi-chevron-left"></i>
                                <div class="sb-labels"></div>
                                <a></a>
                                <div class="sb-menu-mobile sb-menu-top extra-background-color">
                                    <i class="bi-three-dots-vertical bkg-color-menu"></i>
                                    <ul class="ul-nav-top-mobile">
                                        <li>
                                            <a data-value="Details" class="sb-btn-icon open-profile" data-sb-tooltip="<?php sb_e('Details') ?>">
                                                <i class="bi-info-square"></i>
                                            </a>
                                        </li>
                                        <?php
                                        if ($is_admin || sb_get_setting('agents-delete') || sb_get_multi_setting('agents', 'agents-delete-conversation') || ($supervisor && $supervisor['supervisor-delete-conversation'])) {
                                            echo '<li><a data-value="delete" class="sb-btn-icon" data-sb-tooltip="' . sb_('Delete conversation') . '"><i class="bi-robot"></i></a></li>';
                                        }
                                        ?>
                                        <!-- <li>
                                            <a data-value="transcript" class="sb-btn-icon" data-sb-tooltip="<?php sb_e('Transcript') ?>" data-action="<?php echo sb_get_multi_setting('transcript', 'transcript-action') ?>">
                                                <i class="bi-arrow-down-circle"></i>
                                            </a>
                                        </li> -->
                                        <li>
                                            <a data-value="archive" class="sb-btn-icon" data-sb-tooltip="<?php sb_e('Archive conversation') ?>">
                                                <i class="bi-archive"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a data-value="read" class="sb-btn-icon" data-sb-tooltip="<?php sb_e('Mark as read') ?>">
                                                <i class="bi-check-lg-circle"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a data-value="inbox" class="sb-btn-icon" data-sb-tooltip="<?php sb_e('Send to inbox') ?>">
                                                <i class="bi-arrow-up-left-circle-fill"></i>
                                            </a>
                                        </li>
                                        <?php
                                        if ($is_admin || sb_get_setting('agents-delete') || sb_get_multi_setting('agents', 'agents-delete-conversation') || ($supervisor && $supervisor['supervisor-delete-conversation'])) {
                                            echo '<li><a data-value="empty-trash" class="sb-btn-icon sb-btn-red" data-sb-tooltip="' . sb_('Empty trash') . '"><i class="bi-trash"></i></a></li>';
                                        }
                                        ?>
                                    </ul>
                                </div>
                                <div class="sb-label-date-top"></div>

                            </div>
                            <div class="sb-list"></div>

                            <?php sb_component_editor(true); ?>
                            <div class="sb-no-conversation-message">
                                <div style=" text-align: start; margin: 0px 60px;">
                                    <h3>
                                        <?php sb_e('Select a conversation or start a new one') ?>
                                    </h3>
                                    <p>
                                        <?php sb_e('Select a conversation from the left menu or start a new conversation from the users area.') ?>
                                    </p>
                                </div>
                            </div>
                            <?php
                            if (sb_get_setting('chat-sound-admin') != 'n' || sb_get_setting('online-users-notification')) {
                                echo '<audio id="sb-audio" preload="auto"><source src="' . STMBX_URL . '/media/sound.mp3" type="audio/mpeg"></audio><audio id="sb-audio-out" preload="auto"><source src="' . STMBX_URL . '/media/sound-out.mp3" type="audio/mpeg"></audio>';
                            }
                            ?>
                        </div>


                        <!--added-->
                        <div class="sb-user-details sb-top">
                            <div style="display:none;" class="sb-top">

                            </div>

                            <div class="sb-scroll-area">
                                <div class="close-button-div"><i class="bi-x-lg no-show sb-btn-collapse collapse"></i></div>
                                <div class="open-profile sb-profile sb-profile-detail">
                                    <span class="sb-name span-profile-detail"></span>
                                </div>
                                <?php sb_departments('custom-select'); ?>
                                <?php sb_routing_select() ?>

                                <?php

                                echo '<div class="sb-panel-details sb-panel-tags">';
                                echo '<i class="bi-plus-lg"></i><h3>' . sb_('Tags') . '</h3>';
                                echo '<div id="tags-container" class="tagged">';
                                echo '<span class="sb-active">';
                                echo '<i class="bi-tags"></i></span>';
                                echo '</div></div>';
                                if (!sb_get_setting('disable-notes')) {
                                    echo '<div class="sb-panel-details sb-panel-notes' . $collapse . '"><i class="bi-stickies"></i><h3>' . sb_('Notes') . '</h3><div></div></div>';
                                }
                                if (!sb_get_setting('disable-attachments')) {
                                    echo '<div class="sb-panel-details sb-panel-attachments' . $collapse . '"></div>';
                                }

                                if (sb_get_setting('routing') || (sb_get_multi_setting('agent-hide-conversations', 'agent-hide-conversations-active') && sb_get_multi_setting('agent-hide-conversations', 'agent-hide-conversations-menu'))) {
                                    // sb_routing_select();

                                }







                                ?>


                                <h3>
                                    <?php sb_e('User conversations') ?>
                                </h3>
                                <ul class="sb-user-conversations"></ul>
                            </div>
                            <div class="sb-no-conversation-message"></div>
                        </div>
                    </div>
                    <i class="sb-btn-collapse sb-left bi-chevron-left"></i>
                    <i class="sb-btn-collapse sb-right bi-chevron-right"></i>
                </div>
                <?php if ($active_areas['users']) { ?>
                    <div class="sb-area-users">
                        <div class="sb-top-bar">
                            <div>
                                <h2 class="sb-hide">
                                    <?php sb_e('Users list') ?>
                                </h2>
                                <div class="sb-menu-wide sb-menu-users">
                                    <div class="sb-nav sb-nav-only">
                                        <?php sb_e('Users list') ?>
                                        <span data-count="0"></span>
                                    </div>

                                    <!--added-->
                                    <ul class="dropdown-content">


                                        <li class="start-group-button" data-type="lead">
                                            <?php sb_e('Leads') ?>
                                            <span data-count="0">(0)</span>
                                        </li>
                                        <li class="middle-group-button-right" data-type="visitor">
                                            <?php sb_e('Live chat') ?>
                                            <span data-count="0">(0)</span>
                                        </li>
                                        <li class="middle-group-button-left sb-hide" data-type="all">
                                            <?php sb_e('Total') ?>
                                            <span data-count="0">(0)</span>
                                        </li>

                                        <?php if ($is_admin || sb_get_setting('admin-agents-tab') || sb_get_multi_setting('agents', 'agents-tab')) {
                                            echo '<li  class="end-group-button"  data-type="agent">' . sb_('Team') . '</li>';
                                        } // temp delete sb_get_setting('admin-agents-tab')
                                        ?>


                                        <!-- <li class="sb-hide" data-type="all">
                                            <?php sb_e('Total') ?>
                                            <span data-count="0">(0)</span>
                                        </li>

                                        <li class="sb-hide" data-type="user">
                                            <?php sb_e('Users') ?>
                                            <span data-count="0">(0)</span>
                                        </li>
                                        <li class="sb-hide" data-type="online">
                                            <?php sb_e('Online') ?>
                                        </li> -->

                                    </ul>

                                </div>


                            </div>
                            <div>

                                <div class="sb-menu-mobile">
                                    <i class="bi-three-dots-vertical"></i>
                                    <ul id="hideOnSearchClick">
                                        <?php if ($supervisor || $is_admin) { ?>
                                            <li>
                                                <a class="sb-btn-icon sb-new-user" data-sb-tooltip="<?= sb_('Add user') ?>">
                                                    <i class="bi-person-circle"></i>
                                                </a>
                                            </li>
                                        <?php } ?>
                                        <li>
                                            <div style="display: none;">
                                                <input type="file" id="csvimport" name="csv" class="form-control" required>
                                            </div>
                                            <a data-value="csvimport" id="csv_contacts" class="not-show-small-screen sb-btn-icon" data-sb-tooltip="<?= sb_('Upload CSV') ?>">
                                                <i class="bi-filetype-csv"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a data-value="email" class="sb-btn-icon" data-sb-tooltip="<?php sb_e('Send email') ?>">
                                                <i class="bi-envelope-at"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a data-value="message" class="sb-btn-icon" data-sb-tooltip="<?php sb_e('Broadcast message') ?>">
                                                <i class="bi-megaphone"></i>
                                            </a>
                                        </li>
                                        <?php if (sb_is_agent() && $is_admin) { ?>
                                            <li>
                                                <a data-value="csv" class="sb-btn-icon bi-google" data-sb-tooltip="<?= sb_('Download CSV') ?>">
                                                </a>
                                            </li>
                                        <?php } ?>
                                        <li>
                                            <a style="display: none;" class="sb-btn-icon">
                                                <i class="bi-chat-text"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a data-value="delete" class="sb-btn-icon sb-btn-red" data-sb-tooltip="<?php sb_e('Delete users') ?>" style="display: none;">
                                                <i class="bi-trash"></i>
                                            </a>
                                        </li>
                                        <?php if ($sms) { ?>
                                            <li>
                                                <a data-value="sms" class="sb-btn-icon" data-sb-tooltip="<?= sb_('Send text message') ?>">
                                                    <i class="bi-chat-square-dots"></i>
                                                </a>
                                            </li>
                                        <?php } ?>
                                    </ul>
                                </div>



                                <div class="sb-search-btn">
                                    <i class="sb-icon bi-search"></i>
                                    <input type="text" autocomplete="false" name="search" placeholder="<?php sb_e('Search') ?>" />
                                </div>

                            </div>
                        </div>

                        <div class="sb-scroll-area">
                            <table class="sb-table sb-table-users">
                                <thead>
                                    <tr>
                                        <th>
                                            <input type="checkbox" />
                                        </th>
                                        <th data-field="first_name">
                                            <?php sb_e('Full name') ?>
                                        </th>
                                        <?php sb_users_table_extra_fields() ?>
                                        <th data-field="email">
                                            <?php sb_e('Email') ?>
                                        </th>
                                        <th data-field="user_type">
                                            <?php sb_e('Type') ?>
                                        </th>
                                        <th data-field="last_activity">
                                            <?php sb_e('Last activity') ?>
                                        </th>
                                        <th data-field="creation_time" class="sb-active">
                                            <?php sb_e('Registration date') ?>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                        <div class="sb-loading sb-loading-table"></div>
                    </div>
                <?php } ?>

                <?php if ($active_areas['settings']) { ?>
                    <div class="sb-area-settings">
                        <div class="sb-top-bar">
                            <div>
                                <h2>
                                    <?php sb_e('Settings') ?>
                                </h2>
                            </div>
                            <div>
                                <a class="sb-btn sb-save-changes sb-icon">
                                    <i class="bi-check-lg"></i><?php sb_e('Save changes') ?>
                                </a>

                            </div>
                        </div>
                        <div class="sb-tab">
                            <div class="sb-nav">
                                <div><?php sb_e('Settings') ?></div>
                                <ul style="padding-left: 0;">
                                    <li id="tab-admin" class="sb-active">
                                        <i class="bi-person-fill-gear"></i> <?php sb_e('Admin') ?>
                                    </li>
                                    <li id="tab-notifications">
                                        <i class="bi-app-indicator"></i> <?php sb_e('Notifications') ?>
                                    </li>
                                    <li id="tab-various">
                                        <i class="bi-box-seam"></i> <?php sb_e('Miscellaneous') ?>
                                    </li>
                                    <hr>
                                    <?php for ($i = 0; $i < count($apps); $i++) {
                                        if (defined($apps[$i][0])) echo '<li id="tab-' . $apps[$i][1] . '">' . sb_($apps[$i][2]) . '</li>';
                                    } ?>
                                    <li class="sb-hide" id="tab-apps">
                                        <?php sb_e('Integraciones') ?>
                                    </li>
                                    <hr>

                                    <li id="tab-chat">
                                        <i class="bi-chat-text"></i> <?php sb_e('Chat') ?>
                                    </li>
                                    <li id="tab-design">
                                        <i class="bi-paint-bucket"></i> <?php sb_e('Design') ?>
                                    </li>

                                </ul>
                            </div>
                            <div class="sb-content sb-scroll-area">
                                <div class="sb-active">
                                    <?php sb_populate_settings('admin', $sb_settings) ?>
                                </div>
                                <div>
                                    <?php sb_populate_settings('notifications', $sb_settings) ?>
                                </div>
                                <div>
                                    <?php sb_populate_settings('miscellaneous', $sb_settings) ?>
                                </div>
                                <?php sb_apps_area($apps) ?>
                                <div>
                                    <?php sb_populate_settings('chat', $sb_settings) ?>
                                </div>
                                <div>
                                    <?php sb_populate_settings('design', $sb_settings) ?>
                                </div>

                            </div>
                        </div>
                    </div>
                <?php } ?>
                <?php if ($active_areas['reports']) { ?>
                    <div class="sb-area-reports sb-loading">
                        <div class="sb-top-bar">
                            <div>
                                <h2><?php sb_e('Reports') ?></h2>
                            </div>
                            <div>
                                <div class="sb-setting sb-type-text"><input id="sb-date-picker" name="search" placeholder="00/00/0000 - 00/00/0000" type="text" /></div>
                            </div>
                        </div>
                        <div class="sb-tab">
                            <div class="sb-nav sb-nav-only">
                                <div><?php sb_e('Reports') ?></div>
                                <ul>
                                    <p class="sb-tab-nav-title">
                                        <?php sb_e('General') ?> <a style="vertical-align: middle; cursor:pointer;"></a>
                                    </p>
                                    <li id="leads">
                                        <?php sb_e('Leads') ?>
                                    </li>
                                    <li id="conversations" class="sb-active">
                                        <?php sb_e('All conversations') ?>
                                    </li>
                                    <li id="missed-conversations">
                                        <?php sb_e('Missed') ?>
                                    </li>
                                    <li id="conversations-time">
                                        <?php sb_e('Total time') ?>
                                    </li>
                                    <li id="status-client">
                                        <?php sb_e('Tagged') ?>
                                    </li>

                                    <p class="sb-tab-nav-title">
                                        <?php sb_e('Agents') ?> <a style="vertical-align: middle; cursor:pointer;"></a>
                                    </p>
                                    <li id="agents-conversations">
                                        <?php sb_e('Agent conversations') ?>
                                    </li>
                                    <li id="agents-conversations-time">
                                        <?php sb_e('Agent conversations time') ?>
                                    </li>
                                    <li id="agents-response-time">
                                        <?php sb_e('Agent response time') ?>
                                    </li>

                                    <li id="agents-ratings">
                                        <?php sb_e('Agent ratings') ?>
                                    </li>

                                    <p class="sb-tab-nav-title">
                                        <?php sb_e('Direct messages') ?> <a style="vertical-align: middle; cursor:pointer;"></a>
                                    </p>
                                    <li id="direct-messages">
                                        <?php sb_e('Chat messages') ?>
                                    </li>
                                    <li id="direct-emails">
                                        <?php sb_e('Emails') ?>
                                    </li>
                                    <li id="direct-sms">
                                        <?php sb_e('Text messages') ?>
                                    </li>
                                    <p class="sb-tab-nav-title">
                                        <?php sb_e('Live chat') ?> <a style="vertical-align: middle; cursor:pointer;"></a>
                                    </p>
                                    <li id="visitors">
                                        <?php sb_e('Visitors') ?>
                                    </li>
                                    <!-- <li id="users">
                                        <?php sb_e('Users') ?>
                                    </li> -->

                                    <li id="countries">
                                        <?php sb_e('Countries') ?>
                                    </li>
                                    <!-- <li id="languages">
                                        <?php sb_e('Languages') ?>
                                    </li> -->
                                    <li id="browsers">
                                        <?php sb_e('Browsers') ?>
                                    </li>
                                    <li id="os">
                                        <?php sb_e('Operating systems') ?>
                                    </li>


                                </ul>
                            </div>
                            <div class="sb-content sb-scroll-area">
                                <div class="sb-reports-tags" id="status-client">
                                    <p class="sb-reports-text"></p>
                                    <div class="sb-tags">
                                    </div>
                                </div>


                                <div class="sb-reports-chart">
                                    <div class="chart-cnt"><canvas></canvas></div>
                                </div>
                                <div class="sb-reports-sidebar">
                                    <div class="sb-title sb-reports-title"></div>
                                    <p class="sb-reports-text"></p>
                                    <div class="sb-collapse">
                                        <div>
                                            <table class="sb-table"></table>
                                        </div>
                                    </div>
                                </div>


                                <p class="sb-no-results"><?php echo sb_('No data found.') ?></p>
                            </div>
                        </div>
                    </div>
                <?php } ?>
            </main>
            <?php

            sb_profile_box();
            sb_profile_edit_box();
            sb_dialog();

            if (!sb_get_setting('disable-notes')) sb_notes_box();
            if (!sb_get_setting('disable-tags')) sb_tags_box();

            sb_send_template_box();
            sb_direct_message_box();
            if ($is_admin || $supervisor) {
                //  if (agent) {

                sb_updates_box();
                sb_requirements_box();
            }

            ?>
            <form class="sb-upload-form-admin sb-upload-form" action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post" enctype="multipart/form-data">
                <input type="file" name="files[]" class="sb-upload-files" multiple />
            </form>
            <div class="sb-info-card"></div>
        <?php } else {
            sb_login_box();
        } ?>
        <div class="sb-lightbox sb-lightbox-media">
            <div></div>
            <i class="bi-x-lg"></i>
        </div>
        <div class="sb-lightbox-overlay"></div>
        <div class="sb-loading-global sb-loading sb-lightbox"></div>
        <input type="email" name="email" style="display:none" autocomplete="email" />
        <input type="text" name="hidden" style="display:none" autocomplete="new-password" />
    </div>


<?php } ?>
<?php

/*
 * ----------------------------------------------------------
 * HTML FUNCTIONS
 * ----------------------------------------------------------
 *
 * 1. Echo the apps settings and apps area
 * 2. Echo the apps conversation panel container
 * 3. Code check
 * 4. Return the users table extra fields
 * 5. Return the conversations filter
 * 
 */

function sb_apps_area($apps)
{
    $apps_php = [];
    $wp = defined('SB_WP');
    $code = '';
    for ($i = 0; $i < count($apps); $i++) {
        if (defined($apps[$i][0])) {
            $code .= '<div>' . sb_populate_app_settings($apps[$i][1]) . '</div>';
        }
    }
    $code .= '<div><div class="sb-apps">';
    for ($i = 1; $i < count($apps); $i++) {
        if (($wp && !in_array($apps[$i][0], $apps_php)) || (!$wp && !in_array($apps[$i][0], ['SB_WOOCOMMERCE', 'SB_UMP', 'SB_ARMEMBER']))) {
            $code .= '<div data-app="' . $apps[$i][1] . '">' . (defined($apps[$i][0]) ? '<i class="bi-check-lg"></i>' : '') . ' <img src="' . STMBX_URL . '/media/apps/' . $apps[$i][1] . '.svg" /><h2>' . $apps[$i][2] . '</h2><p>' . sb_s($apps[$i][3]) . '</p></div>';
        }
    }
    echo $code . '</div></div>';
}


function sb_users_table_extra_fields()
{
    $extra_fields = sb_get_setting('user-table-extra-columns');
    $count = $extra_fields && !is_string($extra_fields) ? count($extra_fields) : false;
    if ($count) {
        $code = '';
        for ($i = 0; $i < $count; $i++) {
            $slug = $extra_fields[$i]['user-table-extra-slug'];
            $code .= '<th data-field="' . $slug . '" data-extra="true">' . sb_string_slug($slug, 'string') . '</th>';
        }
        echo $code;
    }
}function sb_conversations_filter()
{
    // Verificar si los filtros están deshabilitados
    if (!sb_get_setting('disable-filters')) return;
    
    // Obtener los departamentos y contar cuántos hay
    $departments = sb_get_setting('departments');
    $count = is_array($departments) ? count($departments) : 0;
    
    // Generar el botón de filtro y la lista de departamentos
    $code = '<div class="sb-filter-btn"><i class="bi-filter"></i><div><div class="sb-select' . ($count ? '' : ' sb-hide') . '">';
    $code .= '<p><i class="bi-building"></i> &nbsp;' . sb_('All departments') . '</p><ul style="min-width: 8rem;max-height: none;">';
    $code .= '<li data-value=""><i class="bi-arrow-clockwise"></i> &nbsp;' . sb_('All departments') . '</li><hr>';
    
    // Añadir cada departamento a la lista
    for ($i = 0; $i < $count; $i++) {
        $code .= '<li data-value="' . $departments[$i]['department-id'] . '">';
        $code .= '<i class="bi bi-diagram-3-fill"></i> &nbsp; ' . ucfirst(sb_($departments[$i]['department-name'])) . '</li>';
    }
    $code .= '</ul></div>';
    
    // Definir los canales de comunicación
    $sources = [
        ['wa', 'WhatsApp', 'SB_WHATSAPP', 'bi-wind'], // WhatsApp
        ['ww', 'WhatsApp', 'SB_WHATSMEOW', 'bi-qr-code'], // WhatsApp QR
        ['wx', 'WhatsApp', 'SB_WAWEB', 'bi-whatsapp'], // WhatsApp Web
        ['tk', 'Live Chat', true, 'bi-chat-dots'], // Live Chat
        ['tg', 'Telegram', 'SB_TELEGRAM', 'bi-telegram'], // Telegram
        ['fb', 'Messenger', 'SB_MESSENGER', 'bi-messenger'], // Messenger
        ['ig', 'Instagram', 'SB_MESSENGER', 'bi-instagram'], // Instagram
        ['tw', 'Twitter', 'SB_TWITTER', 'bi-twitter'], // Twitter
        ['bm', 'Google', 'SB_GBM', 'bi-google'], // Google
        ['wc', 'WeChat', false, ''], // WeChat (no icon provided)
        ['tm', 'SMS', false, ''] // SMS (no icon provided)
    ];
    
    // Generar la lista de canales de comunicación
    $code .= '<div class="sb-select"><p><i class="bi-collection"></i><span> &nbsp; ' . sb_('All channels') . '</span></p><ul style="min-width: 8rem;max-height: none;">';
    $code .= '<li data-value=""><i class="bi-arrow-clockwise"></i> &nbsp;' . sb_('All channels') . '</li><hr>';
    
    // Añadir cada canal a la lista
    for ($i = 0; $i < count($sources); $i++) {
        if ($sources[$i][2] === true || defined($sources[$i][2])) {
            $icon_class = $sources[$i][3]; // Obtener la clase del icono
            $icon_html = $icon_class ? '<i class="bi ' . $icon_class . '"></i>' : ''; // Generar HTML del icono si se proporciona la clase del icono
            $channel_name = '<span>' . $sources[$i][1] . '</span>'; // Envolver el nombre del canal en etiquetas <span>
            $style = $sources[$i][1] === 'WhatsApp' ? 'style="visibility: visible;"' : ''; // Agregar estilo en línea para anular la propiedad de visibilidad para el canal de WhatsApp
            $code .= '<li data-value="' . $sources[$i][0] . '"' . $style . '>' . $icon_html . ' &nbsp;' . $channel_name . '</li>';
        }
    }
    
    $code .= '</ul></div>';
    $code .= '</div></div>';
    
    echo $code;
}
?>
