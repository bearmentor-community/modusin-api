const express = require("express")
const app = express()
const hlprs = require("./helpers")
// var router = express.Router({
//   mergeParams: true
// })

//load modules
const path = require("path")
const _ = require("lodash")
const engines = require("consolidate")
const bodyParser = require("body-parser")
const cors = require("cors")
require("pretty-error").start()

app.use(cors())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)

app.get("/", function(req, res) {
  res.end()
})

var userRouter = require("./users")
app.use("/users", userRouter)

var userRouter = require("./posts")
app.use("/posts", userRouter)

//port configuration
const server = app.listen(3001, () => {
  console.log(`server running at http://localhost:${server.address().port}`)
})

app.use(function(err, req, res, next) {
  if (err) {
    res.send("error")
  }
})
