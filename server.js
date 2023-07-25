const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

const notes = require('./notes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set the correct root directory for serving static files
app.use(express.static('public'));

app.use('/', notes);

const PORT = process.env.PORT || 5001

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
