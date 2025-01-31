var express = require('express');
const indexControllers = require('../controllers/indexControllers')
var router = express.Router();

router.get('/', indexControllers.openIndex);

router.get('/', function(req, res, next) {
  res.render('index', { title: 'MedicaMente' });
});

module.exports = router;
