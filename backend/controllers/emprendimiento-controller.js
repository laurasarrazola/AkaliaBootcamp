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
  const {
    idPersona,
    nombreEmprendimiento,
    descripcionNegocio,
    fechaRegistro,
    redes = {} // { facebook: 'https://...', instagram: 'https://...' }
  } = req.body;

  let imagenLogo = null;
  if (req.file) {
    imagenLogo = `http://localhost:3000/uploads/${req.file.filename}`; // o '/uploads/...' si prefieres relativo
  }

  const query = `
    INSERT INTO emprendimiento (
      idPersona,
      nombreEmprendimiento,
      imagenLogo,
      fechaRegistro,
      descripcionNegocio
    ) VALUES (?, ?, ?, ?, ?)
  `;

  const values = [
    idPersona,
    nombreEmprendimiento,
    imagenLogo,
    fechaRegistro || new Date()
      .toISOString()
      .split('T')[0], // en formato YYYY-MM-DD
    descripcionNegocio
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error al crear emprendimiento:', err);
      return res.status(500).json({ error: 'Error al crear el emprendimiento' });
    }

    const nuevoId = result.insertId;

    // Si no hay redes, termina aquí
    const redesEntries = Object.entries(redes).filter(([, url]) => url && url.trim() !== '');

    if (redesEntries.length === 0) {
      return res.status(201).json({ mensaje: 'Emprendimiento creado correctamente' });
    }

    // Insertar redes sociales
    const insertRedesPromises = redesEntries.map(([nombre, url]) => {
      return new Promise((resolve, reject) => {
        const insertQuery = `
          INSERT INTO redsocial (idEmprendimiento, nombreRedSocial, url)
          VALUES (?, ?, ?)
        `;
        db.query(insertQuery, [nuevoId, nombre, url], (err) => {
          if (err) return reject(err);
          resolve();
        });
      });
    });

    Promise.all(insertRedesPromises)
      .then(() => {
        res.redirect(`http://localhost:7001/usuario-emprendimientos/${idPersona}`);
      })
      .catch((err) => {
        console.error('Error al insertar redes sociales:', err);
        res.status(500).json({ error: 'Emprendimiento creado, pero hubo un error con las redes sociales' });
      });
  });
};


/************************************
 * ACTUALIZACIÓN DE EMPRENDIMIENTO
 ************************************/
const actualizarEmprendimiento = (req, res) => {
  const idUsuario = req.params.idUsuario;
  const id = req.params.idEmprendimiento;
  const {
    nombreEmprendimiento,
    descripcionNegocio,
    redes = {} // objeto: { facebook: "...", instagram: "...", ... }
  } = req.body;

  let imagenLogo = null;
  if (req.file) {
    imagenLogo = `http://localhost:3000/uploads/${req.file.filename}`;
  }

  const campos = [
    'nombreEmprendimiento = ?',
    imagenLogo ? 'imagenLogo = ?' : null,
    'descripcionNegocio = ?'
  ].filter(Boolean).join(', ');

  const values = [
    nombreEmprendimiento,
    ...(imagenLogo ? [imagenLogo] : []),
    descripcionNegocio,
    id
  ];

  const query = `UPDATE emprendimiento SET ${campos} WHERE idEmprendimiento = ?`;

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error al actualizar emprendimiento:', err);
      return res.status(500).json({ error: 'Error al actualizar emprendimiento' });
    }

    // Actualizar redes sociales
    const redesEntries = Object.entries(redes); // [ ['facebook', 'https://...'], ... ]

    const updateRedesPromises = redesEntries.map(([nombre, url]) => {
      return new Promise((resolve, reject) => {
        // Primero, verifica si ya existe esa red social para este emprendimiento
        const checkQuery = `
          SELECT * FROM redsocial WHERE idEmprendimiento = ? AND nombreRedSocial = ?
        `;
        db.query(checkQuery, [id, nombre], (err, rows) => {
          if (err) return reject(err);

          if (rows.length > 0) {
            // Actualizar si ya existe
            const updateQuery = `
              UPDATE redsocial SET url = ? WHERE idEmprendimiento = ? AND nombreRedSocial = ?
            `;
            db.query(updateQuery, [url, id, nombre], (err) => {
              if (err) return reject(err);
              resolve();
            });
          } else {
            // Insertar si no existe
            const insertQuery = `
              INSERT INTO redsocial (idEmprendimiento, nombreRedSocial, url) VALUES (?, ?, ?)
            `;
            db.query(insertQuery, [id, nombre, url], (err) => {
              if (err) return reject(err);
              resolve();
            });
          }
        });
      });
    });

    Promise.all(updateRedesPromises)
      .then(() => {
        res.redirect(`http://localhost:7001/usuario-emprendimientos/${idUsuario}`);
      })
      .catch((err) => {
        console.error('Error al actualizar redes sociales:', err);
        res.status(500).json({ error: 'Error al actualizar redes sociales' });
      });
  });
};


/************************************
 * ELIMINACIÓN DE EMPRENDIMIENTO
 ************************************/
const eliminarEmprendimiento = (req, res) => {
  const id = req.params.id;

  db.getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener conexión del db:', err);
      return res.status(500).json({ error: 'Error interno de base de datos' });
    }

    connection.beginTransaction(err => {
      if (err) {
        connection.release();
        console.error('Error al iniciar transacción:', err);
        return res.status(500).json({ error: 'Error al iniciar transacción' });
      }

      // 1. Eliminar redes sociales
      connection.query('DELETE FROM redSocial WHERE idEmprendimiento = ?', [id], (err) => {
        if (err) return connection.rollback(() => {
          connection.release();
          console.error('Error al eliminar las redes:', err);
          res.status(500).json({ error: 'Error al eliminar las redes' });
        });

        // 2. Eliminar emprendimiento
        connection.query('DELETE FROM emprendimiento WHERE idEmprendimiento = ?', [id], (err, result) => {
          if (err) return connection.rollback(() => {
            connection.release();
            console.error('Error al eliminar emprendimiento:', err);
            res.status(500).json({ error: 'Error al eliminar emprendimiento' });
          });

          if (result.affectedRows === 0) {
            connection.rollback(() => {
              connection.release();
              res.status(404).json({ mensaje: 'Emprendimiento no encontrado' });
            });
          } else {
            connection.commit(err => {
              if (err) {
                connection.rollback(() => {
                  connection.release();
                  console.error('Error al hacer commit:', err);
                  res.status(500).json({ error: 'Error al confirmar eliminación' });
                });
              } else {
                connection.release();
                res.status(200).json({ mensaje: 'Emprendimiento eliminado correctamente' });
              }
            });
          }
        });
      });
    });
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
