const express = require("express")
const router = express.Router()

router.get("/", function(req, res) {
  res.send({
    message: "MODUSIN API",
    status: true,
    mongodb_uri: process.env.MONGODB_URI
  })
})

module.exports = router
