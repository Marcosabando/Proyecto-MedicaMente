var express = require('express');
const hospitalControllers = require('../controllers/hospitalControllers');
const uploadImage = require('../middleware/uploadImage');
var router = express.Router();


// hospital/register
router.get('/register', hospitalControllers.formRegister);
router.post('/register', hospitalControllers.register);

// hospital/login
router.get('/login', hospitalControllers.goLogin)
router.post('/login', hospitalControllers.login);

module.exports = router;
