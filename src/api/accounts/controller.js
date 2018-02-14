const Account = require("./model")

module.exports = {
  getAll: (req, res) => {
    // const accounts = []
    const accounts = Account.find()

    res.send({
      data: accounts
    })
  },

  getOne: (req, res) => {
    const id = Number(req.params.id)
    const account = Account.findOne({ id: id })

    res.send({
      id: id,
      data: account
    })
  }
}
