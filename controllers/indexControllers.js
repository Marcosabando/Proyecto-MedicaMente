const connection = require("../config/db");

class IndexControllers{

  openIndex = (req, res) => {
    let sql = `SELECT * FROM hospital WHERE hospital_deleted = 0`
    connection.query(sql, (err, result)=>{
      if(err){
        throw err
      }else{
        console.log(result);
        res.render("index",{result});
      }
    })
  };
};

module.exports = new IndexControllers();