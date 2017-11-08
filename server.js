const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const config = require('./config')
const authenticateRoute = require('./routes/authenticateRoute')
const applyMiddleware = require('./routes/applyMiddleware')
const userRoutes = require('./routes/userRoutes')
const recipeRoute = require('./routes/recipeRoute')

const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

const mongoURL = process.env.MONGODB_URI || 'mongodb://0.0.0.0:27017/whats-for-dinner'
mongoose.connect(mongoURL)

app.set('superSecret', config.secret)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('dev'))

app.get('/', function (req, res) {
  res.send('Hello! The API is at http://localhost:' + port + '/api')
})

app.use('/api', userRoutes)
app.use(recipeRoute)
app.use('/api', authenticateRoute)
app.use('/api', applyMiddleware)

const port = process.env.PORT || 8000
app.listen(port)
console.log('Whats for dinner starting at http://localhost:' + port)
