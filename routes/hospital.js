var express = require("express");
const hospitalControllers = require("../controllers/hospitalControllers");
const uploadImage = require("../middleware/uploadImage");
var router = express.Router();

// /hospital/register
router.get("/register", hospitalControllers.formRegister);
router.post("/register", uploadImage("hospitals"), hospitalControllers.register);

// /hospital/login
router.get("/login", hospitalControllers.goLogin);
router.post("/login", hospitalControllers.login);

// /hospital/singleHospital
router.get("/singleHospital/:id", hospitalControllers.singleHospital);


// /hospital/editHospital/:id
router.get('/editHospital/:id', hospitalControllers.formEditHospital);
router.post('/editHospital/:id', hospitalControllers.editHospital);

router.get("/deletedLogic/:id", hospitalControllers.deletedLogic);
router.get("/deletedTotal/:id", hospitalControllers.deletedTotal);

module.exports = router;
