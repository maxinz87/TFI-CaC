const db = require('../../db/conexion');

const getAllCategories = (req, res) => {

    try {
        db.query('SELECT * FROM categorias;', (err, rows) => {
            if(err)
                return res.status(400).send(err);
            return res.status(200).json(rows);
        });
    } catch (error) {
        return res.status(500).send(err.message);
    }


}

module.exports = { getAllCategories };