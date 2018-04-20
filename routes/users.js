const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
});

userSchema.statics.authenticate = (username, password, callback) => {
  User.findOne({username: username}).exec((err, user) => {
    if (err) {
      return callback(err);
    } else if (!user) {
      const err = new Error('user not found');
      err.status = 401;
      return callback(err);
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (result === true) {
        return callback(null, user);
      } else {
        return callback();
      }
    });

  });
};

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET user info*/
router.get('/:id', (req, res) => {

});

router.post('/login', (req, res) => {

});

module.exports = router;
