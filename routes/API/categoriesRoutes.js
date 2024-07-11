const express = require('express');
const { getAllCategories } = require('../../controllers/API/categoriesController');
const router = express.Router();

router.get('/categorias', getAllCategories);

module.exports = router;