/*
Post
*/

const mongoose = require("mongoose")
const sequence = require("mongoose-sequence")(mongoose)
const Schema = mongoose.Schema

// -----------------------------------------------------------------------------
// PRECONFIGURATION

const modelName = "Post"
// -----------------------------------------------------------------------------
// SCHEMA

const schema = new Schema(
  {
    title: {
      type: String
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true
    },
    image_name: {
      type: String
    },
    image_url: {
      type: String
    },
    content: {
      type: String
    },
    read_time: {
      type: Number
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "Account"
    }
  },
  { timestamps: true }
)

// -----------------------------------------------------------------------------
// GENERATED FIELDS

// Auto increment accountId
schema.plugin(sequence, { id: "post_counter", inc_field: "id" })

// -----------------------------------------------------------------------------
// DATA POPULATION

schema.pre("find", function(next) {
  this.select({
    __v: false
  })
  this.populate([{ path: "author", select: "name url" }])
  next()
})

schema.pre("findOne", function(next) {
  this.select({
    __v: false
  })
  this.populate([{ path: "author", select: "name url" }])
  next()
})

// Set updatedAt timestamp
schema.pre("update", function() {
  this.update(
    {},
    {
      $set: { updatedAt: new Date() }
    }
  )
})

// -----------------------------------------------------------------------------
// FINALLY REGISTER THE SCHEMA INTO MODEL

module.exports = mongoose.model(modelName, schema)
