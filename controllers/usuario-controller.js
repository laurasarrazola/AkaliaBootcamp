const db = require('../db');

/************************************
 *    CONSULTA TODOS LOS USUARIOS
 ************************************/
const obtenerUsuarios = (req, res) => {
  db.query('SELECT * FROM usuario', (err, results) => {
    if (err) {
      console.error('Error al consultar usuarios:', err);
      return res.status(500).json({ error: 'Error en la base de datos' });
    }
    res.status(200).json(results);
  });
};

/************************************
 *     CONSULTA USUARIO POR ID
 ************************************/
const obtenerUsuarioPorId = (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM usuario WHERE idPersona = ?', [id], (err, results) => {
    if (err) {
      console.error('Error al buscar usuario:', err);
      return res.status(500).json({ error: 'Error en la base de datos' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json(results[0]);
  });
};

/************************************
 *     INSERCIÓN NUEVO USUARIO
 ************************************/
const crearUsuario = (req, res) => {
  const { idRol, nombreUsuario, apellidoUsuario, email, contrasena, telefono } = req.body;

  if (!nombreUsuario || !apellidoUsuario || !email || !contrasena) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  const query = `INSERT INTO usuario (idRol, nombreUsuario, apellidoUsuario, email, contrasena, telefono) VALUES (?, ?, ?, ?, ?, ?)`;
  const values = [idRol || null, nombreUsuario, apellidoUsuario, email, contrasena, telefono || null];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error al insertar usuario:', err);
      return res.status(500).json({ error: 'Error al insertar usuario' });
    }
    res.status(201).json({ mensaje: 'Usuario creado correctamente', idInsertado: result.insertId });
  });
};

/************************************
 *     ACTUALIZACIÓN DE USUARIO
 ************************************/
const actualizarUsuario = (req, res) => {
  const id = req.params.id;
  const { nombreUsuario, apellidoUsuario, email, contrasena, telefono } = req.body;

  const query = `
    UPDATE usuario SET 
      nombreUsuario = ?, 
      apellidoUsuario = ?, 
      email = ?, 
      contrasena = ?, 
      telefono = ?
    WHERE idPersona = ?
  `;
  const values = [nombreUsuario, apellidoUsuario, email, contrasena, telefono, id];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error al actualizar usuario:', err);
      return res.status(500).json({ error: 'Error al actualizar usuario' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.status(200).json({ mensaje: 'Usuario actualizado correctamente' });
  });
};

/************************************
 *      ELIMINACIÓN DE USUARIO
 ************************************/
const eliminarUsuario = (req, res) => {
  const id = req.params.id;

  db.query('DELETE FROM usuario WHERE idPersona = ?', [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar usuario:', err);
      return res.status(500).json({ error: 'Error al eliminar usuario' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.status(200).json({ mensaje: 'Usuario eliminado correctamente' });
  });
};

module.exports = {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario
};