<?php
// Include the config.php file
require_once('../config.php');

// Create connection
$conn = new mysqli(SB_DB_HOST, SB_DB_USER, SB_DB_PASSWORD, SB_DB_NAME);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Function to retrieve value from the database settings
function getValueFromDB($conn) {
    // Query to fetch value from the database where name contains 'settings'
    $sql = "SELECT value FROM sb_settings WHERE name = 'settings'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Fetch the row
        $row = $result->fetch_assoc();
        // Extract whatsapp-cloud-token and meta-user-id from the JSON string
        $settings = json_decode($row['value'], true);
        $whatsappCloudToken = $settings['whatsapp-cloud'][0]['whatsapp-cloud-token'][0];
        $metaUserID = $settings['whatsapp-cloud'][0]['meta-user-id'][0];
        // Call function to get data from Facebook Graph API
        getMetaBMUserData($metaUserID, $whatsappCloudToken);
    } else {
        echo "Error: No settings found in the database.";
    }
}

// Function to retrieve data from Facebook Graph API and save to JSON file
function getMetaBMUserData($userId, $bearerToken) {
    $ch = curl_init();

    $url = 'https://graph.facebook.com/v18.0/' . $userId . '/message_templates?language=es';
    
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');

    $headers = array();
    $headers[] = 'Authorization: Bearer ' . $bearerToken;
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    $result = curl_exec($ch);
    if (curl_errno($ch)) {
        echo 'Error:' . curl_error($ch);
    }
    curl_close($ch);

    // Define the upload path
    $uploadPath = '../uploads/';
    // Save the result to a JSON file in the upload path
    $jsonFilePath = $uploadPath . 'meta_templates.json';
    file_put_contents($jsonFilePath, $result);

    // Print a success message
    echo 'Data downloaded and saved to ' . $jsonFilePath;
}

// Call the function to get value from the database and fetch data from Facebook API
getValueFromDB($conn);

// Close the database connection
$conn->close();
?>