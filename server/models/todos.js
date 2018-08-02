const mongoose = require('mongoose');

let todoSchema = mongoose.Schema({
  title: String,
  activity: String,
  status: String
},{
  timestamps: true
})

let todo = mongoose.model('todo', todoSchema)

module.exports = todo;
