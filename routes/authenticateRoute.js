const express = require('express')
const app = express()
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const config = require('../config')
const passwordHash = require('password-hash')

router.post('/register', function (req, res) {
  const name = req.body.name
  const email = req.body.email
  const username = req.body.username
  const hashedPassword = passwordHash.generate(req.body.password)

  const user = new User()
  user.name = name
  user.email = email
  user.username = username
  user.password = hashedPassword
  user.save()
  .then(user => {
    res.status(201).json({
      status: 'success',
      username: user.username,
      password: user.password
    })
  })
  .catch((e) => {
    console.log(e)

    if (e.code === 11000) {
      res.status(422).json({
        errors: ['The username already exists']
      })
    } else {
      let errors = []
      if (e.errors.username) {
        errors.push('Username is required')
      }
      if (e.errors.password) {
        errors.push('There was a problem with your password')
      }
      res.status(422).json({
        errors: errors
      })
    }
  })
})

app.set('superSecret', config.secret)

router.post('/authenticate', function (req, res) {
  User.findOne({
    username: req.body.username
  }, function (err, user) {
    if (err) throw err
    if (!user) {
      res.json({ success: false, message: 'Authentication failed. Username not found.' })
    } else if (user) {
      if (user.password !== req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' })
      } else {
        var token = jwt.sign(user, app.get('superSecret'), {
          expiresIn: '14d' // expires in 14 days
        })

        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        })
      }
    }
  })
})

module.exports = router

// "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwic2VsZWN0ZWQiOnt9LCJnZXR0ZXJzIjp7fSwid2FzUG9wdWxhdGVkIjpmYWxzZSwiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsicGFzc3dvcmQiOiJpbml0IiwidXNlcm5hbWUiOiJpbml0IiwiZW1haWwiOiJpbml0IiwibmFtZSI6ImluaXQiLCJfX3YiOiJpbml0IiwiX2lkIjoiaW5pdCJ9LCJzdGF0ZXMiOnsiaWdub3JlIjp7fSwiZGVmYXVsdCI6e30sImluaXQiOnsiX192Ijp0cnVlLCJwYXNzd29yZCI6dHJ1ZSwidXNlcm5hbWUiOnRydWUsImVtYWlsIjp0cnVlLCJuYW1lIjp0cnVlLCJfaWQiOnRydWV9LCJtb2RpZnkiOnt9LCJyZXF1aXJlIjp7fX0sInN0YXRlTmFtZXMiOlsicmVxdWlyZSIsIm1vZGlmeSIsImluaXQiLCJkZWZhdWx0IiwiaWdub3JlIl19LCJwYXRoc1RvU2NvcGVzIjp7fSwiZW1pdHRlciI6eyJkb21haW4iOm51bGwsIl9ldmVudHMiOnt9LCJfZXZlbnRzQ291bnQiOjAsIl9tYXhMaXN0ZW5lcnMiOjB9fSwiaXNOZXciOmZhbHNlLCJfZG9jIjp7Il9fdiI6MCwicGFzc3dvcmQiOiJpcm9ueWFyZCIsInVzZXJuYW1lIjoiY3JhaWd3ZW5kZWwiLCJlbWFpbCI6IndlbmRlbGNyYWlnQGdtYWlsLmNvbSIsIm5hbWUiOiJDcmFpZyBXZW5kZWwiLCJfaWQiOiI1OWEwODRlNzhhZGE5NjEyOTE2ODVhZjQifSwiJGluaXQiOnRydWUsImlhdCI6MTUwMzY5MjI5NCwiZXhwIjoxNTA0OTAxODk0fQ.xzXo0ik_o74W8afj6CQ-lEd5zvh7H1bwEb4hashHiuU"
