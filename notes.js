const express = require('express');
const path = require('path');
const router = express.Router();
const { readFile } = require('fs');
const { readAndAppend, readFromFile, writeToFile } = require('./helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');

// Use bodyParser middleware to parse JSON request bodies
router.use(bodyParser.json());

router.route('/notes').get((req, res) => {
  res.sendFile(__dirname + '/public/notes.html');
});

router.route('/api/notes').get((req, res) => {
  readFile(__dirname + '/db/db.json', 'utf8', (err, data) => {
    err ? console.log(err) : res.json(JSON.parse(data));
  });
});

router.route('/api/notes').post((req, res) => {
  const body = req.body;
  console.log(uuidv4());
  body.id = uuidv4();
  readAndAppend(body, __dirname + '/db/db.json', (err, data) => {
    err ? console.log(err) : res.sendStatus(201);
  });
});
// router.route('/api/notes/:id').delete((req, res) => {
//   const id = req.params.id;
//   console.log(id)

//   // Find the index of the note with the matching UUID
//   const indexToDelete = dataArray.findIndex(item => item.id === id);

//   if (indexToDelete === -1) {
//     // If the note with the given UUID is not found, send a 404 Not Found response
//     return res.status(404).json({ message: 'Note not found' });
//   }

//   // Delete the note from the array using splice()
//   dataArray.splice(indexToDelete, 1);

//   // You can choose to save the updated array to the database here if needed

//   // Send a 204 No Content response, indicating the note was successfully deleted
//   res.sendStatus(204);
// });

router.route('/api/notes/:id')
  .delete((req, res) => {
    const id = req.params.id;
    readFromFile(__dirname + "/db/db.json", 'utf-8').then((data) => { 
      console.log(data)
      const _data = JSON.parse(data)
      Object.entries(_data).forEach((entry, index) => {
        console.log(entry[1].id, id)
        if (entry[1].id == id) {
          console.log('delete me')
          _data.splice(index, 1);
          writeToFile(__dirname + "/db/db.json", _data)
          return;
        } 
      });
    })
  })

router.route('/').get((req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

module.exports = router;
