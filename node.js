const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === process.env.USERNAME && password === process.env.PASSWORD) {
    // Authentication successful
    res.status(200).send('Authentication successful');
  } else {
    // Authentication failed
    res.status(401).send('Authentication failed');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
