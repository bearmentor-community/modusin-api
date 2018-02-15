const Account = require("../accounts/model")
const Post = require("./model")

const helpers = require("../../helpers")

module.exports = {
  get: (req, res) => {
    Post.find({}, (err, resources) => {
      res.send({
        data: resources
      })
    })
  },

  getById: (req, res) => {
    Post.findOne({ id: Number(req.params.id) }, (err, account) => {
      res.send({
        params: req.params,
        data: account
      })
    })
  },

  post: (req, res) => {
    const newPost = new Post({
      title: req.body.title,
      content: req.body.content,
      image_name: req.body.image_name,
      image_url: req.body.image_url,
      author: req.body._id
    })

    newPost.save((error) => {
      res.send({
        message: "New post has been saved",
        data: newPost
      })
    })
  }
}
