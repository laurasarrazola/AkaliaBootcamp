const express = require('express');
const router = express.Router();

// Importar todos los routers individuales
const categoriaProductoRoutes = require('./categoria-producto-routes-front');
const usuarioRoutes = require('./usuario-routes-front');
const productoRoutes = require('./producto-routes-front');

router.use('/', categoriaProductoRoutes);
router.use('/', usuarioRoutes);

router.use('/productos', productoRoutes);
module.exports = router;
