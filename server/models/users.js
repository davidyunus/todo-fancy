const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
  idFB: String,
  name: String,
  todo:[{ type: mongoose.Schema.Types.ObjectId, ref: 'todo' }],
  email: String
},{
  timestamps: true
})

let user = mongoose.model('user', userSchema)

module.exports = user;
