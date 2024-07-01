const express = require('express');
const router = express.Router();

const { getUsers, getUser, newUser } = require('../../controllers/API/usersController');

router.get('/lista_de_usuarios', getUsers);
router.get('/lista_de_usuarios/:userId', getUser);
router.post('/nuevo_usuario', newUser);

module.exports = router;
