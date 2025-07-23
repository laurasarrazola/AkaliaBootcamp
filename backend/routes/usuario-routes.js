const express = require('express');
const router = express.Router();
const {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario
} = require('../controllers/usuario-controller');

const { loginUsuario } = require('../controllers/login-controller');

// Ruta para obtener todos los usuarios
router.get('/', obtenerUsuarios);

// Ruta para obtener un usuario por ID
router.get('/:id', obtenerUsuarioPorId);

// Ruta para crear un nuevo usuario
router.post('/', crearUsuario);

// Ruta para actualizar un usuario
router.put('/:id', actualizarUsuario);

// Ruta para eliminar un usuario
router.delete('/:id', eliminarUsuario);

// Ruta para el login de usuario
router.post('/login', loginUsuario);

module.exports = router;
