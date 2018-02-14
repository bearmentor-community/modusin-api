const express = require('express');
var router = express.Router({
  mergeParams: true
})

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/modusintech');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected to monggodb");
});

exports.mongoose = mongoose
