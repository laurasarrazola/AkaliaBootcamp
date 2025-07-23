const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoria-controller');

/*Solo se definen rutas GET, porque no se permite crear, editar ni eliminar categorías desde la interfaz.*/

// Obtener una categoría por su ID producto
router.get('/producto/:id', categoriaController.obtenerCategoriasPorProducto);


// Obtener todas las categorías
router.get('/', categoriaController.obtenerCategorias);

// Obtener una categoría por su ID
router.get('/:id', categoriaController.obtenerCategoriaPorId);


module.exports = router;
