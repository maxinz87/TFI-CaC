const express = require('express');
const { getLatestArticlesByCategory, modifyArticleById, createNewArticle, deleteArticleById, getArticleById } = require('../../controllers/API/articlesController');
const router = express.Router();

router.get('/articulos/:categoria', getLatestArticlesByCategory);
router.get('/articulo_por_id/:articuloId', getArticleById);
router.post('/crear_nuevo_articulo', createNewArticle);
router.put('/modificar_articulo_por_id/:articuloId', modifyArticleById);
router.delete('/borrar_articulo_por_id/:articuloId', deleteArticleById);

module.exports = router;