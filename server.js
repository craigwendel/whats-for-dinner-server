const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const config = require('./config')
// const User = require('./models/User')
// const registrationRoute = require('./routes/registrationRoute')
const authenticateRoute = require('./routes/authenticateRoute')
const applyMiddleware = require('./routes/applyMiddleware')
const userRoutes = require('./routes/userRoutes')

const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

const port = process.env.PORT || 8000
mongoose.connect(config.database)
app.set('superSecret', config.secret)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('dev'))

app.get('/', function (req, res) {
  res.send('Hello! The API is at http://localhost:' + port + '/api')
})

app.use('/api', userRoutes)
app.use('/api', authenticateRoute)
// app.use('/api', registrationRoute)
app.use('/api', applyMiddleware)

app.listen(port)
console.log('Whats for dinner starting at http://localhost:' + port)

// Create new User in database

// app.get('/setup', function (req, res) {
//   let admin = new User({
//     name: 'Admin',
//     email: 'admin@yahoo.com',
//     username: 'admin1',
//     password: 'opennow'
//   })
//
//   admin.save(function (err) {
//     if (err) throw err
//     console.log('User saved successfully')
//     res.json({ success: true })
//   })
// })
