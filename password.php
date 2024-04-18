<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Password Hash Generator</title>
    <!-- Bootstrap 5.3.0 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Vue.js CDN -->
    <script src="https://cdn.jsdelivr.net/npm/vue@2"></script>
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f8f9fa; /* Set a light background color */
        }

        .container {
            max-width: 400px;
            width: 100%;
        }

        /* Toast container position */
        .toast-container {
            position: fixed;
            top: 10px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 1050;
        }
    </style>
</head>

<body>
    <div id="app" class="container">
        <h1 class="text-center mb-5">Password Hash Generator</h1>
        <form @submit.prevent="handleGenerate" class="mb-3">
            <div class="mb-2">
                <select v-model="passwordMode" class="form-select">
                    <option value="random">Random Password</option>
                    <option value="manual">Enter Manually</option>
                    <option value="stupid">Stupid Password</option>
                </select>
            </div>

            <div class="input-group mb-2">
                <input type="text" v-model="password" class="form-control" placeholder="Enter Password">
                <button type="submit" class="btn btn-primary">Generate</button>
            </div>

            <div v-if="hash" class="mb-3">
                <textarea v-model="hash" class="form-control" rows="2" readonly></textarea>
            </div>
        </form>

        <!-- Toast container for notifications -->
        <div class="toast-container" v-if="toastVisible">
            <div class="toast align-items-center text-white bg-dark border-0" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="true" data-bs-delay="3000">
                <div class="d-flex">
                    <div class="toast-body" v-html="toastMessage"></div>
                    <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
        </div>
    </div>

    <!-- Bootstrap JS and dependencies -->
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

    <!-- Vue.js Application -->
    <script>
        new Vue({
            el: '#app',
            data() {
                return {
                    password: '',
                    hash: null,
                    passwordMode: 'manual', // Default to 'manual' mode
                    toastVisible: false, // Controls the visibility of the toast
                    toastMessage: '' // Controls the toast message content
                };
            },
            methods: {
                async handleGenerate() {
                    if (this.passwordMode === 'manual' && !this.password.trim()) {
                        // Display the toast for empty password input in manual mode
                        this.toastMessage = 'Please enter a password.';
                        this.showToast();
                        return;
                    }

                    if (this.passwordMode === 'random' || this.passwordMode === 'stupid') {
                        // Generate a password based on the current mode
                        if (this.passwordMode === 'random') {
                            this.generateRandomPassword();
                        } else if (this.passwordMode === 'stupid') {
                            this.generateStupidPassword();
                        }

                        // Generate the hash based on the current password
                        await this.generateHash();
                        // Copy the generated hash to the clipboard
                        this.copyHashToClipboard();
                        // Show the toast notification that the hash was copied
                        this.toastMessage = 'Hash copied to clipboard!';
                        this.showToast();
                    } else {
                        // Generate the hash based on the current password
                        await this.generateHash();
                        // Copy the generated hash to the clipboard
                        this.copyHashToClipboard();
                        // Show the toast notification that the hash was copied
                        this.toastMessage = 'Hash copied to clipboard!';
                        this.showToast();
                    }
                },
                async generateHash() {
                    // Generate the hash based on the current password
                    const formData = new FormData();
                    formData.append('password', this.password);

                    const response = await fetch('hash.php', {
                        method: 'POST',
                        body: formData
                    });

                    this.hash = await response.text();
                },
                generateRandomPassword() {
                    // Generate a random password (e.g., alphanumeric of length 12)
                    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
                    let randomPassword = '';
                    for (let i = 0; i < 12; i++) {
                        randomPassword += characters.charAt(Math.floor(Math.random() * characters.length));
                    }
                    // Set the random password
                    this.password = randomPassword;
                },
                generateStupidPassword() {
                    // Generate a stupid password using 2 fruits capitalized + @ + integer
                    const fruits = [
    'Apple', 'Banana', 'Cherry', 'Mango', 'Peach', 'Pear', 'Orange', 'Grapes', 'Kiwi', 'Pineapple',
    'Coconut', 'Lemon', 'Lime', 'Blueberry', 'Strawberry', 'Raspberry', 'Watermelon', 'Papaya',
    'Guava', 'Pomegranate', 'Fig', 'Plum', 'Blackberry', 'Cantaloupe', 'Honeydew', 'Apricot', 'Coconut',
    'Lychee', 'Dragonfruit', 'Passionfruit', 'Persimmon', 'Grapefruit', 'Cranberry', 'Gooseberry',
    'Melon', 'Clementine', 'Nectarine', 'Tangerine', 'Avocado', 'Starfruit', 'Jackfruit',
    'Durian', 'Mangosteen', 'Carambola', 'Tamarind', 'Acai', 'Elderberry', 'Boysenberry', 'Mulberry',
    'Manzana', 'Platano', 'Cereza', 'Mango', 'Durazno', 'Pera', 'Naranja', 'Uva', 'Kiwi', 'Anana',
    'Coco', 'Limon', 'Lima', 'Arandano', 'Fresa', 'Frambuesa', 'Sandía', 'Papaya',
    'Guayaba', 'Granada', 'Higo', 'Ciruela', 'Mora', 'Sandia', 'Melon', 'Chabacano',
    'Lichi', 'Granadilla', 'Maracuya', 'Caqui', 'Toronja', 'ArandanoAgrio',
    'Melon', 'Clementina', 'Nectarina', 'Mandarina', 'Banano', 'Palta', 'Carambola', 'Tamarindo',
    'Acai', 'Sauco', 'Baya', 'Morera', 'Coco'
];
                    const randomFruit1 = fruits[Math.floor(Math.random() * fruits.length)];
                    const randomFruit2 = fruits[Math.floor(Math.random() * fruits.length)];
                    const randomInt = Math.floor(Math.random() * 100);

                    // Set the password
                    this.password = `${randomFruit1}${randomFruit2}@${randomInt}`;
                },
                copyHashToClipboard() {
                    // Use a temporary textarea to copy the hash to clipboard
                    const textarea = document.createElement('textarea');
                    textarea.value = this.hash;
                    document.body.appendChild(textarea);
                    textarea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textarea);
                },
                showToast() {
                    // Show the toast notification
                    this.toastVisible = true;

                    // Initialize the toast
                    this.$nextTick(() => {
                        const toastElement = document.querySelector('.toast');
                        const toastInstance = new bootstrap.Toast(toastElement);
                        toastInstance.show();
                    });
                }
            },
            watch: {
                passwordMode(newMode) {
                    if (newMode === 'manual') {
                        // Clear the password input when switching to manual mode
                        this.password = '';
                        // Clear the hash
                        this.hash = null;
                    } else if (newMode === 'random') {
                        // Generate a new random password and set it
                        this.generateRandomPassword();
                        // Immediately generate a hash based on the random password
                        this.handleGenerate();
                    } else if (newMode === 'stupid') {
                        // Generate a stupid password and set it
                        this.generateStupidPassword();
                        // Immediately generate a hash based on the stupid password
                        this.handleGenerate();
                    }
                }
            }
        });
    </script>
</body>
</html>
