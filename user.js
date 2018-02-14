var express = require('express')
var fs = require('fs')
const hlprs = require('./helpers')
const url = require('url')
var router = express.Router({mergeParams: true})

// schema with validation
var ObjectId = hlprs.mongoose.Schema.ObjectId
var Schema = hlprs.mongoose.Schema
var userSchema = new hlprs.mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 50
  },
  password: {
    type: String,
    required: true,
    maxlength: 50
  },
  avatar: {
    type: String,
    default: ""
  },
  bio: {
    type: String,
    default: ""
  },
  join_date: {
    type: Date,
    default: Date.now
  },
  following: [Schema.Types.ObjectId],
  followers: [Schema.Types.ObjectId],
  // ---------------------------------------------------- optional
  first_name: {
    type: String,
    maxlength: 40
  },
  last_name: {
    type: String,
    maxlength: 40
  },
  gender: {
    type: String,
    enum: ['Male', 'Female']
  }
})
var user = hlprs.mongoose.model('user', userSchema)
//---------------------------------------------------------- getAllUser (V)
router.get('/', function(req, res) {
  user.find({}, (err, user) => {
    if (err) {
      res.status(500).send(err.message)
    }
    res.json(user)
  })
})
//---------------------------------------------------------- getUserDataById (V)
router.get('/:id', function(req, res) {
  var id = req.params.id

  user.find({
    _id: id
  }, (err, user) => {
    if (err) {
      res.send(`failed: ${err}`)
    }
    res.json(user)
  })
})

//-------------------------------------------------------- userAuthentication (V)
router.post('/auth', function(req, res) {
  var email = req.body.email
  var password = req.body.password

  queryStr = {
    email: email,
    password: password
  }

  user.find(queryStr, (err, user) => {
    if (err) {
      res.send(err.message)
    }
    if (user[0]) {
      res.send(true)
    } else {
      res.send(false)
    }
  })
})
//------------------------------------------------------- SearchByQueryString (V)
router.post('/search', function(req, res) {
  var queryStr = url.parse(req.url, true).query
  user.find(queryStr, (err, user) => {
    if (err) {
      res.send('fail')
    }
    res.json(user)
  })
})
//------------------------------------------------------- createNewUser (V)
router.post('/', (req, res) => {
  var userData = req.body
  var newUser = new user(req.body)
  newUser.save((err) => {
    if (err) {
      res.send("fail")
    } else {
      res.send("success")
    }

  })
})

//------------------------------------------------------- DeleteUserById
router.delete('/:id', (req, res) => {
  var userId = req.params.id
  user.remove({
    _id: userId
  }, function(err) {
    if (err) {
      res.send(`failed: ${err}`)
    } else {
      res.send(`success`)

    }
  });
})
//------------------------------------------------------- readAll
router.get('/', function(req, res) {
  user.find({}, (err, user) => {
    if (err) {
      res.status(500).send(err.message)
    }
    res.json(user)
  })
})
//------------------------------------------------------- Edit User
router.put('/:id', (req, res) => {
  var userId = req.params.id
  var updateValue = req.body

  user.findById(userId, function(err, user) {
    if (err) {
      res.send(`failed: ${err}`)
    } else {
      user.set(updateValue);
      user.save(function(err, updatedUser) {
        if (err) {
          console.log(err);
        } else {
          res.send("User profile successfully updated");
        }
      });
    }

  });
})

module.exports = router
