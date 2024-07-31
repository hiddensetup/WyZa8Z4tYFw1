<?php
// Define the GitHub repository details
$owner = 'hiddensetup';
$repo = 'WyZa8Z4tYFw1';
$apiUrl = "https://api.github.com/repos/$owner/$repo/commits?per_page=5";
?>

<style>
    .red-circle, .green-circle {
        position: absolute;
        bottom: 21px;
        left: 30px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        z-index: 1000;
        cursor: pointer;
    }
    
    .red-circle {
        background-color: red;
        animation: pulse 1.5s infinite;
    }
    
    .green-circle {
        background-color: #1ccc1c;
    }
    
    @keyframes pulse {
        20% {
            transform: scale(1);
            opacity: 1;
        }
        50% {
            transform: scale(1.5);
            opacity: 0.8;
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }
</style>

<div id="commitIndicator" class="green-circle" style="display: none;"></div>
<audio id="powSound" src="media/update.mp3" preload="auto"></audio>

<script>
    const apiUrl = '<?php echo $apiUrl; ?>';
    const powSound = document.getElementById('powSound');
    const lastCommitSHAKey = 'lastCommitSHA'; // Key for localStorage
    const lastFetchKey = 'lastFetch'; // Key for localStorage
    const fetchInterval = 6 * 60 * 60 * 1000; // 6 hours in milliseconds

    function fetchCommits() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const commitIndicator = document.getElementById('commitIndicator');
                const lastCommitSHA = localStorage.getItem(lastCommitSHAKey); // Get stored SHA
                const lastFetchTime = new Date(localStorage.getItem(lastFetchKey)) || new Date(0);
                let newCommit = false;
                let latestCommitSHA = null;

                data.forEach(commit => {
                    const sha = commit.sha;
                    const commitDate = new Date(commit.commit.author.date);
                    if (lastCommitSHA !== sha && commitDate > lastFetchTime) {
                        newCommit = true;
                        if (!latestCommitSHA) {
                            latestCommitSHA = sha;
                        }
                    }
                });

                if (newCommit) {
                    commitIndicator.classList.remove('green-circle');
                    commitIndicator.classList.add('red-circle');
                    commitIndicator.style.display = 'block';
                    powSound.play(); // Play sound for new commits
                    localStorage.setItem(lastCommitSHAKey, latestCommitSHA); // Update stored SHA
                } else {
                    commitIndicator.classList.remove('red-circle');
                    commitIndicator.classList.add('green-circle');
                    commitIndicator.style.display = 'block';
                }

                localStorage.setItem(lastFetchKey, new Date().toISOString()); // Update last fetch time
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    // Fetch commits every 6 hours
    setInterval(fetchCommits, fetchInterval);

    // Initial call
    fetchCommits();
</script>
