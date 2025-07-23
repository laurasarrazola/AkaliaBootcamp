const express = require('express');
const router = express.Router();
const {
  obtenerEtiquetas,
  obtenerEtiquetaPorId,
  obtenerEtiquetasPorProducto
} = require('../controllers/etiqueta-controller');

/*Solo se definen rutas GET, porque no se permite crear, editar ni eliminar categorías desde la interfaz.*/

// GET una etiqueta por ID producto
router.get('/producto/:productoId', obtenerEtiquetasPorProducto);

// GET todas las etiquetas
router.get('/', obtenerEtiquetas);

// GET una etiqueta por ID
router.get('/:id', obtenerEtiquetaPorId);

module.exports = router;
