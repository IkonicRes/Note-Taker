const express = require('express');
const path = require('path');
const router = express.Router();
const { readFile } = require('fs');
const { readAndAppend, readFromFile, writeToFile, write2File } = require('./helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');

// Use bodyParser middleware to parse JSON request bodies
router.use(bodyParser.json());

router.route('/notes').get((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

router.route('/api/notes').get((req, res) => {
  readFile(path.join(__dirname, 'db', 'db.json'), 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      res.json(JSON.parse(data));
    }
  });
});

router.route('/api/notes').post((req, res) => {
  const body = req.body;
  body.id = uuidv4();
  readAndAppend(body, __dirname + '/db/db.json', (err, data) => {
    err ? console.log(err) : res.status(201).json(JSON.parse(data));
  });
  readFile(path.join(__dirname, 'db', 'db.json'), 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Internal server error' });
    } else {
      res.json(JSON.parse(data));
    }
  });
});


router.route('/api/notes/:id').delete((req, res) => {
  const id = req.params.id;

  readFromFile(__dirname + '/db/db.json', 'utf-8')
    .then((data) => {
      const _data = JSON.parse(data);
      const indexToDelete = _data.findIndex((entry) => entry.id == id);

      if (indexToDelete === -1) {
        // If the note with the given UUID is not found, send a 404 Not Found response
        res.status(404).json({ message: 'Note not found' });
      }

      // Delete the note from the array using splice()
      _data.splice(indexToDelete, 1);

      console.log(_data);

      // Write the updated data back to the file
      write2File(__dirname + '/db/db.json', JSON.stringify(_data, null, 4))
        .then(() => {
          // Send a 204 No Content response, indicating the note was successfully deleted
          res.sendStatus(204);
        })
        .catch((error) => {
          console.error('Error writing data after deletion:', error);
          res.status(500).json({ message: 'Internal server error' });
        });
    })
    .catch((error) => {
      console.error('Error deleting note:', error);
      res.status(500).json({ message: 'Internal server error' });
    });
});

router.route('/').get((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

module.exports = router;
