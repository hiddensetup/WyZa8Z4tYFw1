<?php
// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the password from the form
    $password = $_POST['password'];

    // Specify the cost parameter (e.g., 10)
    $cost = 10;

    // Generate the hash using bcrypt
    $hash = password_hash($password, PASSWORD_BCRYPT, ['cost' => $cost]);

    // Return the generated hash as the response
    echo $hash;
}
?>
