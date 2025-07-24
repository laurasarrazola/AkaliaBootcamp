const express = require('express');
const router = express.Router();

// Importar todos los routers individuales
const categoriaProductoRoutes = require('./categoria-producto-routes-front');
const usuarioRoutes = require('./usuario-routes-front');
const productoRoutes = require('./producto-routes-front');
const authRoutes = require('./usuario-routes-front');
const contactanosRoutes = require('./contactanos-routes-front');

router.use('/', categoriaProductoRoutes);
router.use('/', usuarioRoutes);
router.use('/', authRoutes)


router.use('/contactanos', contactanosRoutes);
router.use('/productos', productoRoutes);

module.exports = router;
