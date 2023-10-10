const terminal = document.getElementById('output');
const inputField = document.getElementById('input');

inputField.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        const command = inputField.value;
        inputField.value = '';
        terminal.innerHTML += `<div>$ ${command}</div>`;
        
        // Simulate a response (replace this with actual server-side processing)
        setTimeout(() => {
            const response = 'This is a simulated response to the command: ' + command;
            terminal.innerHTML += `<div>${response}</div>`;
        }, 500);
    }
});
