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
  }
}
