// Importaciones necesarias
const express = require('express');
const router = express.Router();

// Importar el controlador
const redSocialController = require('../controllers/redSocial-controller');

// Ruta: Obtener redes sociales de un usuario/artesano específico
router.get('/:idUsuario/redes-sociales', redSocialController.obtenerRedesSocialesPorUsuario);

module.exports = router;
