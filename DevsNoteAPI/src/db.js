const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

connection.connect((error) => {
     if(error) {
         console.log(error);
     } else {
         console.log(`Conectado ao DB: ${process.env.DB_NAME}`);
     }
});

module.exports = connection;