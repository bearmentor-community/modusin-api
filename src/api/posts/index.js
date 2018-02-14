const express = require("express")
const router = express.Router()

router.get("/", function(req, res) {
  res.send({
    message: "POSTS",
    posting:{
      title:'How To Build StartUp',
      desc:'Building a startup is not simply building an execution plan for a business model that the entrepreneur thinks will work, but rather, a search for the actual business model itself.',
      author:'Fikri'
    }
  })
})

module.exports = router
