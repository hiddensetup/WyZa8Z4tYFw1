<?php
header("Content-Type: application/json");
header("Cache-Control: no-cache, must-revalidate");
require_once('../config.php');

$qrurl = $_GET['qrurl'];
$authToken = WW_TOKEN;  
$url = WW_URL_GO . ':' . $qrurl . '/api/user/login?auth=' . $authToken;
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);

if($response === false) {
    // Handle the error gracefully
    $error_message = curl_error($ch);
    // Return JSON response with the error message
    echo json_encode(array("error" => "Error occurred: " . $error_message));
} else {
    // Check if the response is a valid JSON or an image
    $jsonResponse = json_decode($response, true);
    if (json_last_error() == JSON_ERROR_NONE) {
        // It's a JSON response
        echo $response;
    } else {
        // Assume it's an image; encode it in base64
        $base64Image = base64_encode($response);
        echo json_encode(array("image" => $base64Image));
    }
}

curl_close($ch);
?>
