const loginForm = document.getElementById('login-form');
const terminal = document.querySelector('.terminal');
const terminalOutput = document.getElementById('output');
const inputField = document.getElementById('input');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Send the credentials to the server for authentication (you will implement this on the server)
    const response = await fetch('/authenticate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
        // Authentication successful, hide the login form and display the terminal
        loginForm.style.display = 'none';
        terminal.style.display = 'block';
    } else {
        // Authentication failed, display an error message
        alert('Authentication failed. Please check your credentials.');
    }
});

// Add your existing terminal input handling code here
inputField.addEventListener('keydown', function (e) {
    // ...
});
