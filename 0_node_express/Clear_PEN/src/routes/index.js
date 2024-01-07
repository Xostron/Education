var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'XOSTRON API', info:'PEN - postgres, express, node' });
});

module.exports = router;