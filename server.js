const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const session = require('express-session')

const posts = require('./routes/api/posts')
const User = require('./models/user')

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
  User.findOne({userName: req.body.userName})
    .then(user => {
      if(user) {
        if (user.password == req.body.password) {
          req.session.userName = req.body.userName
          res.send({
            success: true,
          })
        } else {
          res.send({
            success: false,
            errorCode: 0,
          })
        }
      } else {
        res.send({
          success: false,
          errorCode: 1,
        })
      }
    })
})

app.post('/logout', (req, res) => {
  req.session.userName = null
  console.log("oyoooo")
  res.json({success: true})
})

app.get('/api/userName', (req, res) => {
  res.json({userName: req.session.userName})
})

app.post('/register', (req, res) => {
  console.log(req.body)

  User.findOne({userName: req.body.userName})
    .then(user => {
      if (user) {
        res.json({
          success: false,
          error: `User '${req.body.userName}' already exists`
        })
      } else {
        const newUser = new User({
          userName: req.body.userName,
          password: req.body.password,
        })
      
        newUser.save()
          .then(usr => res.json({...newUser, success: true}))
          .catch(err => res.json({ success: false }))
      }
    })
})

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Listening..."))