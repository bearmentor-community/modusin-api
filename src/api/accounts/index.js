const express = require("express")
const router = express.Router()

router.get('/',function(req,res){
  res.send({
    message:'user data:',
    user:{
      name:'Fikri',
      email:'fikrimsanad93@gmail.com',
      password:'1234'
    }
  })
});

module.exports = router
