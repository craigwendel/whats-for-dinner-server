// const express = require('express')
// const app = express()
// const router = express.Router()
// const User = require('../models/User')
//
// app.post('/register', function (req, res) {
//   const name = req.body.name
//   const email = req.body.email
//   const username = req.body.username
//   const password = req.body.password
//
//   const user = new User()
//   user.name = name
//   user.email = email
//   user.username = username
//   user.password = password
//   user.save()
//   .then(user => {
//     res.status(201).json({
//       username: user.username,
//       password: user.password
//     })
//   })
//   .catch((e) => {
//     console.log(e)
//
//     if (e.code === 11000) {
//       res.status(422).json({
//         errors: ['The username already exists']
//       })
//     } else {
//       let errors = []
//       if (e.errors.username) {
//         errors.push('Username is required')
//       }
//       if (e.errors.password) {
//         errors.push('There was a problem with your password')
//       }
//       res.status(422).json({
//         errors: errors
//       })
//     }
//   })
// })
//
// module.exports = router
