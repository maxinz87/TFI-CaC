const mysql = require('mysql2');

const db = mysql.createPool({
    host: 'bexygym8dct42xezf6px-mysql.services.clever-cloud.com',
    user: 'uxkz49dxdd2nkzpw',
    password: 'kPzsK0AU8S7ozUveBgfj',
    database: 'bexygym8dct42xezf6px',
    connectionLimit: 5
});

db.getConnection((err, connection) => {
    if(err)
        throw err;

    console.log('Base de datos conectada!');
    connection.release(); //libera la conexión para que no quede ocupada
});

module.exports = db;