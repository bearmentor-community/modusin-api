module.exports = {
  get: (req, res) => {
    res.send({
      message: "MODUSIN API",
      status: true,
      mongodb_uri: process.env.MONGODB_URI
    })
  }
}
