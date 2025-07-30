const db = require('../db');

/************************************
 *    CONSULTA TODAS LAS REDES SOCIALES
 ************************************/
const obtenerRedesSociales = (req, res) => {
  db.query('SELECT * FROM redSocial', (err, results) => {
    if (err) {
      console.error('Error al consultar redes sociales:', err);
      return res.status(500).json({ error: 'Error en la base de datos' });
    }
    res.status(200).json(results);
  });
};

/************************************
 *    CONSULTA RED SOCIAL POR USUARIO
 ************************************/
const obtenerRedesSocialesPorUsuario = (req, res) => {
  const idUsuario = req.params.idUsuario;

  const query = `
    SELECT rs.* FROM redSocial rs
    JOIN emprendimiento e ON rs.idEmprendimiento = e.idEmprendimiento
    WHERE e.idUsuario = ?
  `;

  db.query(query, [idUsuario], (err, results) => {
    if (err) {
      console.error('Error al consultar redes sociales por usuario:', err);
      return res.status(500).json({ error: 'Error en la base de datos' });
    }

    res.status(200).json(results);
  });
};
/************************************
 *    CONSULTA RED SOCIAL POR EMPRENDIMIENTO
 ************************************/
const obtenerRedesSocialesPorEmprendimiento = (req, res) => {
  const idEmprendimiento = req.params.idEmprendimiento;
  db.query('SELECT * FROM redSocial WHERE idEmprendimiento = ?', [idEmprendimiento], (err, results) => {
    if (err) {
      console.error('Error al buscar red social:', err);
      return res.status(500).json({ error: 'Error en la base de datos' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Red social no encontrada' });
    }

    res.status(200).json(results);
  });
};


/************************************
 *    INSERCIÓN NUEVA RED SOCIAL
 ************************************/
const crearRedSocial = (req, res) => {
  const { idEmprendimiento, nombreRedSocial, url } = req.body;

  if (!idEmprendimiento || !nombreRedSocial || !url) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  const query = 'INSERT INTO redSocial (idEmprendimiento, nombreRedSocial, url) VALUES (?, ?, ?)';
  const values = [idEmprendimiento, nombreRedSocial, url];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error al insertar red social:', err);
      return res.status(500).json({ error: 'Error al insertar red social' });
    }
    res.status(201).json({ mensaje: 'Red social creada correctamente', idInsertado: result.insertId });
  });
};

/************************************
 *    ACTUALIZACIÓN DE RED SOCIAL
 ************************************/
const actualizarRedSocial = (req, res) => {
  const id = req.params.id;
  const { nombreRedSocial, url } = req.body;

  const query = `
    UPDATE redSocial SET 
      nombreRedSocial = ?, 
      url = ?
    WHERE idRedSocial = ?
  `;
  const values = [nombreRedSocial, url, id];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error al actualizar red social:', err);
      return res.status(500).json({ error: 'Error al actualizar red social' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Red social no encontrada' });
    }
    res.status(200).json({ mensaje: 'Red social actualizada correctamente' });
  });
};

/************************************
 *    ELIMINACIÓN DE RED SOCIAL
 ************************************/
const eliminarRedSocial = (req, res) => {
  const id = req.params.id;

  db.query('DELETE FROM redSocial WHERE idRedSocial = ?', [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar red social:', err);
      return res.status(500).json({ error: 'Error al eliminar red social' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Red social no encontrada' });
    }
    res.status(200).json({ mensaje: 'Red social eliminada correctamente' });
  });
};

module.exports = {
  obtenerRedesSociales,
  obtenerRedesSocialesPorUsuario,
  crearRedSocial,
  actualizarRedSocial,
  eliminarRedSocial,
  obtenerRedesSocialesPorEmprendimiento
};
