const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  showDetails: {
    type: Boolean,
    required: true
  }
  
}, {versionKey: false})

module.exports = mongoose.model('Category', categorySchema)