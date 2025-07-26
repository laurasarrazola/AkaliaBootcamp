// /*****************************************
//  *           IMPORTAR MÓDULOS            *
//  *****************************************/
const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

// /*****************************************
//  *      DEFINIR URL BASE DE LA API       *
//  *****************************************/
const API_BASE_URL = process.env.URL_BASE || 'http://localhost:3000';

// /********************************************/
router.get('/', async (req, res) => {
    try {
        const responseC = await axios.get(`${API_BASE_URL}/api/categorias`);
        const categorias = responseC.data;

        const responseP = await axios.get(`${API_BASE_URL}/api/productos`);
        const productos = responseP.data;

        const responseImagenes = await axios.get(`${API_BASE_URL}/api/imagenes-producto`);
        const imagenes = responseImagenes.data;

        res.render('pages/productos.ejs', {
            productos: productos,
            categorias: categorias,
            imagenes: imagenes,
            titulo: 'Publicaciones',
        });
    } catch (error) {
        console.error('Error al obtener los productos:', error.message);

        //Renderizar pagina de error
        res.status(500).render('Error al obtener los productos', {
            error: 'Error del servidor',
            message: 'No se pudieron cargar los productos. Verifica que el backend esté funcionando.',
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const responseP = await axios.get(`${API_BASE_URL}/api/productos/${req.params.id}`);
        const producto = responseP.data;

        const responseC = await axios.get(`${API_BASE_URL}/api/categorias`);
        const categorias = responseC.data;
        
        const responseEmprendimiento = await axios.get(`${API_BASE_URL}/api/emprendimientos/${producto.idEmprendimiento}`);
        const emprendimiento = responseEmprendimiento.data;
        
        const responseCategoriaP = await axios.get(`${API_BASE_URL}/api/categorias/producto/${producto.idProducto}`);
        const categoriaP = responseCategoriaP.data;
        
        const responseImagenes = await axios.get(`${API_BASE_URL}/api/imagenes-producto/${producto.idProducto}`);
        const imagenes = responseImagenes.data;
                
        const responseEtiquetas = await axios.get(`${API_BASE_URL}/api/etiquetas/${producto.idProducto}`);
        const etiquetas = responseEtiquetas.data;

        const responseRedSocial = await axios.get(`${API_BASE_URL}/api/redSocial/${emprendimiento.idEmprendimiento}`);
        const redSocial = responseRedSocial.data;
        res.render('pages/producto.ejs', {
            producto: producto,
            categorias: categorias,
            categoriaP: categoriaP,
            emprendimiento: emprendimiento, 
            imagenes: imagenes,
            etiquetas: etiquetas,
            redSocial: redSocial,
            titulo: 'Publicación',
        });
    } catch (error) {
        console.error('Error al obtener los productos:', error.message);

        //Renderizar pagina de error
        res.status(500).render('error', {
            error: 'Error del servidor',
            message: 'No se pudieron cargar los productos. Verifica que el backend esté funcionando.',
        });
    }
});

router.get('/usuario-productos/:id', async (req, res) => {
    console.log(req.params.id)
    try {
        const responseP = await axios.get(`${API_BASE_URL}/api/productos/usuarios/${req.params.id}`);
        const productos = responseP.data;

        const resU = await axios.get(`${API_BASE_URL}/api/usuarios/${req.params.id}`);
        const usuario = resU.data;
        console.log(productos)
        const responseC = await axios.get(`${API_BASE_URL}/api/categorias`);
        const categorias = responseC.data;
        

        res.render('pages/usuario-productos.ejs', {
            productos: productos,
            usuario: usuario,
            categorias: categorias,

            titulo: 'Lista productos',
        });
    } catch (error) {
        console.error('Error al obtener los productos:', error.message);

        //Renderizar pagina de error
        res.status(500).render('error', {
            error: 'Error del servidor',
            message: 'No se pudieron cargar los productos. Verifica que el backend esté funcionando.',
        });
    }
});

module.exports = router;
