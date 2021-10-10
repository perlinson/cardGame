const mongoose = require('mongoose')

const { Schema } = mongoose

const UserSchema = new Schema({
  fullname: { type: String, default: '' },
  email: { type: String, default: '' },
  password: { type: String, default: '' },

},
  { timestamps: true })

module.exports = mongoose.model('User', UserSchema)