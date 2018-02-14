var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
  'id': Number,
  'name': String,
  'bio': String,
  'email': String,
  'password': String,
  'reset_token': [],
  'following': Number,
  'followers': Number,
  'created_at': Date,
  'updated_at': Date,
}, {versionKey: false});

module.exports = mongoose.model('users', userSchema);
