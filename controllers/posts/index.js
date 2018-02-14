const postsModel = require('../../models/posts')

module.exports = {
  list : (req,res) => {
    postsModel.find((err, posts) => {
      if (err) {
        // Status : Internal server error
        return res.status(500).json({
          message: `Error when getting posts`,
          error: err
        });
      }
      return res.json({
        // Status : OK
        message: `Here's your posts`,
        data: posts
      });
    });
  }
}
