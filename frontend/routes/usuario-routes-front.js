/*****************************************
 *           IMPORTAR MÓDULOS            *
 *****************************************/
const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

/*****************************************
 *      DEFINIR URL BASE DE LA API       *
 *****************************************/
const API_BASE_URL = process.env.URL_BASE || 'http://localhost:3000';


/*****************************************
 *          RUTA REGISTRO USUARIO        *
 *****************************************/
router.post("/registro", async (req, res) => {
  const { nombreUsuario, apellidoUsuario, email, contrasena, telefono } = req.body;

  console.log("Datos recibidos en /registro:", req.body);


  try {
    const response = await axios.post(`${API_BASE_URL}/api/usuarios`, {
      nombreUsuario,
      apellidoUsuario,
      email,
      contrasena,
      telefono: telefono || null,
    });

    // redirigir a index después del registro
    res.redirect("/");
  } catch (error) {
    console.error("Error al registrar usuario:", error.toJSON?.() || error);
    res.status(500).render("pages/index", {
      title: "Crear cuenta",
      error: "No se pudo crear la cuenta. Intenta de nuevo.",
    });
  }
});

/*****************************************
 *             RUTA GET LOGIN            *
 *****************************************/
router.get("/login", (req, res) => {
  res.render("pages/login", { title: "Iniciar Sesión" });
});

/*****************************************
 *            RUTA POST LOGIN            *
 *****************************************/
router.post("/login", async (req, res) => {
  const { email, contrasena } = req.body;

  try {
    const response = await axios.post(`${API_BASE_URL}/api/login`, {
      email,
      contrasena,
    });

    const usuario = response.data;

    if (!usuario) {
      return res.status(401).render("pages/index", {
        title: "Iniciar Sesión",
        error: "Usuario no encontrado",
      });
    }

    return res.status(200).json(usuario);

  } catch (error) {
    console.error("Error al iniciar sesión:", error.toJSON?.() || error);

    // En lugar de lanzar error 500, vuelve al login con mensaje
    return res.status(401).render("pages/index", {
      title: "Iniciar Sesión",
      error: "Credenciales incorrectas o error del servidor",
    });
  }
});

/*****************************************
 *          RUTA GET USUARIOS            *
 *****************************************/
//Listar usuario
router.get('/usuarios', async (req, res) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/usuarios`);
    const usuarios = response.data;

    return res.render('pages/usuarios', {
      usuarios: usuarios,
      titulo: 'Usuarios',
    });
  } catch (error) {
    console.error('Error al obtener los usuarios:', error.message);

    // Renderizar pagina de error
    return res.status(500).render('Error al obtener los usuarios', {
      error: 'Error del servidor',
      message: 'No se pudieron cargar los usuarios. Verifica que el backend esté funcionando.',
    });
  }
});

router.get("/usuario-perfil/:id", async (req, res) => {
  try {
    const usuario = await axios.get(`${API_BASE_URL}/api/usuarios/${req.params.id}`);
    console.log("Usuario obtenido:", usuario.data);
    return res.status(200).render("pages/usuario-perfil", {
      usuario: usuario.data,
    });
  } catch (error) {
    console.error('Error al obtener el perfil del usuario:', error.message);
    return res.status(500).render("pages/error", {
      error: 'Error del servidor',
      message: 'No se pudo obtener el perfil del usuario. Inténtalo de nuevo más tarde.',
    });
  }
});

module.exports = router;
