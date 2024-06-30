document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM fully loaded and parsed');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const messagesContainer = document.getElementById('messagesContainer');

    function sendMessage() {
        const message = userInput.value;
        console.log('Sending message:', message);
        if (message.trim() === '') return; // Ignore empty messages
        displayMessage('You', message);
        userInput.value = '';

        fetch(`/dialogs?input=${encodeURIComponent(message)}`)
            .then(response => {
                console.log('Received response from /dialogs');
                return response.text();
            })
            .then(data => {
                console.log('Received data:', data);
                displayMessage('Bot', data);
            })
            .catch(error => {
                console.error('Error fetching dialogs:', error);
                displayMessage('Bot', 'Error fetching dialogs.');
            });
    }

    function displayMessage(sender, message) {
        console.log('Displaying message:', sender, message);
        const messageElement = document.createElement('div');
        messageElement.textContent = `${sender}: ${message}`;
        messagesContainer.appendChild(messageElement);
    }

    sendButton.addEventListener('click', sendMessage);

    userInput.addEventListener('keyup', function (e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});



