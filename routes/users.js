const express = require('express');
const router = express.Router();

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
