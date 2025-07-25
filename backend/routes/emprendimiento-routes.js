const express = require('express');
const router = express.Router();
const {
  obtenerEmprendimientos,
  obtenerEmprendimientoPorId,
  crearEmprendimiento,
  actualizarEmprendimiento,
  eliminarEmprendimiento,
  obtenerEmprendimientoPorIdUsuario,
  obtenerEmprendimientosConRedes
} = require('../controllers/emprendimiento-controller');

// Ruta para obtener todos los emprendimientos
router.get('/', obtenerEmprendimientos);

// Ruta para obtener emprendimiento por ID usuario
router.get('/usuario/:id', obtenerEmprendimientoPorIdUsuario);

// Ruta para obtener emprendimiento por ID usuario
router.get('/redes/:id', obtenerEmprendimientosConRedes);

// Ruta para obtener emprendimiento por ID
router.get('/:id', obtenerEmprendimientoPorId);

// Ruta para crear nuevo emprendimiento
router.post('/', crearEmprendimiento);

// Ruta para actualizar emprendimiento por ID
router.put('/:id', actualizarEmprendimiento);

// Ruta para eliminar emprendimiento por ID
router.delete('/:id', eliminarEmprendimiento);

module.exports = router;
