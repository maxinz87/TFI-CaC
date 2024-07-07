const express = require('express');
const { getArticlesByCategory, modifyArticleById, createNewArticle, deleteArticleById } = require('../../controllers/API/articlesController');
const router = express.Router();

router.get('/articulos_por_id/:categoria', getArticlesByCategory);
router.post('/crear_nuevo_articulo', createNewArticle);
router.put('/modificar_articulo_por_id/:articuloId', modifyArticleById);
router.delete('/borrar_articulo_por_id/:articuloId', deleteArticleById);

module.exports = router;