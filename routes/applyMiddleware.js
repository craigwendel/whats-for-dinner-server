const express = require('express')
const app = express()
const router = express.Router()
const jwt = require('jsonwebtoken')
const config = require('../config')

app.set('superSecret', config.secret)

router.use(function (req, res, next) {
  let token = req.body.token || req.query.token || req.headers['x-access-token']
  if (token) {
    jwt.verify(token, app.get('superSecret'), function (err, decoded) {
      if (err) {
        return res.json({success: false, message: 'Failed to authenticate token.'})
      } else {
        req.decoded = decoded
        next()
      }
    })
  } else {
    return res.status(403).send({success: false, message: 'No token provided.'})
  }
})

module.exports = router
