const mysql2 = require('mysql2');
const connection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'medicamente'
});

connection.connect((err)=>{
    if(err){
        console.log('error al conectar', err);
        return;
    }
    console.log("Conexión Correcta con DB");
}
)
module.exports = connection;