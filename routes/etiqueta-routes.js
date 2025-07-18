const express = require('express');
const router = express.Router();
const {
  obtenerEtiquetas,
  obtenerEtiquetaPorId
} = require('../controllers/etiqueta-controller');

/*Solo se definen rutas GET, porque no se permite crear, editar ni eliminar categorías desde la interfaz.*/

// GET todas las etiquetas
router.get('/', obtenerEtiquetas);

// GET una etiqueta por ID
router.get('/:id', obtenerEtiquetaPorId);

module.exports = router;
