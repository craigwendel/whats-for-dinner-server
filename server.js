const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const jwt = require('jsonwebtoken')
const config = require('./config')
const User = require('./models/User')

const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

const port = process.env.PORT || 8000
mongoose.connect(config.database)
app.set('superSecret', config.secret)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(morgan('dev'))

app.get('/', function (req, res) {
  res.send('Hello! The API is at http://localhost:' + port + '/api')
})

app.listen(port)
console.log('Whats for dinner starting at http://localhost:' + port)
