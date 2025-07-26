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
 * CONSULTA EMPRENDIMIENTO POR ID USUARIO
 ************************************/
const obtenerEmprendimientoPorIdUsuario = (req, res) => {
  const idUsuario = req.params.id;
  console.log('Consultando emprendimiento para el request con ID:', req.params);
  console.log('Consultando emprendimientos para el usuario con ID:', idUsuario);
  db.query(`
    SELECT e.* 
    FROM emprendimiento e
    JOIN usuario u ON e.idPersona = u.idPersona
    WHERE u.idPersona = ?
  `, [idUsuario], (err, results) => {
    if (err) {
      console.error('Error al buscar emprendimientos:', err);
      return res.status(500).json({ error: 'Error en la base de datos' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Emprendimientos no encontrado' });
    }
    res.status(200).json(results);
  });
};
/************************************
 * CONSULTA EMPRENDIMIENTO CON REDES SOCIALES
 ************************************/
const obtenerEmprendimientosConRedes = (req, res) => {
  const idUsuario = req.params.id;
  const query = `
  SELECT 
  e.idEmprendimiento,
  e.nombreEmprendimiento,
  e.imagenLogo,
  e.descripcionNegocio,
  e.fechaRegistro,
  rs.idRedSocial,
  rs.nombreRedSocial,
  rs.url
  FROM usuario u
  JOIN emprendimiento e ON e.idPersona = u.idPersona
  LEFT JOIN redsocial rs ON rs.idEmprendimiento = e.idEmprendimiento
  WHERE u.idPersona = ?
  `;
  
  db.query(query, [idUsuario], (err, results) => {
    if (err) {
      console.error("Error al obtener emprendimientos:", err);
      return res.status(500).json({ error: "Error al obtener datos" });
    }
    
    // Agrupar emprendimientos con sus redes sociales
    const emprendimientosMap = {};
    
    results.forEach(row => {
      const {
        idEmprendimiento,
        nombreEmprendimiento,
        imagenLogo,
        descripcionNegocio,
        fechaRegistro,
        idRedSocial,
        nombreRedSocial,
        url
      } = row;
      
      if (!emprendimientosMap[idEmprendimiento]) {
        emprendimientosMap[idEmprendimiento] = {
          idEmprendimiento,
          nombreEmprendimiento,
          imagenLogo,
          descripcionNegocio,
          fechaRegistro,
          redesSociales: []
        };
      }
      
      if (idRedSocial) {
        emprendimientosMap[idEmprendimiento].redesSociales.push(
          {
          idRedSocial,
          nombreRedSocial,
          url
        });
      }
    });
    const emprendimientos = Object.values(emprendimientosMap);
    res.json(emprendimientos);
  });
};


/************************************
 * INSERCIÓN NUEVO EMPRENDIMIENTO
 ************************************/
const crearEmprendimiento = (req, res) => {
  const { idPersona, nombreEmprendimiento, imagenLogo, fechaRegistro, descripcionNegocio } = req.body;

  if (!idPersona || !nombreEmprendimiento || !descripcionNegocio) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  const query = `
    INSERT INTO emprendimiento 
    (idPersona, nombreEmprendimiento, imagenLogo, descripcionNegocio) 
    VALUES (?, ?, ?, ?)
  `;
  const values = [idPersona, nombreEmprendimiento, imagenLogo || null, descripcionNegocio];

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
  const { idPersona, nombreEmprendimiento, imagenLogo, fechaRegistro, descripcionNegocio } = req.body;

  const query = `
    UPDATE emprendimiento SET 
      idPersona = ?,
      nombreEmprendimiento = ?, 
      imagenLogo = ?, 
      fechaRegistro = ?, 
      descripcionNegocio = ?
    WHERE idEmprendimiento = ?
  `;
  const values = [idPersona, nombreEmprendimiento, imagenLogo, fechaRegistro, descripcionNegocio, id];

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
  eliminarEmprendimiento,
  obtenerEmprendimientoPorIdUsuario,
  obtenerEmprendimientosConRedes
};
