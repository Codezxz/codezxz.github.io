const loginForm = document.getElementById('login-form');
const terminal = document.querySelector('.terminal');
const terminalOutput = document.getElementById('output');
const inputField = document.getElementById('input');

// Flag to determine if the user is authenticated
let isAuthenticated = false;

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(loginForm);

    // Send the form data to the server for authentication (you will implement this on the server)
    const response = await fetch('/authenticate', {
        method: 'POST',
        body: formData, // Use the FormData object to send form data
    });

    if (response.ok) {
        // Authentication successful, hide the login form and display the terminal
        loginForm.style.display = 'none';
        terminal.style.display = 'block';
        isAuthenticated = true;
    } else {
        // Authentication failed, display an error message
        alert('Authentication failed. Please check your credentials.');
    }
});

inputField.addEventListener('keydown', async (e) => {
    if (!isAuthenticated) {
        // If not authenticated, don't process terminal input
        return;
    }

    if (e.key === 'Enter') {
        const command = inputField.value;
        inputField.value = '';

        // Display the user's input in the terminal
        terminalOutput.innerHTML += `<div>$ ${command}</div>`;

        // Send the command to the server for processing (replace with your server's URL)
        const response = await fetch('/process-command', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ command }),
        });

        if (response.ok) {
            // Display the server's response in the terminal
            const responseData = await response.json();
            terminalOutput.innerHTML += `<div>${responseData.response}</div>`;
        } else {
            // Handle server error
            terminalOutput.innerHTML += `<div>Error: Something went wrong on the server.</div>`;
        }
    }
});
