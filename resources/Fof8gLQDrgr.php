<?php
header('Content-Type: application/json');

// GitHub repository details
$owner = 'hiddensetup';
$repo = 'WyZa8Z4tYFw1';
$apiUrl = "https://api.github.com/repos/$owner/$repo/commits?per_page=3";

$context = stream_context_create([
    'http' => [
        'header' => 'User-Agent: YourAppName'
    ]
]);

$response = @file_get_contents($apiUrl, false, $context);

if ($response === false) {
    echo json_encode(["error" => "Failed to fetch data from GitHub API"]);
    http_response_code(500); // Internal Server Error
} else {
    echo $response;
}
?>
