const express = require('express')
const router = express.Router()

router.get('/http://food2fork.com/api/search', function (req, res) {
  res.json({ message: 'This is the Food2Fork API' })
})

module.exports = router
