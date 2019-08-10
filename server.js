const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const session = require('express-session')

const posts = require('./routes/api/posts')
const User = require('./models/User')

const app = express()

app.use(bodyParser.json())
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

const db = require("./config/keys").mongoURI

mongoose.connect(db)
  .then(() => console.log("connected"))
  .catch(err => console.log(err))


app.use('/api/posts', posts)

app.post('/login', (req, res) => {
  req.session.userName = req.body.userName
  console.log("yoo")
  res.send({
    success: true,
  })
})

app.post('/register', (req, res) => {
  const newUser = new User({
    userName: req.body.userName,
    password: req.body.password,
  })

  newUser.save()
    .then(user => res.json(newUser))
    .catch(err => res.json({ success: false }))
})

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Listening..."))