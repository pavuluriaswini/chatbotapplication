const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Function to read JSON file content
function readJsonFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
}

const filePath = path.join(__dirname, 'dialogs.json');
let dialogs = [];

// Read the JSON file content when the server starts
readJsonFile(filePath)
    .then((data) => {
        dialogs = data;
        console.log('File content read successfully.');
    })
    .catch((err) => {
        console.error('Error reading file:', err);
    });

// API endpoint to get the response for a specific input
app.get('/dialogs', (req, res) => {
    console.log('Received request for /dialogs with query:', req.query);
    const userInput = req.query.input;
    const dialog = dialogs.find(d => d.input.toLowerCase() === userInput.toLowerCase());
    if (dialog) {
        res.send(dialog.response);
    } else {
        res.send("I don't understand that yet.");
    }
    console.log('Sent response.');
});

app.listen(port, (err) => {
    if (err) {
        console.error('Error starting server:', err);
    } else {
        console.log(`Chatbot server running at http://localhost:${port}`);
    }
});



