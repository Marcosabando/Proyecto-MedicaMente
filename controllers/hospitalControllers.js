const connection = require("../config/db");
const bcrypt = require("bcrypt");

class HospitalControllers {

  formRegister = (req, res) => {
    res.render("register");
  };

  register = (req, res) => {
    const { hospitalName, address, phoneNumber, email, password, repPassword } = req.body;


    if (password != repPassword) {
      res.render("register", {message: "Las contraseñas no coinciden"});
    }
    else if (!hospitalName || !email || !password) {
    
      res.render("register", {message: "Hay algún campo vacío"});
    } 
    else {

      bcrypt.hash(password, 10, (errHash, hash) => {
        if(errHash){
          throw errHash
        } else{
          let sql = `INSERT INTO hospital (hospital_name, email, password) VALUES ("${hospitalName}", "${email}", "${hash}")`;
          connection.query(sql, (err, result) => {
            if (err) {
              if(err.errno == 1062){
                res.render("register",{message: "Ya existe un usuario con ese email"})
              }else{
                throw err;
              }
            } else {
              res.redirect("/");
            }
          });
        };
      });
    };
  };


  goLogin = (req, res) => {
    res.render("login")
  }

  login = (req, res) => {
    const {email, password} = req.body;

    let sql = `SELECT * FROM hospital WHERE email = "${email}" AND hospital_deleted = 0`;
    connection.query(sql, (err, result) => {
      if(err){
        throw err
      }
      else{
        if(result.length == 1){
          let hash = result[0].password;
          bcrypt.pass(password, hash, (errPass, resultPass) => {
            if(errPass){
              throw errPass;
            }
            else {
              res.render("login", {message: "Contraseña Incorrecta"})
            };
          });
        }
        else{
          res.render('login', {message: "Email Incorrecto"});
        };
      };
    });
  };


  singleHospital = (req, res) => {
    const {id} = req.params;
    let sqlHospital = `SELECT * FROM hospìtal WHERE id_hospital = ${id} AND hospital_deleted = 0`
  }


};

module.exports = new HospitalControllers()