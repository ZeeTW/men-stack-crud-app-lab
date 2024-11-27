const mongoose = require('mongoose')

const catSchema = new mongoose.Schema({
  name: String,
  description: String,
  isCute: Boolean
})

const Cat = mongoose.model('Cat', catSchema)

module.exports = Cat
