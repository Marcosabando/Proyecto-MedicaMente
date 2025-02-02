var express = require('express');
const doctorsControllers = require('../controllers/doctorsControllers')
const uploadImage = require('../middleware/uploadImage');
var router = express.Router();

// /doctors/allDoctors
router.get('/allDoctors', doctorsControllers.allDoctors);

// /doctors/addDoctor
router.get('/addDoctors/:id_hospital', doctorsControllers.formAddDoctor)
router.post('/addDoctor/:id_hospital', uploadImage("doctors"), doctorsControllers.doctorRegister);

// /doctors/editDoctor/:id
router.get('/editDoctor/:id', doctorsControllers.formEditDoctor);
router.post('/editDoctor/:id', doctorsControllers.editDoctor);

router.get('/logicDeleted/:id', doctorsControllers.logicDeleted);
router.get('/totalDeleted/:id', doctorsControllers.totalDeleted);

router.get('/', doctorsControllers.getAllDoctors);
router.get('/search', doctorsControllers.searchSpeciality);
module.exports = router;