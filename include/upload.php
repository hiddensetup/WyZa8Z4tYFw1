<?php
include_once('../config.php');
include_once('./functions.php');
$data = json_decode(openssl_decrypt(base64_decode(isset($_POST['cloud']) ? $_POST['cloud'] : $_COOKIE['sb-cloud']), 'AES-256-CBC', hash('sha256', TOKEN), 0, substr(hash('sha256', 'iv'), 0, 16)), true);
// if (defined('SB_CROSS_DOMAIN')) {
//     header('Access-Control-Allow-Origin: *');
// }

$allowed_extensions = array('jpg', 'jpeg', 'png', 'pdf', 'mp4', 'mp3', 'ogg', 'amr', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'pdf', 'txt', 'webp', 'gif');

$format = array('audio' => ['amr', 'mp3', 'ogg', 'mpeg'], 'video' => ['mp4', 'avi']);
if (isset($_FILES['file'])) {
    if (0 < $_FILES['file']['error']) {
        die(json_encode(['error', 'Steambox error: Error into upload.php file.']));
    } else {
        $file_name = htmlspecialchars(str_replace(['javascript:', 'onclick=', 'onerror=', '<script', '</script'], '', basename($_FILES['file']['name'])), ENT_NOQUOTES | ENT_SUBSTITUTE, 'utf-8');
        $infos = pathinfo($file_name);
        $directory_date = date('d-m-y');
        $path = '../uploads/' . $directory_date;
        $url = STMBX_URL . '/uploads/' . $directory_date;

        if (!file_exists($path)) {
            mkdir($path, 0777, true);
        }

        if (strtolower($infos['extension']) == 'webp') {
            // For webp files, use the original filename without extras
            $file_name = preg_replace('/\s+/', '_', $infos['filename']) . '.' . strtolower($infos['extension']);
        } else {
            $file_name = generateFileName($file_name, $infos['extension']);
        }
        move_uploaded_file($_FILES['file']['tmp_name'], $path . '/' . $file_name);
        //mime_type get
        $temp = $path . '/' . $file_name;
        $mime_type = mime_type_get($temp);
        //whatsapp media id post
        $res = getMedia($path, $cfile, $file_name, $mime_type, $phone_number_id);

        die(json_encode(['success', $url . '/' . $file_name, $res['id']]));
    }
} else {
    die(json_encode(array('error', 'Key file in $_FILES not found.')));
}
function mime_type_get($file)
{
    $file = escapeshellarg($file);
    $mime = shell_exec("file -bi " . $file);
    $str_end = strpos($mime, ";");
    $mime_type = substr($mime, 0, $str_end);
    return $mime_type;
}

function getMedia($path, $cfile, $file_name, $mime_type, $phone_number_id)
{
    $cfile = new CURLFile($path . '/' . $file_name, $mime_type, $file_name);
    $post_fields = array('file' => $cfile, 'type' => $mime_type, 'filename' => $file_name, 'messaging_product' => 'whatsapp');
    $url_part = sb_get_multi_setting('whatsapp-cloud', 'whatsapp-cloud-phone-id') . '/media';
    $token = sb_get_multi_setting('whatsapp-cloud', 'whatsapp-cloud-token');
    $response = sb_curl('https://graph.facebook.com/v15.0/' . $url_part, $post_fields, ['Authorization: Bearer ' . $token, 'Content-type: multipart/form-data'], 'UPLOAD');
    $res = is_string($response) ? json_decode($response, true) : $response;
    return $res;
}

function generateFileName($file_name, $ext)
{
    $hour = date('H');
    $date = date('dmY');
    $hash = substr(md5(uniqid()), 0, 18);
    return $hour . '-' . $date . '-' . $hash . '.' . $ext;
}

function sb_upload_escape($string)
{
    $string = str_replace(['<script', '</script'], ['&lt;script', '&lt;/script'], $string);
    $string = str_replace(['javascript:', 'onclick=', 'onerror='], '', $string);
    return htmlspecialchars($string, ENT_NOQUOTES | ENT_SUBSTITUTE, 'utf-8');
}
