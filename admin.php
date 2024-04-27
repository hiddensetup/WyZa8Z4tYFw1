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

<html lang="en" data-theme="steambox">

<head>
  <meta charset="UTF-8">
  <meta content="IE=edge" http-equiv="X-UA-Compatible">
  <meta content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no" name="viewport">
  <meta name="robots" content="noindex, nofollow">
  <meta name="robots" content="noindex, nofollow">
  <meta name="theme-color" content="white" />
  <meta http-equiv="cache-control" content="no-cache, no-store, must-revalidate">
  <meta http-equiv="pragma" content="no-cache">
  <meta http-equiv="expires" content="0">
  <title><?php echo $connection_success && sb_get_setting('admin-title') ? sb_get_setting('admin-title') : '#steamboxchat!' ?></title>
  <script src="js/vue.global.prod.js" rel="preload" as="script"></script>
  <script src="<?php echo (file_exists('js/jquery.js')) ? $steambox_url . 'js/jquery.js' : 'https://code.jquery.com/jquery-3.6.4.min.js'; ?>" integrity="<?php echo (file_exists('js/jquery.js')) ? '' : 'sha256-oP6HI9z1XaZNBrJURtCoUT5SUnxFr8s3BzRl+cbzUq8='; ?>" crossorigin="<?php echo (file_exists('js/jquery.js')) ? '' : 'anonymous'; ?>"></script>
  <script src="<?php echo file_exists('js/min/main.js') ? $steambox_url . 'js/min/main.js' : $steambox_url . 'js/main.js'; ?>"></script>
  <script src="<?php echo file_exists('js/min/admin.js') ? $steambox_url . 'js/min/admin.js' : $steambox_url . 'js/admin.js'; ?>"></script>
  <script src="<?php echo file_exists('js/min/metatemplate.js') ? $steambox_url . 'js/min/metatemplate.js' : $steambox_url . 'js/metatemplate.js'; ?>"></script>
  <link href="<?php echo file_exists('/node_modules/bootstrap-icons/font/bootstrap-icons.min.css') ? 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css' : $steambox_url . 'node_modules/bootstrap-icons/font/bootstrap-icons.css'; ?>" rel="stylesheet" media="all">

  <link href="<?php echo $steambox_url . 'css/admin.css' ?>" rel="stylesheet" id="theme" media="all">
  <link href="<?php echo sb_get_setting('admin-icon', $steambox_url . 'media/icon.png') ?>" rel="shortcut icon" type="image/png">
  <link href="<?php echo sb_get_setting('admin-icon', $steambox_url . 'resources/pwa/icons/icon-192x192.png') ?>" rel="apple-touch-icon">
  <link href="<?php echo sb_get_setting('manifest-url', $steambox_url . 'resources/pwa/manifest.json') ?>" rel="manifest">
  <link rel="shortcut icon" type="image/png" href="<?php echo sb_get_setting('admin-icon', $steambox_url . 'icon.png') ?>" />
  <link href="<?php echo $steambox_url . 'css/responsive-admin.css' ?>" rel="stylesheet" media="(max-width:554px)">
</head>

<body>
<div id="overlay">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" xml:space="preserve" width="80" height="80"><path d="M40.02 9.312c-16.939 0 -30.807 13.868 -30.807 30.807S23.081 70.926 40.02 70.926s30.807 -13.868 30.807 -30.807S56.959 9.312 40.02 9.312m0 14.998c1.664 0 3.031 1.347 3.031 3.031s-1.347 3.031 -3.031 3.031 -3.031 -1.367 -3.031 -3.031 1.367 -3.031 3.031 -3.031m1.981 9.49c0 1.07 -0.892 1.981 -1.981 1.981s-1.981 -0.892 -1.981 -1.981 0.892 -1.981 1.981 -1.981 1.981 0.892 1.981 1.981m12.204 1.644c-0.02 0.277 -0.178 0.575 -0.416 0.693l-12.878 7.449c-0.555 0.317 -1.228 0.317 -1.783 0l-9.529 -5.488c-0.119 -0.079 -0.258 0.02 -0.258 0.139v1.743c0 0.059 0.04 0.119 0.079 0.139l9.708 5.607c0.555 0.317 1.228 0.317 1.783 0l12.501 -7.211c0.337 -0.198 0.792 0.04 0.792 0.416v8.658c0 0.277 -0.158 0.575 -0.416 0.693l-12.878 7.41c-0.555 0.317 -1.228 0.317 -1.783 0l-12.878 -7.449c-0.258 -0.158 -0.416 -0.416 -0.416 -0.693v-3.031c0 -0.198 0.198 -0.297 0.396 -0.198l12.897 7.429c0.555 0.317 1.228 0.317 1.783 0l9.708 -5.607c0.04 -0.04 0.079 -0.079 0.079 -0.139v-1.743c0 -0.139 -0.139 -0.198 -0.258 -0.139l-9.529 5.488c-0.555 0.317 -1.228 0.317 -1.783 0l-12.878 -7.41c-0.277 -0.158 -0.456 -0.456 -0.456 -0.773v-9.49l6.756 -3.903c1.387 -0.792 3.11 0.158 3.11 1.684v0.04c0 0.218 -0.139 0.456 -0.337 0.575l-6.142 3.586 9.906 5.726c0.555 0.317 1.228 0.317 1.783 0l9.906 -5.726 -6.142 -3.546c-0.198 -0.119 -0.337 -0.337 -0.337 -0.575v-0.04c0 -1.526 1.743 -2.496 3.11 -1.684l6.756 3.903 0.02 2.496z" style="fill:var(--steambox-color);width:90px;animation: pulse 2s infinite"/></svg>
    <div id="loader">

<style>
 

 @keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.6), 0 0 0 0 rgba(0, 0, 0, 0.4), 0 0 0 0 rgba(0, 0, 0, 0.2);
  }
  70% {
    box-shadow: 0 0 0 20px rgba(0, 0, 0, 0), 0 0 0 40px rgba(0, 0, 0, 0), 0 0 0 60px rgba(0, 0, 0, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.6), 0 0 0 0 rgba(0, 0, 0, 0.4), 0 0 0 0 rgba(0, 0, 0, 0.2);
  }
}
</style>
    </div>
  </div>

  <?php if (!$connection_success) {
    sb_installation_box($connection_check);
    die();
  }
  sb_component_admin();
  ?>


</body>
<?php if ($connection_success) {
  sb_js_global();
  sb_js_admin();
} ?>
<script src="js/vue.global.prod.js"></script>
<script src="<?php echo $steambox_url . 'js/app.js' ?>"></script>
<script src="<?php echo $steambox_url . 'js/WebAudioRecorder.min.js' ?>"></script>

</html>