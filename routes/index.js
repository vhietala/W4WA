const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');



/* GET home page. */
router.get('/', function(req, res, next) {
  const Pic =  req.app.get('Pic');
  Pic.find().then(json=>{
    console.log(json);
    res.render('index', { title: 'Express' , file: json});
  })
});



module.exports = router;
