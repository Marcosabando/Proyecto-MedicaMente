const connection = require("../config/db");
const bcrypt = require("bcrypt");

class HospitalControllers {
  formRegister = (req, res) => {
    res.render("register");
  };

  register = (req, res) => {
    const { hospitalName, address, city, phoneNumber, email, description, password, repPassword } = req.body;

    if (password != repPassword) {
      res.render("register", { message: "Las contraseñas no coinciden" });
    } else if (!hospitalName || !email || !password) {
      console.log(req.body);

      res.render("register", { message: "Hay algún campo vacío" });
    } else {
      bcrypt.hash(password, 10, (errHash, hash) => {
        if (errHash) {
          throw errHash;
        } else {
          let sql = `INSERT INTO hospital (hospital_name, address, phone_number, email, password, city, description) VALUES ("${hospitalName}", "${address}", "${phoneNumber}","${email}", "${hash}" , "${city}", "${description}",)`;

          if (req.file) {
            sql = `INSERT INTO hospital (hospital_name, address, phone_number, email, password, city, description, hospital_img) VALUES ("${hospitalName}", "${address}", "${phoneNumber}","${email}", "${hash}" , "${city}", "${description}", "${req.file.filename}")`;
          }

          connection.query(sql, (err, result) => {
            if (err) {
              if (err.errno == 1062) {
                res.render("register", { message: "Ya existe un usuario con ese email" });
              } else {
                throw err;
              }
            } else {
              res.redirect("/");
            }
          });
        }
      });
    }
  };

  goLogin = (req, res) => {
    res.render("login");
  };

  login = (req, res) => {
    const { email, password } = req.body;

    let sql = `SELECT * FROM hospital WHERE email = "${email}" AND hospital_deleted = 0`;
    connection.query(sql, (err, result) => {
      if (err) {
        throw err;
      } else {
        if (result.length == 1) {
          let hash = result[0].password;
          bcrypt.compare(password, hash, (errCompare, resultCompare) => {
            if (errCompare) {
              throw errCompare;
            } else {
              console.log(resultCompare);
              if (resultCompare) {
                res.redirect("/");
              } else {
                res.render("login", { message: "Usuario o Contraseña Incorrecta" });
              }
            }
          });
        } else {
          res.render("login", { message: "Usuario o Contraseña Incorrecta" });
        }
      }
    });
  };

  singleHospital = (req, res) => {
    const { id } = req.params;
    let sqlHospital = `SELECT * FROM hospital WHERE id_hospital = ${id} AND hospital_deleted = 0`;
    let sqlDoctors = `SELECT * FROM doctor WHERE id_hospital = ${id} AND doctor_delete = 0`;
    
    connection.query(sqlHospital, (errHospital, resultHospital) => {
      if (errHospital) {
        throw errHospital;
      } else {
        connection.query(sqlDoctors, (errDoctors, resultDoctors) => {
          if (errDoctors) {
            throw errDoctors;
          } else {
            res.render("singleHospital", { result: resultHospital[0], doctors: resultDoctors });
          }
        });
      }
    });
  };

  
  formEditHospital = (req, res) => {
    const { id } = req.params;
    let sql = `SELECT * FROM hospital WHERE id_hospital = ${id} AND hospital_deleted = 0`;

    connection.query(sql, (err, result) => {
      if (err) {
        throw err;
      } else {
        console.log(result);
        
        res.render("editHospital", { result: result[0] });
      }
    });
  };

  editHospital = (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    
    const { phone_number, email, description } = req.body;

    if (!phone_number || !email || !description) {
      console.log("errpoooooooooooooossssssssssooooooo");
      
      res.redirect(`/hospital/editHospital/${id}`);

    } else {
      let sql = `UPDATE hospital SET phone_number = "${phone_number}", email = "${email}", description = "${description}" WHERE id_hospital = ${id} AND hospital_deleted = 0`;

          connection.query(sql, (err, result) => {
            if (err) {
              throw err;
            } else {
              res.redirect(`/hospital/singleHospital/${id}`);
            }
          });
        }

    }


  deletedLogic = (req, res) => {
    const { id } = req.params;
    let sql = `UPDATE hospital LEFT JOIN doctor ON hospital.id_hospital = doctor.id_hospital SET hospital.hospital_deleted = 1, doctor.doctor_delete = 1 WHERE hospital.id_hospital = ${id}`;

    connection.query(sql, (err, result) => {
      if (err) {
        throw err;
      } else {
        res.redirect("/");
      }
    });
  };

  deletedTotal = (req, res) => {
    const { id } = req.params;
    let sql = `DELETE FROM hospital WHERE id_hospital = ${id}`;

    connection.query(sql, (err, result) => {
      if (err) {
        throw err;
      } else {
        res.redirect("/");
      }
    });
  };
}

module.exports = new HospitalControllers();
