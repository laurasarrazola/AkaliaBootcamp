/*****************************************
 *           IMPORTAR MÓDULOS            *
 *****************************************/
const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();
// /*****************************************
//  *      DEFINIR URL BASE DE LA API       *
//  *****************************************/
const API_BASE_URL = process.env.URL_BASE || 'http://localhost:3000';


router.get('/usuario-emprendimientos/:id', async (req, res) => {
    try {
        const resU = await axios.get(`${API_BASE_URL}/api/usuarios/${req.params.id}`);
        const usuario = resU.data;

        const responseC = await axios.get(`${API_BASE_URL}/api/categorias`);
        const categorias = responseC.data;

        const responseEmprendimiento = await axios.get(`${API_BASE_URL}/api/emprendimientos/redes/${req.params.id}`);
        const emprendimiento = responseEmprendimiento.data;
        
        res.render('pages/usuario-emprendimientos.ejs', {
            usuario: usuario,
            categorias: categorias,
            emprendimiento: emprendimiento, 
            
            titulo: 'Emprendimientos del Usuario',
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