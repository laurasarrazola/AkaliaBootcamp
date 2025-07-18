const express = require('express');
const router = express.Router();
const {
  crearImagenProducto,
  obtenerImagenesPorProducto,
  eliminarImagenProducto
} = require('../controllers/imagenProducto-controller');

// Ruta para agregar una imagen a un producto (requiere id del producto como parámetro)
router.post('/:productoId', crearImagenProducto);

// Ruta para obtener todas las imágenes de un producto
router.get('/:productoId', obtenerImagenesPorProducto);

// Ruta para eliminar una imagen específica (requiere id de la imagen)
router.delete('/:imagenId', eliminarImagenProducto);

module.exports = router;
