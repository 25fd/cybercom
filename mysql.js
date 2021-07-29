const mysql = require('mysql');
const { promisify } = require('util')
const dbName = 'mydb'

const con = mysql.createConnection({
  host: "localhost",
  port:"3306",
  user: "root",
  password: "Toor@2501",
  database: dbName
});

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  port:"3306",
  user: "root",
  password: "Toor@2501",
  database: dbName
});

pool.getConnection((err, connection) => {
  if (err && err.code === 'ER_BAD_DB_ERROR' ) {
    con.query(`CREATE DATABASE ${dbName}` , () =>{
      console.log(`${dbName}  successfully created  at ${this.port}`);
      con.end()
    })
  } else if (err) {
    throw err
  }
   if (connection) connection.release()
  console.log("Wow..  MySql Connected!");
   
  });

  pool.query = promisify(pool.query)

module.exports = pool;