const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();
const API_BASE_URL = process.env.URL_BASE || 'http://localhost:7000';

// router.get('/', async (req, res) => {

//   try {
//         const response = await axios.get(`${API_BASE_URL}/products`);

//         const products = response.data;

//          res.render('pages/index.ejs', { 
//              products: products,
//              titulo: 'Publicaciones',
//          });
//         } catch (error) {
//          console.error('Error al obtener los productos:', error.message);

//          //Renderizar pagina de error
//          res.status(500).render('Error al obtener los productos', {
//             error: 'Error del servidor',
//             message: 'No se pudieron cargar los productos. Verifica que el backend esté funcionando.',
//         });
//     }
// }); 



// router.get('/productos', async (req, res) => {
//   res.render('pages/productos', { title: 'Productos' });
// });

// router.get('/producto/:id', async (req, res) => {
//   const id = req.params.id;
//   // Trae el producto desde la base de datos o API
//   const producto = await obtenerProductoPorId(id); // Implementa esta función según tu modelo
//   if (!producto) {
//     return res.status(404).render('pages/404');
//   }
//   res.render('pages/producto', { producto });
// });



// router.get('/productos', async (req, res) => {
//     try {
//         const response = await axios.get(`${API_BASE_URL}/products`);
//         const products = response.data;

//          res.render('pages/productos.ejs', { 
//              products: products,
//              titulo: 'Publicaciones',
//          });
//         } catch (error) {
//          console.error('Error al obtener los productos:', error.message);

//          //Renderizar pagina de error
//          res.status(500).render('Error al obtener los productos', {
//             error: 'Error del servidor',
//             message: 'No se pudieron cargar los productos. Verifica que el backend esté funcionando.',
//         });
//     }
// });

/************************************* */
/*router.get('/', async (req, res) => {
  try {
    const responseC = await axios.get(`${API_BASE_URL}/api/categorias`);
    const categorias = responseC.data;

    const responseP = await axios.get(`${API_BASE_URL}/api/productos`);
    const productos = responseP.data;
    res.render('pages/index.ejs', {
      categorias: categorias,
      productos: productos,
      titulo: 'Publicaciones',
    });
  } catch (error) {
    console.error('Error al obtener las categorías:', error.message);

    //Renderizar pagina de error
    res.status(500).render('Error al obtener las categorías', {
      error: 'Error del servidor',
      message: 'No se pudieron cargar las categorías. Verifica que el backend esté funcionando.',
    });
  }
});*/


// router.post('/products/id', async (req, res) => {
//     try {
//         await axios.delete(`${API_BASE_URL}/products/${req.params.id}`);
//         res.redirect('/');
//         console.log(`Producto con ID ${req.params.id} eliminado`);
//     } catch (error) {
//         res.status(500).render('error', { error });
//     }
// });

module.exports = router;