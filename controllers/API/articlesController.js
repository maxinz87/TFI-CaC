const db = require('../../db/conexion');

const getArticlesByCategory = (req, res) => {

    const { categoria } =  req.params;

    try {
        db.query('SELECT * FROM articulos WHERE categoria_id = ?;', [categoria], (err, rows) => {
            if(err)
                return res.status(400).send(err);
            return res.status(200).json(rows);
        });
    } catch (error) {
        return res.status(500).send(err.message);
    }

}

const createNewArticle = (req, res) => {

    const { redactorId, img, titulo, epigrafe, textoPortada, textoCompleto, tamano_articulo, posicion_articulo, categoriaId } = req.body;

    try {
        
        const fechaCreacion = (new Date(Date.now()-10800000)).toISOString().slice(0, 19).replace('T', ' ');

        db.query('INSERT INTO articulos (redactor_id, fecha_creacion, img, titulo, epigrafe, textoPortada, textoCompleto, tamano_articulo, posicion_articulo, categoria_id) VALUES (?,?,?,?,?,?,?,?,?,?)',
                [ redactorId, fechaCreacion, img, titulo, epigrafe, textoPortada, textoCompleto, tamano_articulo, posicion_articulo, categoriaId],
                (err, rows) => {
                    if(err)
                        return res.status(400).send(err);
                    return res.status(200).json(rows);
                });
            } catch (error) {
                return res.status(500).send(err.message);
    }
}

const modifyArticleById = (req, res) => {

    const {articuloId} = req.params;
    const { img, titulo, epigrafe, textoPortada, textoCompleto, tamano_articulo, posicion_articulo, categoriaId} = req.body;

    try {
        
        db.query('UPDATE articulos SET img = ?, titulo = ?, epigrafe = ?, textoPortada = ?, textoCompleto = ?, tamano_articulo = ?, posicion_articulo = ?, categoria_id = ? WHERE id = ?',
                [img, titulo, epigrafe,textoPortada, textoCompleto, tamano_articulo, posicion_articulo, categoriaId, articuloId],
                (err, rows) => {
                    if(err)
                        return res.status(400).send(err);
                    return res.status(200).json({resultado: rows});
                }
        );
    } catch (error) {
        res.status(500).send(error);
    }
}

const deleteArticleById = (req, res) => {

    const {articuloId} = req.params;

    try {
        
        db.query('DELETE FROM articulos WHERE id = ?', [articuloId], (err, rows) => {
                if(err)
                    return res.status(400).send(err);
                return res.status(200).json({resultado: rows});
                }
            );
        } catch (error) {
        res.status(500).send(error);
        }
}

module.exports = { getArticlesByCategory, modifyArticleById, createNewArticle, deleteArticleById };