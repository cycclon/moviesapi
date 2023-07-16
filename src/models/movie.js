const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: false
  },
  nominations: {
    type: Array,
    required: false
  },
  watched: {
    type: Boolean,
    required: true
  }
}, { versionKey: false })

module.exports = mongoose.model('Movie', movieSchema)