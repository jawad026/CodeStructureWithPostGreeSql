var express = require('express');
const userController = require('../controller/user.Controller');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/student',userController.getAllStudents)

module.exports = router;
