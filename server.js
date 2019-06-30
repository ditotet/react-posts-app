const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const posts = require('./routes/api/posts')

const app = express()

app.use(bodyParser.json())

const db = require("./config/keys").mongoURI

mongoose.connect(db)
  .then(() => console.log("connected"))
  .catch(err => console.log(err))


app.use('/api/posts', posts)

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Listening..."))