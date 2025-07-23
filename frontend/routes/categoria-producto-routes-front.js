/******************************
 *      IMPORTAR MÓDULOS      *
 ******************************/
const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

/*******************************
 * DEFINIR URL BASE DE LA API  *
 *******************************/
const API_BASE_URL = process.env.URL_BASE || 'http://localhost:3000';

/************************************
 * RUTA PRINCIPAL - CARGA DE INICIO *
 *  Obtiene categorías y productos  *
 ************************************/
router.get('/', async (req, res) => {
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
});

module.exports = router;
