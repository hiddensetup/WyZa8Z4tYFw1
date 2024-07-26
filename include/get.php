<?php
function fetchCommits() {
    $owner = 'hiddensetup';
    $repo = 'WyZa8Z4tYFw1';
    $apiUrl = "https://api.github.com/repos/$owner/$repo/commits";

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $apiUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0');
    $response = curl_exec($ch);
    curl_close($ch);

    header('Content-Type: application/json');
    echo $response;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    fetchCommits();
}