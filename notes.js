const express = require('express');
const { readFile } = require('fs');
const path = require('path');
const router = express.Router();
const { readFromFile, writeToFile, readAndAppend } = require('./helpers/fsUtils')
router.route('/notes')
  .get((req, res) => {
    res.sendFile(__dirname + '/public/notes.html');
  });

router.route('/api/notes')
  .get((req, res) => {
    readFile(__dirname + '/db/db.json', 'utf8',  (err, data) => {
      err ? console.log(err) : res.json(JSON.parse(data)) 
    });
  })
  .post((req, res) => {
    readAndAppend(req.body, __dirname + '/db/db.json', (err, data) => {
      err ? console.log(err) : res.statusCode(201)
    })
  })
  // .delete((req, res) => {
  
  // })

router.route('/').get((req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

module.exports = router;