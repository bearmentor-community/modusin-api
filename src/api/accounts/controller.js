const Account = require("./model")

module.exports = {
  getAll: (req, res) => {
    Account.find({}, (err, accounts) => {
      res.send({
        data: accounts
      })
    })
  },

  getOne: (req, res) => {
    const id = Number(req.params.id)

    Account.findOne({ id: id }, (err, account) => {
      res.send({
        id: id,
        data: account
      })
    })
  },

  register: (req, res) => {
    const data = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }
    const newAccount = new Account(data)

    newAccount.save((err) => {
      delete data.password

      if (err) res.send("error")
      else {
        res.send({
          registered: data,
          success: true
        })
      }
    })
  },

  login: (req, res) => {
    const data = {
      email: req.body.email,
      password: req.body.password
    }

    res.send({
      logged_in: data
    })
  },

  logout: (req, res) => {
    const data = {}

    res.send({
      registered: data
    })
  }
}
