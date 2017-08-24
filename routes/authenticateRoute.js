const express = require('express')
const app = express()
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const config = require('../config')

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

// "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwic2VsZWN0ZWQiOnt9LCJnZXR0ZXJzIjp7fSwid2FzUG9wdWxhdGVkIjpmYWxzZSwiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsicGFzc3dvcmQiOiJpbml0IiwidXNlcm5hbWUiOiJpbml0IiwiZW1haWwiOiJpbml0IiwibmFtZSI6ImluaXQiLCJfX3YiOiJpbml0IiwiX2lkIjoiaW5pdCJ9LCJzdGF0ZXMiOnsiaWdub3JlIjp7fSwiZGVmYXVsdCI6e30sImluaXQiOnsiX192Ijp0cnVlLCJwYXNzd29yZCI6dHJ1ZSwidXNlcm5hbWUiOnRydWUsImVtYWlsIjp0cnVlLCJuYW1lIjp0cnVlLCJfaWQiOnRydWV9LCJtb2RpZnkiOnt9LCJyZXF1aXJlIjp7fX0sInN0YXRlTmFtZXMiOlsicmVxdWlyZSIsIm1vZGlmeSIsImluaXQiLCJkZWZhdWx0IiwiaWdub3JlIl19LCJwYXRoc1RvU2NvcGVzIjp7fSwiZW1pdHRlciI6eyJkb21haW4iOm51bGwsIl9ldmVudHMiOnt9LCJfZXZlbnRzQ291bnQiOjAsIl9tYXhMaXN0ZW5lcnMiOjB9fSwiaXNOZXciOmZhbHNlLCJfZG9jIjp7Il9fdiI6MCwicGFzc3dvcmQiOiIkMmEkMTAkYjg4SDVWR1JWa3pqdS5vZUpGV29qLlhpYjhNLy5wVzQxLmNCZ0dZNWR3emVxNUVHSEREZHEiLCJ1c2VybmFtZSI6ImNyYWlnd2VuZGVsIiwiZW1haWwiOiJ3ZW5kZWxjcmFpZ0BnbWFpbC5jb20iLCJuYW1lIjoiQ3JhaWcgV2VuZGVsIiwiX2lkIjoiNTk5ZjM1NjYxODI4ZmYwNzcyMjE0MTFkIn0sIiRpbml0Ijp0cnVlLCJpYXQiOjE1MDM2MDgyOTIsImV4cCI6MTUwNDgxNzg5Mn0.atmsNFzitvsqACqJ9HLMcEw-_PiICjcv_Xx6m5I7qLE"
