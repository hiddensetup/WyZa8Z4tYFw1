<?php
global $SB_CONNECTION;
$connection_success = false;
$connection_check = false;
$steambox_url = '';
define('SB_PATH', getcwd());
if (file_exists('config.php')) {
  require('include/functions.php');
  if (!defined('STMBX_URL')) define('STMBX_URL', '');
  $connection_check = sb_db_check_connection();
  $connection_success = $connection_check === true;
  $steambox_url = '';
  if ($connection_success) {
    $steambox_url = STMBX_URL . '/';

  }
} else {
  define('steambox_url', '');
  $file = fopen('config.php', 'w');
  fwrite($file, '');
  fclose($file);
  require('include/functions.php');
}
require('include/components.php');
?>

<!DOCTYPE html>

<html lang="en" data-theme="dark">

<head>
  <meta charset="UTF-8">
  <meta content="IE=edge" http-equiv="X-UA-Compatible">
  <meta content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no" name="viewport">
  <meta name="robots" content="noindex, nofollow">
  <meta name="robots" content="noindex, nofollow">
  <meta name="theme-color" content="#181925" />
  <meta http-equiv="cache-control" content="no-cache, no-store, must-revalidate">
  <meta http-equiv="pragma" content="no-cache">
  <meta http-equiv="expires" content="0">
  <title><?php echo $connection_success && sb_get_setting('admin-title') ? sb_get_setting('admin-title') : '#steamboxchat!' ?></title>
  <script src="js/vue.global.prod.js" rel="preload" as="script"></script>
  <script src="<?php echo (file_exists('js/jquery.js')) ? $steambox_url . 'js/jquery.js' : 'https://code.jquery.com/jquery-3.6.4.min.js'; ?>" integrity="<?php echo (file_exists('js/jquery.js')) ? '' : 'sha256-oP6HI9z1XaZNBrJURtCoUT5SUnxFr8s3BzRl+cbzUq8='; ?>" crossorigin="<?php echo (file_exists('js/jquery.js')) ? '' : 'anonymous'; ?>"></script>
  <script src="<?php echo file_exists('js/min/main.js') ? $steambox_url . 'js/min/main.js' : $steambox_url . 'js/main.js'; ?>"></script>
  <script src="<?php echo file_exists('js/min/admin.js') ? $steambox_url . 'js/min/admin.js' : $steambox_url . 'js/admin.js'; ?>"></script>
  <script src="<?php echo file_exists('js/min/metatemplate.js') ? $steambox_url . 'js/min/metatemplate.js' : $steambox_url . 'js/metatemplate.js'; ?>"></script>
  <link href="<?php echo $steambox_url . 'node_modules/bootstrap-icons/font/bootstrap-icons.min.css' ?>" rel="stylesheet" id="theme" media="all">

  <link href="<?php echo $steambox_url . 'css/admin.css' ?>" rel="stylesheet" id="theme" media="all">
  <link href="<?php echo sb_get_setting('admin-icon', $steambox_url . 'media/icon.png') ?>" rel="shortcut icon" type="image/png">
  <link href="<?php echo sb_get_setting('admin-icon', $steambox_url . 'resources/pwa/icons/icon-192x192.png') ?>" rel="apple-touch-icon">
  <link href="<?php echo sb_get_setting('manifest-url', $steambox_url . 'resources/pwa/manifest.json') ?>" rel="manifest">
  <link rel="shortcut icon" type="image/png" href="<?php echo sb_get_setting('admin-icon', $steambox_url . 'icon.png') ?>" />
  <link href="<?php echo $steambox_url . 'css/responsive-admin.css' ?>" rel="stylesheet" media="(max-width:554px)">
  </head>
<body>

  <div  id="overlay">
    <div id="loader">
              <img src="<?php echo sb_get_setting('login-icon') != false ? sb_get_setting('login-icon') : STMBX_URL . '/media/icon.svg' ?>" style="width:90px; animation:rotate-in-center 1s infinite;" alt="Loading...">

    </div>
  </div>

  <?php if (!$connection_success) {
    sb_installation_box($connection_check);
    die();
  }
  sb_component_admin();
  ?>


</body>
<?php if ($connection_success){ sb_js_global(); sb_js_admin();} ?>
<script src="js/vue.global.prod.js"></script>
<script src="<?php echo $steambox_url . 'js/app.js' ?>"></script>
<script src="<?php echo $steambox_url . 'js/WebAudioRecorder.min.js' ?>"></script>

</html>