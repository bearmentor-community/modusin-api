const express = require("express")
const router = express.Router()

router.get('/', function(req, res) {
  res.send({
    message: 'List of Users',
    user:{
      name: 'Aditia Darmadi',
      email: 'aditiadj@outlook.com',
      password: 'similikiti'
    }
  })
})

module.exports = router
