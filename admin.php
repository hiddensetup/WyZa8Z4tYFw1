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

<html lang="en" data-theme="routin">

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
  <title><?php echo $connection_success && sb_get_setting('admin-title') ? sb_get_setting('admin-title') : 'Routin | Cloud' ?></title>
  <!-- <script src="js/vue.global.prod.js" rel="preload" as="script"></script> -->
  <script src="<?php echo (file_exists('js/jquery.js')) ? $steambox_url . 'js/jquery.js' : 'https://code.jquery.com/jquery-3.6.4.min.js'; ?>" integrity="<?php echo (file_exists('js/jquery.js')) ? '' : 'sha256-oP6HI9z1XaZNBrJURtCoUT5SUnxFr8s3BzRl+cbzUq8='; ?>" crossorigin="<?php echo (file_exists('js/jquery.js')) ? '' : 'anonymous'; ?>"></script>
  <script src="<?php echo file_exists('js/min/main.js') ? $steambox_url . 'js/min/main.js' : $steambox_url . 'js/source/main.js'; ?>"></script>
  <script src="<?php echo file_exists('js/min/admin.js') ? $steambox_url . 'js/min/admin.js' : $steambox_url . 'js/source/admin.js'; ?>"></script>
  <script src="<?php echo file_exists('js/min/metatemplate.js') ? $steambox_url . 'js/min/metatemplate.js' : $steambox_url . 'js/source/metatemplate.js'; ?>"></script>
  <!-- <link href="<?php echo file_exists('/node_modules/bootstrap-icons/font/bootstrap-icons.min.css') ? 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css' : $steambox_url . 'node_modules/bootstrap-icons/font/bootstrap-icons.css'; ?>" rel="stylesheet" media="all"> -->

  <link href="<?php echo $steambox_url . 'css/admin.css' ?>" rel="stylesheet" id="theme" media="all">
  <link href="<?php echo sb_get_setting('admin-icon', $steambox_url . 'media/icon.png') ?>" rel="shortcut icon" type="image/png">
  <link href="<?php echo sb_get_setting('admin-icon', $steambox_url . 'resources/pwa/icons/icon-192x192.png') ?>" rel="apple-touch-icon">
  <link href="<?php echo sb_get_setting('manifest-url', $steambox_url . 'resources/pwa/manifest.json') ?>" rel="manifest">
  <link rel="shortcut icon" type="image/png" href="<?php echo sb_get_setting('admin-icon', $steambox_url . 'icon.png') ?>" />
  <link href="<?php echo $steambox_url . 'css/responsive-admin.css' ?>" rel="stylesheet" media="(max-width:554px)">

</head>

<body>
<div id="overlay">
<!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" xml:space="preserve" width="80" height="80"><path d="M40.02 9.312c-16.939 0 -30.807 13.868 -30.807 30.807S23.081 70.926 40.02 70.926s30.807 -13.868 30.807 -30.807S56.959 9.312 40.02 9.312m0 14.998c1.664 0 3.031 1.347 3.031 3.031s-1.347 3.031 -3.031 3.031 -3.031 -1.367 -3.031 -3.031 1.367 -3.031 3.031 -3.031m1.981 9.49c0 1.07 -0.892 1.981 -1.981 1.981s-1.981 -0.892 -1.981 -1.981 0.892 -1.981 1.981 -1.981 1.981 0.892 1.981 1.981m12.204 1.644c-0.02 0.277 -0.178 0.575 -0.416 0.693l-12.878 7.449c-0.555 0.317 -1.228 0.317 -1.783 0l-9.529 -5.488c-0.119 -0.079 -0.258 0.02 -0.258 0.139v1.743c0 0.059 0.04 0.119 0.079 0.139l9.708 5.607c0.555 0.317 1.228 0.317 1.783 0l12.501 -7.211c0.337 -0.198 0.792 0.04 0.792 0.416v8.658c0 0.277 -0.158 0.575 -0.416 0.693l-12.878 7.41c-0.555 0.317 -1.228 0.317 -1.783 0l-12.878 -7.449c-0.258 -0.158 -0.416 -0.416 -0.416 -0.693v-3.031c0 -0.198 0.198 -0.297 0.396 -0.198l12.897 7.429c0.555 0.317 1.228 0.317 1.783 0l9.708 -5.607c0.04 -0.04 0.079 -0.079 0.079 -0.139v-1.743c0 -0.139 -0.139 -0.198 -0.258 -0.139l-9.529 5.488c-0.555 0.317 -1.228 0.317 -1.783 0l-12.878 -7.41c-0.277 -0.158 -0.456 -0.456 -0.456 -0.773v-9.49l6.756 -3.903c1.387 -0.792 3.11 0.158 3.11 1.684v0.04c0 0.218 -0.139 0.456 -0.337 0.575l-6.142 3.586 9.906 5.726c0.555 0.317 1.228 0.317 1.783 0l9.906 -5.726 -6.142 -3.546c-0.198 -0.119 -0.337 -0.337 -0.337 -0.575v-0.04c0 -1.526 1.743 -2.496 3.11 -1.684l6.756 3.903 0.02 2.496z" style="fill:var(--steambox-color);width:90px;animation: pulse 2s infinite"/></svg> -->
<svg style="border-radius: 60px ;height: 60px;" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 60 52.609" xml:space="preserve" width="60" height="52.609"><path style="fill:var(--steambox-color)" d="M29.868 49.296h13.246v2.573l9.947 -5.654 -9.947 -5.654v2.573h-13.308a17.76 17.76 0 0 1 -12.594 -5.19 17.715 17.715 0 0 1 -5.281 -12.625 17.805 17.805 0 0 1 3.858 -11.154H8.459a23.85 23.85 0 0 0 -2.696 11.076c0 13.277 10.813 24.059 24.107 24.059m0 -48.102H9.156L13.2 4.277 9.156 7.357h20.773c9.822 0 17.832 7.979 17.862 17.816a18 18 0 0 1 -4.058 11.402h7.405a23.805 23.805 0 0 0 2.837 -11.324C53.992 11.976 43.162 1.194 29.87 1.194M6.772 8.166"/><path style="fill:var(--steambox-color)" class="st0" d="M35.819 27.948a6.3 6.3 0 0 0 2.292 -2.2c0.76 -1.193 1.146 -2.573 1.146 -4.09v-0.03c0 -1.534 -0.341 -2.881 -1.006 -3.982 -0.666 -1.129 -1.643 -1.998 -2.897 -2.603 -1.208 -0.588 -2.68 -0.883 -4.354 -0.883h-9.389v22.399h5.995v-7.498h2.712l3.858 7.498h6.257zm-8.21 -8.723h2.867c0.852 0 1.501 0.216 1.982 0.649 0.464 0.419 0.682 1.006 0.682 1.766v0.03c0 0.79 -0.216 1.364 -0.649 1.782 -0.464 0.433 -1.099 0.636 -1.968 0.636h-2.928v-4.863z" /></svg>

<div id="loader">

<style>
 

 @keyframes pulse {
  0% {
    box-shadow: 0 0 2px 7px rgb(255 255 255 / 90%);
  }
  100% {
    box-shadow: 0 0 0px 5px rgb(255 255 255);
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
<!-- <script src="js/vue.global.prod.js"></script> -->
<script src="<?php echo $steambox_url . 'js/rtn/app.js' ?>"></script>
<script src="<?php echo $steambox_url . 'js/rtn/WebAudioRecorder.min.js' ?>"></script>

</html>