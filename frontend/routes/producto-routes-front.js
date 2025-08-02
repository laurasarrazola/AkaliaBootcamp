// IMPORTACION MODULOS
const express = require('express');
const { uploadImgs } = require('../../backend/libs/storage');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();
const FormData = require('form-data');
const fs = require('fs')

const API_BASE_URL = process.env.URL_BASE || 'http://localhost:3000'; //URL BASE DE LA API

// CONSULTAS A LA API
/** Obtener todos los productos **/
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
/** Obtener producto por id **/
router.get('/:id', async (req, res) => {
    try {
        const responseP = await axios.get(`${API_BASE_URL}/api/productos/${req.params.id}`);
        const producto = responseP.data;
        console.log(producto)
        const responseC = await axios.get(`${API_BASE_URL}/api/categorias`);
        const categorias = responseC.data;

        const responseEmprendimiento = await axios.get(`${API_BASE_URL}/api/emprendimientos/${producto.idEmprendimiento}`);
        const emprendimiento = responseEmprendimiento.data;

        const responseCategoriaP = await axios.get(`${API_BASE_URL}/api/categorias/producto/${producto.idProducto}`);
        const categoriaP = responseCategoriaP.data;
        console.log(categoriaP)

        const responseImagenes = await axios.get(`${API_BASE_URL}/api/imagenes-producto/${producto.idProducto}`);
        const imagenes = responseImagenes.data;
        console.log(imagenes)

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
/** Obtener todos los productos de usuario **/
router.get('/usuario-productos/:id', async (req, res) => {
    console.log(req.params.id)
    try {
        const responseP = await axios.get(`${API_BASE_URL}/api/productos/usuarios/${req.params.id}`)
        .catch(err => {
                console.warn('No se cargaron los productos', err.message);
                return { data: [] };
            });
        const productos = responseP.data;

        const resU = await axios.get(`${API_BASE_URL}/api/usuarios/${req.params.id}`);
        const usuario = resU.data;

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
/** Obtener detalle producto usuario **/
router.get('/usuario-productos/:idUsuario/detalle/:idProducto', async (req, res) => {

    try {
        const resU = await axios.get(`${API_BASE_URL}/api/usuarios/${req.params.idUsuario}`);
        const usuario = resU.data;

        const responseP = await axios
            .get(`${API_BASE_URL}/api/productos/${req.params.idProducto}`)
            .catch(err => {
                console.warn('No se cargaron los productos', err.message);
                return { data: [] };
            })
            const producto = responseP.data;

        const responseC = await axios.get(`${API_BASE_URL}/api/categorias`);
        const categorias = responseC.data;

        const responseEmprendimiento = await axios.get(`${API_BASE_URL}/api/emprendimientos/${producto.idEmprendimiento}`)
        .catch(err => {
                console.warn('No se cargaron los emprendimientos', err.message);
                return { data: [] };
            });
        const emprendimiento = responseEmprendimiento.data;

        const responseCategoriaP = await axios.get(`${API_BASE_URL}/api/categorias/producto/${producto.idProducto}`)
        .catch(err => {
                console.warn('No se cargaron las categorias', err.message);
                return { data: [] };
            });
        const categoriaP = responseCategoriaP.data;

        const responseImagenes = await axios.get(`${API_BASE_URL}/api/imagenes-producto/${producto.idProducto}`);
        const imagenes = responseImagenes.data;

        const responseEtiquetas = await axios
            .get(`${API_BASE_URL}/api/etiquetas/producto/${producto.idProducto}`)
            .catch(err => {
                console.warn('No se cargaron etiquetas', err.message);
                return { data: [] };
            })
        const etiquetas = responseEtiquetas.data;

        const responseRedSocial = await axios.get(`${API_BASE_URL}/api/redSocial/${emprendimiento.idEmprendimiento}`);
        const redSocial = responseRedSocial.data;
        res.render('pages/usuario-producto.ejs', {
            producto: producto,
            usuario: usuario,
            categorias: categorias,
            categoriaP: categoriaP,
            emprendimiento: emprendimiento,
            imagenes: imagenes,
            etiquetas: etiquetas,
            redSocial: redSocial,
            titulo: 'Publicación',
        });
    } catch (error) {
        console.error('Error al obtener el producto:', error.message);

        //Renderizar pagina de error
        res.status(500).render('error', {
            error: 'Error del servidor',
            message: 'No se pudieron cargar los productos. Verifica que el backend esté funcionando.',
        });
    }
});

/** Ruta get producto usuario**/

router.get("/usuario-productos/:idUsuario/editar/:idProducto", async (req, res) => {
    try {
        const responseP = await axios.get(`${API_BASE_URL}/api/productos/${req.params.idProducto}`);
        const producto = responseP.data;
        console.log(producto)
        const resU = await axios.get(`${API_BASE_URL}/api/usuarios/${req.params.idUsuario}`);
        const usuario = resU.data;

        const responseEmprendimiento = await axios.get(`${API_BASE_URL}/api/emprendimientos/usuario/${usuario.idPersona}`);
        const emprendimientos = responseEmprendimiento.data;

        const responseCategoria = await axios.get(`${API_BASE_URL}/api/categorias`);
        const categorias = responseCategoria.data;

        const responseImagenes = await axios.get(`${API_BASE_URL}/api/imagenes-producto/${producto.idProducto}`);
        const imagenes = responseImagenes.data;

        const responseEtiquetas = await axios.get(`${API_BASE_URL}/api/etiquetas`);
        const etiquetas = responseEtiquetas.data;

        const resCategoriasSeleccionadas = await axios.get(`${API_BASE_URL}/api/categorias/producto/${producto.idProducto}`);
        const categoriasSeleccionadas  = resCategoriasSeleccionadas.data.map(cat => cat.idCategoria);
        
        const resEtiquetasSeleccionadas  = await axios
        .get(`${API_BASE_URL}/api/etiquetas/producto/${producto.idProducto}`)
        .catch(err => {
            console.warn('No se cargaron etiquetas', err.message);
            return { data: [] };
        })
        const etiquetasSeleccionadas  = resEtiquetasSeleccionadas.data.map(et => et.idEtiqueta);
        console.log(etiquetasSeleccionadas)

        return res.status(200).render("pages/usuario-editar-producto", {
            producto: producto,
            usuario: usuario,
            categorias: categorias,
            emprendimientos: emprendimientos,
            imagenes: imagenes,
            etiquetas: etiquetas,
            etiquetasSeleccionadas: etiquetasSeleccionadas,
            categoriasSeleccionadas:categoriasSeleccionadas,
            title: "Editar Producto"
        });
    } catch (error) {
        console.error("Error al obtener producto para editar:", error.message);
        return res.status(500).render("pages/error", {
            error: 'Error del servidor',
            message: 'No se pudo cargar la vista de edición de poducto.',
        });
    }
});


/** Ruta get crear producto**/

router.get("/usuario-productos/:idUsuario/crear", async (req, res) => {
    try {
        const resU = await axios.get(`${API_BASE_URL}/api/usuarios/${req.params.idUsuario}`);
        const usuario = resU.data;

        const responseEmprendimiento = await axios.get(`${API_BASE_URL}/api/emprendimientos/usuario/${usuario.idPersona}`);
        const emprendimientos = responseEmprendimiento.data;

        const responseCategoria = await axios.get(`${API_BASE_URL}/api/categorias`);
        const categorias = responseCategoria.data;


        const responseEtiquetas = await axios.get(`${API_BASE_URL}/api/etiquetas`);
        const etiquetas = responseEtiquetas.data;

        return res.status(200).render("pages/usuario-crear-producto", {
            usuario: usuario,
            categorias: categorias,
            emprendimientos: emprendimientos,
            etiquetas: etiquetas,
            title: "Crear Producto"
        });
    } catch (error) {
        console.error("Error al obtener formulario:", error.message);
        return res.status(500).render("pages/error", {
            error: 'Error del servidor',
            message: 'No se pudo cargar la vista de creacion de poducto.',
        });
    }
});
module.exports = router;
