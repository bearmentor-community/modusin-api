module.exports = {
  get: (req, res) => {
    res.send({
      message: "Modusin API",
      status: true,
      mongodb_uri: process.env.MONGODB_URI
    })
  }
}
