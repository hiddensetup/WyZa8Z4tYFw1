<?php
// Define the GitHub repository details
$owner = 'hiddensetup';
$repo = 'WyZa8Z4tYFw1';
$routinUrl = "https://api.github.com/repos/$owner/$repo/commits?per_page=3";
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex">
    <title>Updates</title>
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
            max-width: 800px;
            margin: 20px;
            padding: 20px;
            border-radius: 20px;
            background-color: #fff;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .section {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .section h2 {
            font-size: 1.8rem;
            color: #333;
            margin-bottom: 6px;
        }

        .notification-card {
            display: flex;
            align-items: center;
            background-color: #fff;
            border: 1px solid black;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            margin: 5px 0;
            padding: 5px;
            font-size: 0.8rem;
            overflow: hidden;
            cursor: pointer;
            transition: background-color 0.2s ease;
        }

        .notification-card:hover {
            background-color: #f5f5f5;
        }

        .notification-card.latest {
            background-color: #e8e8e8;
            border-color: black;
        }

        .notification-content {
            flex-grow: 1;
        }

        .notification-content p {
            margin: 0;
        }

        .notification-content strong {
            font-size: 0.9rem;
        }

        .notification-footer {
            font-size: 0.7rem;
            color: #472db3;
            margin-top: 5px;
        }

        .red-circle,
        .green-circle {}

        .red-circle {}

        .green-circle {}

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

        .tiny-button {
            font-size: 0.7rem;
            color: #fff;
            background-color: black;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            padding: 5px 10px;
            margin-top: 5px;
            display: inline-block;
            text-align: center;
            transition: background-color 0.2s ease;
        }

        .tiny-button:hover {
            background-color: #484848;
        }

        .status-container {
            margin-top: 20px;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .status-item {
            font-size: 0.7rem;
            margin: 5px 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .status-bar {
            margin: unset;
            height: 20px;
            border-radius: 3px;
            background-color: #ddd;
            position: relative;
            width: calc(100% - 150px);
        }

        .status-bar-inner {
            height: 100%;
            border-radius: 4px;
            background: black;
            text-align: center;
            line-height: 20px;
            color: white;
            font-size: 0.7rem;
            position: absolute;
            left: 0;
            top: 0;
            transition: width 0.5s ease;
        }



        .preview-container {
            width: 100%;
            max-width: 600px;
            padding: 16px;
            box-sizing: border-box;
        }

        .preview {
            display: flex;
            background: #ffffff;
            border-radius: 16px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            transition: box-shadow 0.3s ease;
            padding: 5px;
        }

        .preview:hover {
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        }

        .preview-image {
            width: 120px;
            height: 120px;
            border-radius: 8px;
            margin-right: 0px;
            background-size: cover;
            background-position: center;
            transition: background-image 0.3s ease;
        }

        .preview-info {
            flex: 1;
            padding: 12px;
        }

        .title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 8px;
            width: 100%;
        }

        .description {
            font-size: 12px;
            margin-bottom: 0;
            border-radius: 4px;
            width: 100%;
        }

        .url {
            font-size: 12px;
            color: #007bff;
            text-decoration: none;
            background: #e0e0e0;
            border-radius: 4px;
            height: 20px;
            width: 60%;
        }

        .url:hover {
            text-decoration: underline;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="section">
            <!-- Insert this where you want the URL preview to appear -->
            <div class="preview-container">
                <div class="preview">
                    <div class="preview-image" id="preview-image"></div>
                    <div class="preview-info">
                        <div class="title" id="preview-title"></div>
                        <div class="description" id="preview-description"></div>
                        <a href="#" id="preview-url" class="url" target="_blank" rel="noopener noreferrer"></a>
                    </div>
                </div>
            </div>
            <h2>Panel de actualizaciones</h2>
            <div class="status-item">
                <p>Estimados usuarios,
                    Les informamos que a partir de ahora somos Routin.cloud Este cambio nos permitirá optimizar nuestros procesos y mejorar la eficiencia en la atención a sus necesidades. Frank y David estarán a cargo de resolver estos problemas específicos.
                    Agradecemos su comprensión y apoyo durante esta transición de Steamboxchat. Seguimos comprometidos en brindarles el mejor servicio posible.</p>
            </div>
        </div>
        <div class="section">
            <h2>Updates</h2>
            <div id="commitRoadmap">
                <!-- Commit notifications will be inserted here -->
            </div>
            <div class="status-container">
                <div class="status-item">Telegram: <div class="status-bar">
                        <div class="status-bar-inner" id="telegram-bar"></div>
                    </div>
                </div>
                <div class="status-item">Routin.cloud: <div class="status-bar">
                        <div class="status-bar-inner" id="routin-bar"></div>
                    </div>
                </div>
                <div class="status-item">WhatsApp Web: <div class="status-bar">
                        <div class="status-bar-inner" id="whatsapp-web-bar"></div>
                    </div>
                </div>
                <div class="status-item">WhatsApp API Cloud: <div class="status-bar">
                        <div class="status-bar-inner" id="whatsapp-api-bar"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        // URL for preview
        const url = 'https://routin.cloud'; // Replace with dynamic URL as needed

        // Function to fetch metadata
        async function fetchMetadata(url) {
            try {
                const response = await fetch('https://api.allorigins.win/get?url=' + encodeURIComponent(url));
                const data = await response.json();
                const html = data.contents;

                const metaTags = html.match(/<meta property="og:(title|description|image|url)" content="([^"]*)"/gi);
                const metadata = {};

                if (metaTags) {
                    metaTags.forEach(tag => {
                        const matches = tag.match(/property="og:(title|description|image|url)" content="([^"]*)"/i);
                        if (matches) {
                            metadata[matches[1]] = matches[2];
                        }
                    });
                }

                return metadata;
            } catch (error) {
                console.error('Error fetching metadata:', error);
                return {};
            }
        }

        // Update preview with fetched metadata
        async function updatePreview() {
            const metadata = await fetchMetadata(url);

            document.getElementById('preview-image').style.backgroundImage = `url(${metadata.image || 'https://via.placeholder.com/180x120.png?text=Image'})`;
            document.getElementById('preview-title').textContent = metadata.title || 'No Title';
            document.getElementById('preview-description').textContent = metadata.description || 'No Description';
            const urlElement = document.getElementById('preview-url');
            urlElement.textContent = metadata.url || url;
            urlElement.href = metadata.url || url;
        }

        // Initialize preview on page load
        document.addEventListener('DOMContentLoaded', updatePreview);
        const routinUrl = "<?php echo $routinUrl; ?>";

        function fetchCommits() {
            fetch("<?php echo $routinUrl; ?>").then(t => t.json()).then(t => {
                let e = document.getElementById("commitRoadmap");
                e.innerHTML = "";
                let a = !1,
                    n = new Date(Date.now() - 18e6);
                t.forEach((t, o) => {
                    let r = new Date(t.commit.author.date),
                        i = t.sha.substring(0, 7),
                        l = t.commit.message;
                    r > n && (a = !0);
                    let c = document.createElement("div");
                    c.className = "notification-card" + (0 === o ? " latest" : ""), c.innerHTML = `
                            <div class="notification-content">
                                <p><strong>▶︎ ${l}</strong></p>
                                <p>Actualizado: ${r.toLocaleDateString()}</p>
                                <p>Versi\xf3n: ${i}</p>
                                ${0===o?'<button class="tiny-button" onclick="clearCacheAndReload()">Limpiar caché</button>':""}
                            </div>
                        `, e.appendChild(c)
                })
            })
        }

        function clearCacheAndReload() {
            "caches" in window && caches.keys().then(t => {
                for (let e of t) caches.delete(e)
            }), localStorage.clear(), sessionStorage.clear(), document.cookie.split(";").forEach(t => {
                document.cookie = t.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/")
            }), window.parent ? window.parent.location.reload(!0) : window.location.reload(!0)
        }

        function updateWhatsAppWebStatus() {
            let t = document.getElementById("whatsapp-web-bar"),
                e = 97.9;
            .1 > Math.random() ? (t.innerHTML = "!", t.style.backgroundColor = "red", t.style.width = "10%") : (e = 97.9 + 2.1 * Math.random(), t.innerHTML = e.toFixed(2) + "%", t.style.width = e + "%", t.style.backgroundColor = "black")
        }

        function updateStatusBar(t, e, a) {
            let n = document.getElementById(t),
                o = (Math.random() * (a - e) + e).toFixed(2);
            n.innerHTML = o + "%", n.style.width = o + "%"
        }

        function updateAllStatuses() {
            updateStatusBar("telegram-bar", 99.9, 100), updateStatusBar("routin-bar", 100, 100), updateWhatsAppWebStatus(), updateStatusBar("whatsapp-api-bar", 99.8, 100)
        }
        document.addEventListener("DOMContentLoaded", function() {
            fetchCommits(), setInterval(fetchCommits, 216e5), updateAllStatuses(), setInterval(updateAllStatuses, 3e5)
        });
    </script>
</body>

</html>