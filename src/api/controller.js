module.exports = {
  get: (req, res) => {
    res.send({
      message: "Modusin API",
      mongodb_uri: process.env.MONGODB_URI
    })
  }
}
