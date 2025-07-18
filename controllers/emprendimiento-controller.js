const db = require('../db');

/************************************
 * CONSULTA TODOS LOS EMPRENDIMIENTOS
 ************************************/
const obtenerEmprendimientos = (req, res) => {
  db.query('SELECT * FROM emprendimiento', (err, results) => {
    if (err) {
      console.error('Error al consultar emprendimientos:', err);
      return res.status(500).json({ error: 'Error en la base de datos' });
    }
    res.status(200).json(results);
  });
};

/************************************
 * CONSULTA EMPRENDIMIENTO POR ID
 ************************************/
const obtenerEmprendimientoPorId = (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM emprendimiento WHERE idEmprendimiento = ?', [id], (err, results) => {
    if (err) {
      console.error('Error al buscar emprendimiento:', err);
      return res.status(500).json({ error: 'Error en la base de datos' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Emprendimiento no encontrado' });
    }
    res.status(200).json(results[0]);
  });
};

/************************************
 * INSERCIÓN NUEVO EMPRENDIMIENTO
 ************************************/
const crearEmprendimiento = (req, res) => {
  const { nombreEmprendimiento, imagenLogo, fechaRegistro, descripcionNegocio } = req.body;

  if (!nombreEmprendimiento || !fechaRegistro || !descripcionNegocio) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  const query = `
    INSERT INTO emprendimiento 
    (nombreEmprendimiento, imagenLogo, fechaRegistro, descripcionNegocio) 
    VALUES (?, ?, ?, ?)
  `;
  const values = [nombreEmprendimiento, imagenLogo || null, fechaRegistro, descripcionNegocio];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error al insertar emprendimiento:', err);
      return res.status(500).json({ error: 'Error al insertar emprendimiento' });
    }
    res.status(201).json({ mensaje: 'Emprendimiento creado correctamente', idInsertado: result.insertId });
  });
};

/************************************
 * ACTUALIZACIÓN DE EMPRENDIMIENTO
 ************************************/
const actualizarEmprendimiento = (req, res) => {
  const id = req.params.id;
  const { nombreEmprendimiento, imagenLogo, fechaRegistro, descripcionNegocio } = req.body;

  const query = `
    UPDATE emprendimiento SET 
      nombreEmprendimiento = ?, 
      imagenLogo = ?, 
      fechaRegistro = ?, 
      descripcionNegocio = ?
    WHERE idEmprendimiento = ?
  `;
  const values = [nombreEmprendimiento, imagenLogo, fechaRegistro, descripcionNegocio, id];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error al actualizar emprendimiento:', err);
      return res.status(500).json({ error: 'Error al actualizar emprendimiento' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Emprendimiento no encontrado' });
    }
    res.status(200).json({ mensaje: 'Emprendimiento actualizado correctamente' });
  });
};

/************************************
 * ELIMINACIÓN DE EMPRENDIMIENTO
 ************************************/
const eliminarEmprendimiento = (req, res) => {
  const id = req.params.id;

  db.query('DELETE FROM emprendimiento WHERE idEmprendimiento = ?', [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar emprendimiento:', err);
      return res.status(500).json({ error: 'Error al eliminar emprendimiento' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Emprendimiento no encontrado' });
    }
    res.status(200).json({ mensaje: 'Emprendimiento eliminado correctamente' });
  });
};

module.exports = {
  obtenerEmprendimientos,
  obtenerEmprendimientoPorId,
  crearEmprendimiento,
  actualizarEmprendimiento,
  eliminarEmprendimiento
};
