const express = require('express');
const router = express.Router();
const {
  crearImagenProducto,
  obtenerImagenesPorProducto,
  eliminarImagenProducto,
  obtenerImagenes,
} = require('../controllers/imagenProducto-controller');

// Ruta para agregar una imagen a un producto (requiere id del producto como parámetro)
router.post('/:id', crearImagenProducto);

// Ruta para obtener todas las imágenes
router.get('/', obtenerImagenes);

// Ruta para obtener todas las imágenes de un producto
router.get('/:id', obtenerImagenesPorProducto);

// Ruta para eliminar una imagen específica (requiere id de la imagen)
router.delete('/:imagenId', eliminarImagenProducto);

module.exports = router;
