const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// const notesRouter = require('./public/assets/js/routes/notes');
const notes = require('./notes')

port = 5500

// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json)

// app.get("/", (req, res) => {
//   
// })

app.use('/', notes)

app.listen(port, () => {
  console.log(`Listening to port ${port}`)
})