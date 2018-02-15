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
  }
}
