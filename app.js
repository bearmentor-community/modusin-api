require('dotenv').config()

const cors = require('cors')
const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const posts = require('./routes/posts')
const users = require('./routes/users')

const app = express()
const db = mongoose.connection

const successMessage = 'You are connected to MongoDB'
const errorMessage = 'Connection error : '

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI)
db.on('error', console.log.bind(console, errorMessage))
db.once('open', () => {
  console.log(successMessage)
});

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/posts', posts)
app.use('/users', users)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
});

module.exports = app