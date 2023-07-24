const express = require('express')
const router = express.Router()

let notes = [];

router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})

router.get('/', (req, res) => {
    res.send('test')
})

// router.post('/', (req, res) => {
//     const { title, content } = req.body;
//     if (!title || !content) {
//       return res.status(400).json({ message: 'Please provide both title and content' });
//     }
//     const newNote = {
//         id: notes.length + 1,
//         title,
//         content,
//       };
//       notes.push(newNote);
    
//       res.status(201).json(newNote);
//     });


module.exports = router;