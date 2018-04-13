const express = require('express');
const router = express.Router();


const mongoose = require('mongoose');



router.get('/', function(req, res, next) {
  app.Pic.find().then(d => {
    res.send(d);
  });
});



module.exports = router;