const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const {
  obtenerProductos,
  obtenerProductoPorId,
  obtenerProductosConUsuarios,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} = require('../controllers/producto-controller');

/************************************
 *        CRUD PARA PRODUCTOS
************************************/
// Ruta para obtener todos los productos
router.get('/', obtenerProductos);

// Ruta para obbtener productos por id usuario
router.get('/usuarios/:id', obtenerProductosConUsuarios)


// Ruta para obtener un producto por ID
router.get('/:id', obtenerProductoPorId);

// Ruta para actualizar un producto por ID

router.post('/usuario-productos/:idUsuario/editar/:idProducto',
  upload.fields([
    { name: 'imagenes', maxCount: 10 }
  ]),
  actualizarProducto
);

router.post('/usuario-productos/:idUsuario/crear',
  upload.fields([
    { name: 'imagenes', maxCount: 10 }
  ]),
  crearProducto
);


// Ruta para eliminar un producto por ID
router.delete('/:id', eliminarProducto);

module.exports = router;
