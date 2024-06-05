<?php
header("Content-Type: application/json");
require_once('config.php');

$qrurl = $_GET['qrurl'];
$authToken = WX_TOKEN;  
$url = WX_URL_GO . ':' . $qrurl . '/api/user/login?auth=' . $authToken;
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);

if($response === false) {
    // Handle the error gracefully
    $error_message = curl_error($ch);
    // Return JSON response with the error message
    echo json_encode(array("error" => "Error occurred: " . $error_message));
} else {
    // Return the response as is
    echo $response;
}

curl_close($ch);
?>
