const bcrypt = require("bcryptjs")

const User = require("../../models/users")

const helpers = require("../../helpers")

module.exports = {
  getAll: (req, res) => {
    User.find({}, (err, users) => {
      res.send({
        data: users
      })
    })
  },

  getOne: (req, res) => {
    const id = Number(req.params.id)

    User.findOne({ id: id }, (err, user) => {
      res.send({
        id: id,
        data: user
      })
    })
  },

  register: (req, res) => {
    const body = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }
    const newUser = new User(body)

    newUser.save((err) => {
      delete body.password

      if (err) res.send("error")
      else {
        res.send({
          registered: body,
          success: true
        })
      }
    })
  },

  login: (req, res) => {
    const body = {
      email: req.body.email,
      password: req.body.password
    }

    User.findOne({ email: body.email })
      .then((user) => {
        const validPassword = bcrypt.compareSync(
          body.password,
          user.password
        )

        // console.log(">>> account found:", account)
        // console.log({ validPassword })

        if (!user) {
          // (1) If account is not found
          res.send({
            message: `Login failed because user with email '${
              body.email
            }' is not found`
          })
        } else if (!validPassword) {
          // (2) If the found account is logged in with unmatched password
          res.send({
            message: `Sign in failed because password of '${username}' is not match.`
          })
        } else {
          // (3) If the found account is matched with the password
          // console.log({ account })

          // (4) Create token content and config
          let content = {
            payload: {
              // or claims
              iss: process.env.URL, // ISSUER: DOMAIN/URL of the service
              sub: user._id, // SUBJECT: OID/UID/UUID/GUID
              id: user.id, // ACCOUNTID: Sequential ID
              name: user.name, // NAME: Full name
              email: user.email // EMAIL: Email address
            },
            secret: process.env.JWT_SECRET,
            options: {
              expiresIn: "30d" // EXPIRATION: 30 days
            }
          }
          // console.log({ content })

          // (5) Generate a token
          const token = helpers.generateJWT(content)

          // console.log({ token })

          // (6) Finally send that token
          res.send({
            message: "Logged in",
            email: body.email,
            token: token
          })
        }
      })
      .catch((err) => {
        // (7) If there's an error while finding the account
        if (err)
          res.send({
            message: `Something went wrong when try to logging in`
          })
      })
    // Finished sign in
  },

  logout: (req, res) => {
    const body = {}

    res.send({
      registered: body
    })
  },

  test: (req, res) => {
    const body = { email: req.body.email }
    User.findOne({ email: body.email }).then((user) => {
      res.send({
        user
      })
    })
  }
}
