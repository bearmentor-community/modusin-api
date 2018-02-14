const jwt = require("jsonwebtoken")

module.exports = {
  generateJWT: (content) => {
    const token = jwt.sign(content.payload, content.secret, content.options)
    return token
  }
}
