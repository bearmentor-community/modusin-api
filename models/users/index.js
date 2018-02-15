const bcrypt = require("bcryptjs")
const mongoose = require("mongoose")
const sequence = require("mongoose-sequence")(mongoose)
const Schema = mongoose.Schema

const modelName = "User"

const SALT_WORK_FACTOR = 8

const schema = new Schema(
  {
    name: {
      type: String
    },
    email: {
      type: String,
      unique: true,
      lowercase: true
    },
    password: String,
    hash: String,
    salt: String
  },
  { timestamps: true,
    versionKey: false
  }
)

schema.plugin(sequence, { inc_field: "id" })

schema.pre("save", function(next) {
  if (!this.isModified("password")) return next()
  else {
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
      if (err) return next(err)
      else {
        bcrypt.hash(this.password, salt, (err, hash) => {
          if (err) return next(err)
          else {
            this.password = hash
            this.hash = hash
            this.salt = salt
            return next()
          }
        })
      }
    })
  }
})

module.exports = mongoose.model(modelName, schema)
