const express = require('express');
const router = express.Router();

const { getUsers, getUser, newUser, deleteUser, updateUser } = require('../../controllers/API/usersController');

router.get('/lista_de_usuarios', getUsers);
router.get('/lista_de_usuarios/:userId', getUser);
router.post('/nuevo_usuario', newUser);
router.put('/modificar_usuario/:userId', updateUser);
router.delete('/borrar_usuario/:userId', deleteUser);

module.exports = router;
