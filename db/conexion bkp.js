const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'bexygym8dct42xezf6px-mysql.services.clever-cloud.com',
    user: 'uxkz49dxdd2nkzpw',
    password: 'kPzsK0AU8S7ozUveBgfj',
    database: 'bexygym8dct42xezf6px'
});

db.connect((err) => {
    if(err)
        throw err;

    console.log('Base de datos conectada!');
});

module.exports = db;