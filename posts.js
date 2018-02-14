var express = require('express')
var fs = require('fs')
const hlprs = require('./helpers')
const url = require('url')
var router = express.Router({mergeParams: true})

// schema with validation
var ObjectId = hlprs.mongoose.Schema.ObjectId
var ObjectIdType = hlprs.mongoose.Types.ObjectId
var Schema = hlprs.mongoose.Schema
var userSchema = new hlprs.mongoose.Schema({
  _user: {
    type: Schema.Types.ObjectId,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ""
  },
  picture: {
    type: String,
    default: ""
  },
  content: {
    type: String
  },
  vote: [Schema.Types.ObjectId],
  tags: [String],
  response_of: Schema.Types.ObjectId,
  crate_date: {
    type: Date,
    default: Date.now
  }
})
var posts = hlprs.mongoose.model('posts', userSchema)
//------------------------------------------------------- readAllPosts (V)
router.get('/', function(req, res) {
  posts.find({}, (err, user) => {
    if (err) {
      res.send(`fail : ${err}`)
    }
    res.json(user)
  })
})

//------------------------------------------------------- createNewPosts (V)
router.post('/', (req, res) => {
  var postDetail = req.body
  if (postDetail._user) {
    postDetail._user = new ObjectIdType(postDetail._user)
  }
  var newPost = new posts(postDetail)
  newPost.save((err) => {
    if (err) {
      res.send("fail")
    } else {
      res.send("success")
    }
  })
})

//------------------------------------------------------- getPostByPostId (v)
router.get('/id/:id', function(req, res) {
  var userId = new ObjectIdType(req.params.id)

  posts.find({
    _id: userId
  }, (err, user) => {
    if (err) {
      res.send(`fail : ${err}`)
    }
    res.json(user)
  })
})

//------------------------------------------------------- voteUserPost (V)
router.post('/vote', (req, res) => {
  if (!ObjectIdType.isValid(req.body._id) || !ObjectIdType.isValid(req.body.voter)) {
    return res.send("error object id not valid")
  }

  var _id = new ObjectIdType(req.body._id)
  var voter = new ObjectIdType(req.body.voter)

  posts.findById(_id, function(err, post) {
    if (err) {
      res.send(`failed : ${err}`)
    } else {
      post.vote.push(voter)
      post.save(function(err, votedPost) {
        if (err) {
          res.send(`failed : ${err}`)
        } else {
          res.send("Vote Success");
        }
      });
    }
  });
})

//------------------------------------------------------- getPostByTag
router.post('/getByTags', (req, res) => {
  var tags = req.body.tags
  posts.find({
    tags: {
      $all: tags
    }
  }, (err, post) => {
    if (err) {
      res.send(`fail : ${err}`)
    } else {
      res.json(post)
    }
  })
})

//------------------------------------------------------- SearchByQueryString (V)
router.get('/search', function(req, res) {
  var queryStr = url.parse(req.url, true).query
  console.log(queryStr);
  posts.find(queryStr, (err, post) => {
    if (err) {
      res.send('fail')
    } else {
      res.json(post)
    }
  })
})

//------------------------------------------------------- searchContentContainSpecificString (V)
router.post('/searchPostsByContent', function(req, res) {
  var key = req.body.keywords
  console.log(key);
  posts.find({content: /[key]/}, (err, post) => {
    if (err) {
      res.send('fail')
    } else {
      res.json(post)
    }
  })
})

//------------------------------------------------------- DeleteUserById
router.delete('/id/:userId', (req, res) => {
  var userId = req.params.userId
  user.remove({
    _id: userId
  }, function(err) {
    if (err) {
      res.status(500).send(err.message)
    }
    res.send("User successfully deleted")
  });
})

//------------------------------------------------------- Edit User
router.put('/id/:userId', (req, res) => {
  var userId = req.params.userId
  var updateValue = req.body

  user.findById(userId, function(err, user) {
    if (err) {
      console.log(err);
    }
    user.set(updateValue);
    user.save(function(err, updatedUser) {
      if (err) {
        console.log(err);
      }
      res.send("User profile successfully updated");
    });
  });
})

module.exports = router
