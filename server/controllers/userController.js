const users = require('../models/users');
const list = require('../models/todos');
const mongoose = require('mongoose');

module.exports = {
  getList: function(req, res) {
    // let id = mongoose.Types.ObjectId(req.params.id)

    users
      // .findByI
      .findOne({ idFB: req.params.id })
      .populate('todo')
      .then(user => {
        res.status(200).json({
          message: 'success get data',
          data: user
        })
      })
      .catch(err => {
        res.status(500).json({
          message: 'failed to get data'
        })
      })
  },
  addList: function(req, res) {
    // let id = mongoose.Types.ObjectId(req.params.id)

    let newList = new list({
      title: req.body.title,
      activity: req.body.activity,
      status: 'progress'
    })

    newList.save((err, result) => {
      if(err) {
        console.log(err);
      } else {
        users
          .findOneAndUpdate({ idFB: req.params.id }, {
            $push: { todo: mongoose.Types.ObjectId(result.id) }
          })
          .then(update => {
            res.status(200).json({
              message: `succeed add data: ${result.activity}`,
              data: update
            })
          })
          .catch(err => {
            res.status(500).json({
              message: 'failed to update data'
            })
          })
      }
    })
  },
  finish: function(req, res) {
    list.findOneAndUpdate({ activity: req.body.activity }, {
      status: 'done'
    })
    .then(update => {
      res.status(200).json({
        message: `finished ${update.activity}`
      })
    })
    .catch(err => {
      res.status(200).json({
        message: 'failed to update data'
      })
    })
  },
  remove: function(req, res) {
    list.findOneAndRemove({ activity: req.body.activity })
    .then(update => {
      res.status(200).json({
        message: `deleted ${update.activity}`
      })
    })
    .catch(err => {
      res.status(200).json({
        message: 'failed to delete data'
      })
    })
  }
};
