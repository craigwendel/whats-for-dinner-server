const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.get('/', function (req, res) {
  res.json({ message: 'Welcome to the Whats For Dinner User API!' })
})

router.get('/users', function (req, res) {
  User.find({}, function (err, users) {
    res.json(users)
  })
})

module.exports = router
