const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000; // Puerto para Express, no para MySQL

/******************************
 *CONFIGURACIÓN DE MIDDLEWARES*
 ******************************/
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/****************************
 *     MONTAJE DE RUTAS     *
 ****************************/
const categoriaRoutes = require('./routes/categoria-routes.js');
app.use('/api/categorias', categoriaRoutes);

const emprendimientoRoutes = require('./routes/emprendimiento-routes.js');
app.use('/api/emprendimientos', emprendimientoRoutes);

const etiquetasRoutes = require('./routes/etiqueta-routes.js');
app.use('/api/etiquetas', etiquetasRoutes);

const imagenProductoRoutes = require('./routes/imagenProducto-routes.js');
app.use('/api/imagenes-producto', imagenProductoRoutes);

const productoRoutes = require('./routes/producto-routes');
app.use('/api/productos', productoRoutes)

const redSocialRoutes = require('./routes/redSocial-routes.js');
app.use('/api/redSocial', redSocialRoutes);

const usuarioRoutes = require('./routes/usuario-routes.js');
app.use('/api/usuarios', usuarioRoutes);

/****************************
 *     INICIAR SERVIDOR     *
 ****************************/
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});