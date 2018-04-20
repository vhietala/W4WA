const express = require('express');
const router = express.Router();

//const mongoose = require('mongoose');

/* GET home page. */
router.get('/', function(req, res, next) {
  const Pic = req.app.get('Pic');
  Pic.find().then(json=>{
    console.log(json);
    res.render('index', { title: 'My page' , file: json});
  })
  // const files = router.files.get('/');
  // res.render('index', {title: 'My page', file: files});

});

module.exports = router;
