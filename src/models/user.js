const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  watchedmovies: {
    type: Array,
    required: false
  },
  recommendations: {
    type: Array,
    required: false
  }
}, { versionKey: false })

module.exports = mongoose.model('User', userSchema)