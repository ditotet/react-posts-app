const express = require('express')
const router = express.Router()

const Post = require('../../models/Post')

router.get('/', (req, res) => {
  Post.find()
    .then(posts => res.json(posts))
})

router.post('/', (req, res) => {
  const newPost = new Post({
    author: req.body.author,
    title: req.body.title,
    body: req.body.description
  })

  newPost.save()
    .then(post => res.json(newPost))
    .catch(err => res.json({ success: false }))
})

router.delete('/:id', (req, res) => {
  const id = req.body.id
  Post.findById(id)
    .then(post => post.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}))
})


module.exports = router