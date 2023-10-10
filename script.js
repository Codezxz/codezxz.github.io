const terminal = document.getElementById('output');
const inputField = document.getElementById('input');

inputField.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        const command = inputField.value;
        inputField.value = '';
        terminal.innerHTML += `<div>$ ${command}</div>`;
        
        // Send the command to a server for processing (replace with your server's URL)
        fetch('https://www.google.com/search?q=', {
            method: 'POST',
            body: JSON.stringify({ command }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            // Display the server's response
            terminal.innerHTML += `<div>${data.response}</div>`;
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});
