const loginForm = document.getElementById('login-form');
const terminal = document.querySelector('.terminal');
const inputField = document.getElementById('input');

// Flag to determine if the user is authenticated
let isAuthenticated = false;

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(loginForm);
    const username = formData.get('username');
    const password = formData.get('password');

    // Send the credentials to the server for authentication
    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
        // Authentication successful, hide the login form and display "Welcome" message
        loginForm.style.display = 'none';
        terminal.style.display = 'block';
        isAuthenticated = true;

        // Display "Welcome" message in the center of the screen
        const welcomeMessage = document.createElement('div');
        welcomeMessage.textContent = 'Welcome';
        welcomeMessage.className = 'welcome-message'; // Add CSS class for styling
        document.querySelector('.center-container').appendChild(welcomeMessage);
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

        // Simulate processing and display a response in the terminal
        // Replace this with your actual server-side processing logic
        const simulatedResponse = 'This is a simulated response.';
        const responseData = { response: simulatedResponse };
        
        // Display the user's input in the terminal
        const terminalOutput = document.getElementById('output');
        terminalOutput.innerHTML += `<div>$ ${command}</div>`;
        
        // Display the server's response in the terminal
        terminalOutput.innerHTML += `<div>${responseData.response}</div>`;
    }
});
