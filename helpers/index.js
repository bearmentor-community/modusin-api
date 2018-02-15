const jwt = require("jsonwebtoken")

const User = require("../models/users")

module.exports = {
  generateJWT: (content) => {
    const token = jwt.sign(content.payload, content.secret, content.options)
    return token
  },

  isAuthenticated: (req, res, next) => {
    const token =
      req.body.token ||
      req.query.token ||
      req.headers.authorization.split(" ")[1] ||
      "unknown"

    console.log({ token })

    if (token !== "unknown") {
      jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
          res.send({
            message: "Failed to authenticate token.",
            error: error
          })
        } else {
          req.decoded = decoded
        }

        User.findById(decoded.sub, (error, user) => {
          if (error || !user) {
            res.send({
              message: "No user is associated with that token.",
              error: error
            })
          } else {
            console.log({ user })
            return next()
          }
        })
      })
    } else {
      res.status(400).send({
        message:
          "Sorry, no access without an active access token that must be used to query information."
      })
    }
  }
}
