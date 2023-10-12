const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

// Define your credentials directly in your server code (not recommended for production)
const hardcodedUsername = '0007';
const hardcodedPassword = 'pass';

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === hardcodedUsername && password === hardcodedPassword) {
    // Authentication successful
    res.status(200).send('Authentication successful');
  } else {
    // Authentication failed
    res.status(401).send('Authentication failed');
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
