const express = require('express')
const path = require('path');
const router = express.Router()

// middleware that is specific to this router
router.use((req, res, next) => {
//   console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'))
})
// define the about route
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/notes.html'))
})

module.exports = router