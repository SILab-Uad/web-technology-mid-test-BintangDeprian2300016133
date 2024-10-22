// script.js

// Function to generate the password based on user input
const generatePassword = (length, options) => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const specialChars = "!@#$%^&*()";

    let charPool = '';
    if (options.includeUppercase) charPool += uppercase;
    if (options.includeLowercase) charPool += lowercase;
    if (options.includeNumbers) charPool += numbers;
    if (options.includeSpecialChars) charPool += specialChars;

    if (charPool === '') {
        throw new Error('At least one character type must be selected.');
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charPool.length);
        password += charPool[randomIndex];
    }

    return password;
};

// Export for Node.js environment
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { generatePassword };
}

// Browser-specific code
if (typeof document !== 'undefined') {
    document.getElementById('generateBtn').addEventListener('click', function() {
        const length = parseInt(document.getElementById('length').value);
        if (length < 8 || length > 128) {
            alert('Password length must be between 8 and 128 characters.');
            return;
        }

        const options = {
            includeUppercase: document.getElementById('includeUppercase').checked,
            includeLowercase: document.getElementById('includeLowercase').checked,
            includeNumbers: document.getElementById('includeNumbers').checked,
            includeSpecialChars: document.getElementById('includeSpecialChars').checked
        };

        try {
            const password = generatePassword(length, options);
            document.getElementById('passwordOutput').textContent = password;
        } catch (error) {
            alert(error.message);
        }
    });

    document.getElementById('copyBtn').addEventListener('click', function() {
        const password = document.getElementById('passwordOutput').textContent;
        if (password) {
            navigator.clipboard.writeText(password).then(() => {
                alert('Password copied to clipboard!');
            }).catch(err => {
                console.error('Could not copy text: ', err);
            });
        } else {
            alert('No password to copy. Generate a password first.');
        }
    });
}