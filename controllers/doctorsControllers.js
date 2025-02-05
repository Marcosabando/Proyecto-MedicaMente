const connection = require("../config/db");

class DoctorsControllers {
  allDoctors = (req, res) => {

    let sql = `SELECT id_doctor, doctor_name, last_name, speciality, doctor_image,hospital.hospital_name FROM doctor, hospital WHERE doctor.id_hospital = hospital.id_hospital 
    AND doctor_delete = 0;`;
    connection.query(sql, (err, result) => {
      if (err) {
        throw err;
      } else {
        res.render("allDoctors", { result: result });
      }
    });
  };

  formAddDoctor = (req, res) => {
    const { id_hospital } = req.params;
    res.render("addDoctor", { id_hospital: id_hospital });
  };

  doctorRegister = (req, res) => {
    const { id_hospital } = req.params;
    const { doctor_name, last_name, speciality, description, university_degree, imagen } = req.body;

    let sql = `INSERT INTO doctor (id_hospital,  doctor_name, last_name, speciality, description_dr, university_degree) VALUES (${id_hospital}, "${doctor_name}", "${last_name}", "${speciality}", "${description}", "${university_degree}")`;

    if (req.file) {
      sql =
        sql = `INSERT INTO doctor (id_hospital,  doctor_name, last_name, speciality, description_dr, university_degree, doctor_image) VALUES (${id_hospital}, "${doctor_name}", "${last_name}", "${speciality}", "${description}", "${university_degree}", "${req.file.filename}")`;
    }

    connection.query(sql, (err, result) => {
      if (err) {
        throw err;
      } else {
        res.redirect(`/hospital/singleHospital/${id_hospital}`);
      }
    });
  };

  formEditDoctor = (req, res) => {
    const { id } = req.params;
    let sql = `SELECT id_doctor, id_hospital, doctor_name, last_name, speciality, description_dr, university_degree, doctor_image FROM doctor WHERE id_doctor = ${id} AND doctor_delete = 0`;

    connection.query(sql, (err, result) => {
      if (err) {
        throw err;
      } else {
        console.log(result);
        
        res.render("editDoctor", { result: result[0] });
      }
    });
  };

  editDoctor = (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    
    const { doctor_name, last_name, customSpeciality, description, university_degree } = req.body;

    if (!doctor_name || !last_name || !customSpeciality || !description || !university_degree) {
      console.log("errpoooooooooooooossssssssssooooooo");
      
      res.redirect(`/doctors/editDoctor/${id}`);

      

    } else {
      let sqlDoc = `SELECT id_hospital FROM doctor WHERE id_doctor = ${id}`
      let sql = `UPDATE doctor SET doctor_name = "${doctor_name}",last_name = "${last_name}", speciality = "${customSpeciality}", 
      description_dr = "${description}", university_degree = "${university_degree}" WHERE id_doctor = ${id} AND doctor_delete = 0`;
     
      connection.query(sqlDoc, (errDoc, resultDoc) => {
        if (errDoc) {
          throw errDoc;
        } else {
          connection.query(sql, (err, result) => {
            if (err) {
              throw err;
            } else {
              let id_hospital = resultDoc[0].id_hospital;
  
              res.redirect(`/hospital/singleHospital/${id_hospital}`);
            }
          });
        }
      });
    }
  };

  logicDeleted = (req, res) => {
    const { id } = req.params;
    let sqlDoc = `SELECT id_hospital FROM doctor WHERE id_doctor = ${id}`;
    let sql = `UPDATE doctor SET doctor_delete = 1 WHERE id_doctor = ${id}`;

    connection.query(sqlDoc, (errDoc, resultDoc) => {
      if (errDoc) {
        throw errDoc;
      } else {
        connection.query(sql, (err, result) => {
          if (err) {
            throw err;
          } else {
            let id_hospital = resultDoc[0].id_hospital;

            res.redirect(`/hospital/singleHospital/${id_hospital}`);
          }
        });
      }
    });
  };

  totalDeleted = (req, res) => {
    const { id } = req.params;

    let sqlDoc = `SELECT id_hospital FROM doctor WHERE id_doctor = ${id}`;
    let sql = `DELETE FROM doctor WHERE id_doctor = ${id}`;
    connection.query(sqlDoc, (errDoc, resultDoc) => {
      if (errDoc) {
        throw errDoc;
      } else {
        connection.query(sql, (err, result) => {
          if (err) {
            throw err;
          } else {
            let id_hospital = resultDoc[0].id_hospital;

            res.redirect(`/hospital/singleHospital/${id_hospital}`);
          }
        });
      }
    });
  };



  getAllDoctors = (req, res) => {
    let sql = `SELECT doctor.doctor_name, doctor.last_name, doctor.speciality, 
               doctor.doctor_image, hospital.hospital_name 
               FROM doctor, hospital 
               WHERE doctor.id_hospital = hospital.id_hospital 
               AND doctor_deleted = 0`;

    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error in database query:', err);
            return res.status(500).send('Error en la base de datos');
        }
        res.render('allDoctors', { result: results, speciality: '' });
    });
};

searchSpeciality = (req, res) => {
  const speciality = req.query.speciality;
  console.log('Especialidad buscada:', speciality);

  if (!speciality || speciality === 'Select') {

      let sql = `SELECT doctor.doctor_name, doctor.last_name, doctor.speciality, doctor.doctor_image, hospital.hospital_name FROM doctor, hospital WHERE doctor.id_hospital = hospital.id_hospital`;
                 
      connection.query(sql, (err, results) => {
          if (err) {
              console.error('Error en la consulta:', err);
              res.send('Error en la base de datos');
          }
          console.log('Resultados:', results);
          res.render('allDoctors', { result: results, speciality: '' });
      });
  } else {
      let sql = `SELECT doctor.doctor_name, doctor.last_name, doctor.speciality, doctor.doctor_image, hospital.hospital_name FROM doctor, hospital WHERE doctor.id_hospital = hospital.id_hospital AND doctor.speciality = ?`;

      connection.query(sql, [speciality], (err, results) => {
          if (err) {
              console.error('Error en la consulta:', err);
              res.send('Error en la base de datos');
          }
          console.log('Resultados encontrados:', results.length);
          console.log('Resultados:', results);
          res.render('allDoctors', { result: results, speciality });
      });
  }
};
}
module.exports = new DoctorsControllers();
