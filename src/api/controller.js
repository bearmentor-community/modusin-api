module.exports = {
  get: (req, res) => {
    res.send({
      author: "M Haidar Hanif",
      message: "Modusin API",
      mongodb_uri: process.env.MONGODB_URI
    })
  }
}
