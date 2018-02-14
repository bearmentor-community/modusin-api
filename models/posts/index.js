const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

/*
 * Create Posts Schema
 */
let postsSchema = new Schema({
  id : {
    type : Number
  },
  title : {
    type : String
  },
  image_name : {
    type : String
  },
  image_url : {
    type : String
  },
  content : {
    type : String
  },
  author : {
    name : {
      type : String
    },
    bio : {
      type : String
    }
  },
  read_time : {
    type : Number
  }
}, {
  versionKey: false // Don't create __v
});

module.exports = mongoose.model(`Posts`, postsSchema);
