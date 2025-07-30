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

// Obtener emprendimientos del usuario
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

//Crear ruta get que renderice el formulario de creacion
router.get('/usuario-agregar-emprendimiento/:id', async (req, res) => {
  try {
    const idUsuario = req.params.id;

    // Obtener datos del usuario para pasarlos a la vista
    const resU = await axios.get(`${API_BASE_URL}/api/usuarios/${idUsuario}`);
    const usuario = resU.data;

    const redesDisponibles = ['whatsapp','instagram','facebook'];

    res.render('pages/usuario-agregar-emprendimiento.ejs', {
      idPersona: usuario.idPersona,
      usuario:usuario,
      redesDisponibles,
      titulo: 'Agregar nuevo emprendimiento',
    });
  } catch (error) {
    console.error('Error al cargar el formulario:', error.message);
    res.status(500).render('error', {
      error: 'Error del servidor',
      message: 'No se pudo cargar el formulario de nuevo emprendimiento.'
    });
  }
});

// Ruta POST para recibir el formulario y reenviar al backend
router.post('/usuario-agregar-emprendimiento', async (req, res) => {
  try {
    const { idPersona, nombreEmprendimiento, imagenLogo, descripcionNegocio } = req.body;
    
    const payload = {
      idPersona,
      nombreEmprendimiento,
      imagenLogo,
      descripcionNegocio,
      fechaRegistro: new Date().toISOString().split('T')[0]
    };

    // Enviar al backend real (puerto 3000)
    await axios.post(`${API_BASE_URL}/api/emprendimientos`, payload);

    // Redirigir al listado de emprendimientos del usuario
    res.redirect(`/usuario-emprendimientos/${idPersona}`);
  } catch (error) {
    console.error('Error al crear emprendimiento:', error.message);
    res.status(500).render('error', {
      error: 'Error al crear emprendimiento',
      message: 'No se pudo guardar el emprendimiento. Verifica los datos o intenta más tarde.'
    });
  }
});


//renderizar el formulario de edición de emprendimientos
router.get('/usuario-emprendimientos/:idUsuario/editar/:idEmprendimiento', async (req, res) => {
  try {
    const idUsuario = req.params.idUsuario;
    const idEmprendimiento = req.params.idEmprendimiento;

    const response = await axios.get(`${API_BASE_URL}/api/emprendimientos/${idEmprendimiento}`);
    const emprendimiento = response.data;
    console.log(emprendimiento)
    const resU = await axios.get(`${API_BASE_URL}/api/usuarios/${idUsuario}`);
    const usuario = resU.data;

    const responseRedSocial = await axios.get(`${API_BASE_URL}/api/redSocial/${emprendimiento.idEmprendimiento}`);
    const redSocial = responseRedSocial.data;

    const redesDisponibles = ['whatsapp','instagram','facebook'];
    res.render('pages/usuario-editar-emprendimiento.ejs', {
      emprendimiento,
      usuario,
      redSocial,
      redesDisponibles,
      titulo: 'Editar Emprendimiento'
    });
  } catch (error) {
    console.error('Error al cargar emprendimiento para edición:', error.message);
    res.status(500).render('error', {
      error: 'Error del servidor',
      message: 'No se pudo cargar el emprendimiento para editar.'
    });
  }
});

router.delete('/usuario-eliminar-emprendimiento/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await axios.delete(`${API_BASE_URL}/api/emprendimientos/${id}`);
    res.status(200).send("Emprendimiento eliminado");
  } catch (error) {
    console.error("Error al eliminar:", error.message);
    res.status(500).send("Error al eliminar emprendimiento");
  }
});


module.exports = router;