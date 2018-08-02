var jwt = require('jsonwebtoken');
const users = require('../models/users');
const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
require('dotenv').config()



module.exports = {
  // signUp: function(req, res) {
  //   console.log(req);
  //   const saltRounds = 10;
  //   let pass = bcrypt.hashSync(req.body.password, saltRounds);

  //   let newUser = new users({
  //     name: req.body.name,
  //     username: req.body.username,
  //     password: pass
  //   })

  //   newUser.save((err, result) => {
  //     if(err) {
  //       console.log(err);
  //     } else {
  //       res.status(201).json({
  //         message: 'successfully added a new user !',
  //         data: result
  //       })
  //     }
  //   })
  // },
  // signIn: function(req, res) {
  //   users
  //     .findOne({ username: req.body.username})
  //     .then(user => {
  //       // console.log(req.body.password);
  //       if(bcrypt.compareSync(req.body.password, user.password)){
  //         let token = jwt.sign({ id: user.id, role: user.username, name: user.name}, process.env.SECRET)
  //         req.headers.token = token;
  //       }
  //       // res.json(req.headers.token)
  //       // res.json(user.id)
  //       res.redirect(`/user/${user.id}`);
  //     })
  // }
  login: function (req, res) {
    users.findOne({
      idFB: req.body.obj.idFB
    })
    .then(userData => {
      if(userData == null) {
        const newUser = new users(
          req.body.obj
          // {
          //   email: req.body.email,
          //   idFB: req.body.idFB,
          //   name: req.body.name
          // }
        )
        newUser.save()
        .then(data => {
          let token = jwt.sign({ id: data._id, name: data.name }, process.env.SECRET);
          res.status(200).json({
            token: token
          })
        })
        .catch(err => console.log(err))
      } else {
        let token = jwt.sign({ id: userData._id, name: userData.name }, process.env.SECRET);
        res.status(200).json({
          token: token
        })
      }
    })
  }
};
