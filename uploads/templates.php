<?php

function getFacebookData($userId) {
    $ch = curl_init();

    $url = 'https://graph.facebook.com/v18.0/' . $userId . '/message_templates?language=es';
    
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');

    $headers = array();
    $headers[] = 'Authorization: Bearer EAApH1KmWEt0BO7nFeOSIWjKMyM8oZBuenbAWX87X4SOhqvmvUdZBZCviMsXVI1ImwzVZBAtXF1solvBIXsZBUzB0zifeo4Hb2Rrm3hpnZBVRgvzq8ZAoEJbZBhbXZCgPZBqFQAZBQSZAD8S3cSGeez0ZArTLnpxAAZCGDaLDOmKVW69xkxjtXqSeEBxcEHNkBjAZBGThUnb'; // Replace 'YOUR_ACCESS_TOKEN' with your actual access token
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    $result = curl_exec($ch);
    if (curl_errno($ch)) {
        echo 'Error:' . curl_error($ch);
    }
    curl_close($ch);

    // Save the result to a JSON file
    $jsonFilePath = 'meta_templates.json';
    file_put_contents($jsonFilePath, $result);

    // Print a success message
    echo 'Data downloaded and saved to ' . $jsonFilePath;
}

// Call the function with the specific user ID to get Facebook data
getFacebookData('262329956958606');

?>
