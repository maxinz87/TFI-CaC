const db = require('../../db/conexion');

const getUsers = (req, res) => {

    try {
        
        db.query('SELECT * FROM usuarios;', (err, rows) => {
            if(err)
                return res.status(400).send(err);
            return res.status(200).json(rows);
        });

    } catch (error) {
        return res.status(500).send(err.message);
    }
}

const getUser = (req, res) => {

    const { userId } = req.params;

    try {
        
        db.query('SELECT * FROM usuarios WHERE id = ?', [userId], (err,rows) => {
            if(err)
                return res.status(400).json( {msg: err} );
            return res.status(200).json({resultado: rows});
        });

    } catch (error) {
        return res.status(500).send(error);
    }
}

const newUser = (req, res) => {
    const {rolId, nombreUsuario, apellidoUsuario, fechaNacimiento, localidad, provinciaId, email, pass} = req.body;
    
    try {
        
        db.query('INSERT INTO usuarios(rol_id,nombre,apellido,fechaNacimiento,localidad,provincia_id,email,contrasena) VALUES (?,?,?,?,?,?,?,?)',
                [rolId, nombreUsuario, apellidoUsuario, fechaNacimiento, localidad, provinciaId, email, pass],
                (err, rows) => {
                    if(err)
                        return res.status(400).send(err);
                    return res.status(200).json({resultado: rows});
                });

    } catch (error) {
        res.status(500).send(error);
    }
}

const updateUser = (req, res) => {

        const { userId } = req.params;
        const { rolId, nombreUsuario, apellidoUsuario, fechaNacimiento, localidad, provinciaId, email, pass } = req.body;

        try {
            db.query('UPDATE usuarios SET rol_id = ?, nombre = ?, apellido = ?, fechaNacimiento = ?, localidad = ?, provincia_id = ?, email = ?, contrasena = ? WHERE id = ?',
                [rolId, nombreUsuario, apellidoUsuario, fechaNacimiento, localidad, provinciaId, email, pass, userId],
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

const deleteUser = (req, res) => {

    const { userId } = req.params;

    try {
        db.query('DELETE FROM usuarios WHERE id = ?', 
            [userId], (err, rows) => {
                if(err)
                    return res.status(400).send(err);
                return res.status(200).json({resultado: rows});
            }
        );
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = { getUsers, getUser, newUser, deleteUser, updateUser };