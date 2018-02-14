const express = require("express")
const router = express.Router()

router.get("/", function(req, res) {
  res.send({
    data: {
      "id": 0,
      "name": "M. Fahri",
      "bio": " ",
      "email": "Fahriabdhakim@yahoo.com",
      "password": "rahasiabeut",
      "reset_token": " "      
    }
  })
})

module.exports = router
