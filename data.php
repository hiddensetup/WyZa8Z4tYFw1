<?php
// Define the GitHub repository details
$owner = 'hiddensetup';
$repo = 'WyZa8Z4tYFw1';
$apiUrl = "https://api.github.com/repos/$owner/$repo/commits?per_page=5";
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GitHub Commits Roadmap with Cache Clearing</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            background-color: #f0f0f5;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 20px;
            padding: 20px;
            border-radius: 20px;
        }
        h1 {
            font-size: 1.5rem;
            margin-bottom: 20px;
            text-align: center;
            color: #333;
        }
        .notification-card {
            display: flex;
            align-items: center;
            background-color: #fff;
            border: 1px solid #ddd;
            border-radius: 12px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            margin: 10px 0;
            padding: 10px;
            font-size: 0.9rem;
            max-width: 100%;
            overflow: hidden;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }
        .notification-card:hover {
            background-color:#eeedf7;
        }
        .notification-card.latest {
            background-color: #e5deff;
    border-color: #472db3;
    color: #472db3;

        }
        .notification-content {
            flex-grow: 1;
        }
        .notification-content p {
            margin: 3px;
        }
        .notification-content strong {
            display: block;
            font-size: 1rem;
            margin-bottom: 5px;
        }
        .notification-footer {
            font-size: 0.75rem;
            color: #472db3;
            margin-top: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Changelog</h1>
        <div id="commitRoadmap">
            <!-- Commit notifications will be inserted here -->
        </div>
    </div>

    <script>
        const apiUrl = '<?php echo $apiUrl; ?>';

        function fetchCommits() {
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    const roadmap = document.getElementById('commitRoadmap');
                    roadmap.innerHTML = ''; // Clear existing content
                    data.forEach((commit, index) => {
                        const date = new Date(commit.commit.author.date).toLocaleDateString();
                        const sha = commit.sha.substring(0, 7);
                        const description = commit.commit.message;

                        const item = document.createElement('div');
                        item.className = 'notification-card' + (index === 0 ? ' latest' : '');
                        item.innerHTML = `
                            <div class="notification-content">
                                <p><strong>▶︎ ${description}</strong></p>
                                <p>Date: ${date}</p>
                                <p>SHA: ${sha}</p>
                                ${index === 0 ? '<p class="notification-footer">Click to clear cache and avoid visual issues.</p>' : ''}
                            </div>
                        `;
                        item.addEventListener('click', clearCacheAndReload);

                        roadmap.appendChild(item);
                    });
                })
                .catch(error => {
                    console.error('Error:', error);
                    document.getElementById('commitRoadmap').innerHTML = '<p class="text-danger">Error fetching commits. Please check the console for details.</p>';
                });
        }

        function clearCacheAndReload() {
            if ('caches' in window) {
                caches.keys().then(names => {
                    for (let name of names) caches.delete(name);
                });
            }
            localStorage.clear();
            sessionStorage.clear();
            document.cookie.split(";").forEach(c => { 
                document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
            });
            window.location.reload(true);
        }

        fetchCommits();
    </script>
</body>
</html>
