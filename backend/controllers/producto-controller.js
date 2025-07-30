const db = require('../db');

/************************************
 *   CONSULTA TODOS LOS PRODUCTOS
 ************************************/
const obtenerProductos = (req, res) => {
  db.query('SELECT * FROM producto', (err, results) => {
    if (err) {
      console.error('Error al consultar productos:', err);
      return res.status(500).json({ error: 'Error en la base de datos' });
    }
    res.status(200).json(results);
  });
};

/************************************
 *     CONSULTA PRODUCTO POR ID
 ************************************/
const obtenerProductoPorId = (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM producto WHERE idProducto = ?', [id], (err, results) => {
    if (err) {
      console.error('Error al buscar producto:', err);
      return res.status(500).json({ error: 'Error en la base de datos' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.status(200).json(results[0]);
  });
};

/************************************
 * CONSULTA TODOS LOS PRODUCTOS POR ID USUARIO
 ************************************/
const obtenerProductosConUsuarios = (req, res) => {
  const idUsuario = req.params.id;
  const query = `
SELECT 
  e.idEmprendimiento,
  e.nombreEmprendimiento,
  p.idProducto,
  p.tituloProducto,
  p.descripcionProducto,
  p.precio,
  p.fechaPublicacion,
  (
    SELECT i.urlImagen
    FROM imagenproducto i
    WHERE i.idProducto = p.idProducto
    LIMIT 1
  ) AS urlImagen
FROM usuario u
JOIN emprendimiento e ON e.idPersona = u.idPersona
JOIN producto p ON p.idEmprendimiento = e.idEmprendimiento
WHERE u.idPersona = ?;
  `;

  db.query(query, [idUsuario], (err, results) => {
    if (err) {
      console.error("Error al obtener productos:", err);
      return res.status(500).json({ error: "Error al obtener datos" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'No se encontraron categorías para este producto' });
    }

    res.json(results);
  });
};

/************************************
 *     INSERCIÓN NUEVO PRODUCTO
 ************************************/
const crearProducto = (req, res) => {
  const idUsuario = req.params.idUsuario;
  const {
    idEmprendimiento,
    tituloProducto,
    descripcionProducto,
    precio,
    categorias,    // array de idCategoria
    etiquetas,     // array de idEtiqueta
    // array de urlImagen
  } = req.body;

  const imagenes = (req.files && Array.isArray(req.files['imagenes'])) ? req.files['imagenes'] : [];
  const hayImagenesNuevas = imagenes.length > 0;

  db.getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener conexión del db:', err);
      return res.status(500).json({ error: 'Error interno de base de datos' });
    }
    connection.beginTransaction(err => {
      if (err) {
        console.error('Error iniciando transacción:', err);
        return res.status(500).json({ error: 'Error interno' });
      }

      // 1. Insertar producto
      const queryInsert = `
    INSERT INTO producto (tituloProducto, descripcionProducto, precio, idEmprendimiento)
    VALUES (?, ?, ?, ?)
    `;

      connection.query(queryInsert, [tituloProducto, descripcionProducto, precio, idEmprendimiento], (err, result) => {
        if (err) return connection.rollback(() => {
          console.error('Error al insertar producto:', err);
          res.status(500).json({ error: 'No se pudo publicar el producto' });
        });

        const idProducto = result.insertId;

        let categorias = req.body.categorias || [];
        let etiquetas = req.body.etiquetas || [];

        // 2. Insertar relaciones
        const imagenes = (req.files && Array.isArray(req.files['imagenes'])) ? req.files['imagenes'] : [];
        const inserts = [];

        // Categorías
        if (Array.isArray(categorias)) {
          categorias.forEach(idCategoria => {
            inserts.push(['INSERT INTO productocategoria (idProducto, idCategoria) VALUES (?, ?)', [idProducto, idCategoria]]);
          });
        }

        // Etiquetas
        if (Array.isArray(etiquetas)) {
          etiquetas.forEach(idEtiqueta => {
            inserts.push(['INSERT INTO productoetiqueta (idProducto, idEtiqueta) VALUES (?, ?)', [idProducto, idEtiqueta]]);
          });
        }

        // Imágenes
        imagenes.forEach(file => {
          const url = 'http://localhost:3000/uploads/' + file.filename;
          inserts.push(['INSERT INTO imagenproducto (idProducto, urlImagen) VALUES (?, ?)', [idProducto, url]]);
        });

        // Ejecutar inserts
        const ejecutarInserts = (i = 0) => {
          if (i >= inserts.length) {
            return connection.commit(err => {
              if (err) return connection.rollback(() => {
                console.error('Error al confirmar transacción:', err);
                res.status(500).json({ error: 'Error al confirmar publicación' });
              });

              res.redirect(`http://localhost:7001/productos/usuario-productos/${idUsuario}/detalle/${idProducto}`);

            });
          }

          const [sql, params] = inserts[i];
          connection.query(sql, params, (err) => {
            if (err) return connection.rollback(() => {
              console.error('Error al insertar relación:', err);
              res.status(500).json({ error: 'Error al registrar relaciones del producto' });
            });

            ejecutarInserts(i + 1);
          });
        };

        ejecutarInserts();
      });
    });
  });
}
/************************************
 *     ACTUALIZACIÓN DE PRODUCTO
 ************************************/
const actualizarProducto = (req, res) => {
  const idProducto = req.params.idProducto;
  const idUsuario = req.params.idUsuario;
  const {
    idEmprendimiento,
    tituloProducto,
    descripcionProducto,
    precio,
    categorias,    // array de idCategoria
    etiquetas,     // array de idEtiqueta
    // array de urlImagen
  } = req.body;

  const imagenes = (req.files && Array.isArray(req.files['imagenes'])) ? req.files['imagenes'] : [];
  const hayImagenesNuevas = imagenes.length > 0;

  db.getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener conexión del db:', err);
      return res.status(500).json({ error: 'Error interno de base de datos' });
    }
    connection.beginTransaction(err => {
      if (err) {
        console.error('Error iniciando transacción:', err);
        return res.status(500).json({ error: 'Error interno' });
      }

      // 1. Actualizar producto
      const queryUpdate = `
      UPDATE producto 
      SET idEmprendimiento = ?, tituloProducto = ?, descripcionProducto = ?, precio = ? 
      WHERE idProducto = ?
    `;

      connection.query(queryUpdate, [idEmprendimiento, tituloProducto, descripcionProducto, precio, idProducto], (err, result) => {
        if (err) return connection.rollback(() => {
          console.error('Error al actualizar producto:', err);
          res.status(500).json({ error: 'Error al actualizar producto' });
        });

        // 2. Eliminar relaciones antiguas
        const deletes = [
          ['DELETE FROM productocategoria WHERE idProducto = ?', [idProducto]],
          ['DELETE FROM productoetiqueta WHERE idProducto = ?', [idProducto]],
        ];

        if (hayImagenesNuevas) {
          deletes.push(['DELETE FROM imagenproducto WHERE idProducto = ?', [idProducto]]);
        }

        const ejecutarDeletes = (i = 0) => {
          if (i >= deletes.length) return insertarRelaciones();
          const [sql, params] = deletes[i];
          connection.query(sql, params, (err) => {
            if (err) return connection.rollback(() => {
              console.error(`Error al eliminar en paso ${i + 1}:`, err);
              res.status(500).json({ error: 'Error al limpiar relaciones del producto' });
            });
            ejecutarDeletes(i + 1);
          });
        };

        // 3. Insertar nuevas relaciones

        const insertarRelaciones = () => {
          const inserts = [];
          console.log(categorias, etiquetas)

          let etiquetasFinal = [];

          if (typeof etiquetas === "string") {
            try {
              etiquetasFinal = JSON.parse(etiquetas);
            } catch (e) {
              console.error("Error al parsear etiquetas:", e);
            }
          } else if (Array.isArray(etiquetas)) {
            etiquetasFinal = etiquetas;
          }
          console.log(etiquetasFinal)
          // Categorías
          if (Array.isArray(categorias)) {
            categorias.forEach(idCategoria => {
              inserts.push(['INSERT INTO productocategoria (idProducto, idCategoria) VALUES (?, ?)', [idProducto, idCategoria]]);
            });
          }

          // Etiquetas
          if (Array.isArray(etiquetasFinal)) {
            etiquetasFinal.forEach(idEtiqueta => {
              inserts.push(['INSERT INTO productoetiqueta (idProducto, idEtiqueta) VALUES (?, ?)', [idProducto, idEtiqueta]]);
            });
          }

          // Imágenes
          imagenes.forEach(file => {
            const url = 'http://localhost:3000/uploads/' + file.filename;
            inserts.push(['INSERT INTO imagenproducto (idProducto, urlImagen) VALUES (?, ?)', [idProducto, url]]);
          });

          const ejecutarInserts = (i = 0) => {
            if (i >= inserts.length) {
              return connection.commit(err => {
                if (err) return connection.rollback(() => {
                  console.error('Error al confirmar la transacción:', err);
                  res.status(500).json({ error: 'Error al guardar producto' });
                });
                res.redirect(`http://localhost:7001/productos/usuario-productos/${idUsuario}/detalle/${idProducto}`);
              });
            }

            const [sql, params] = inserts[i];
            connection.query(sql, params, (err) => {
              if (err) return connection.rollback(() => {
                console.error('Error al insertar relaciones:', err);
                res.status(500).json({ error: 'Error al guardar relaciones del producto' });
              });

              ejecutarInserts(i + 1);
            });
          };

          ejecutarInserts();
        };

        ejecutarDeletes();
      });
    });
  });
};


/************************************
 *     ELIMINACIÓN DE PRODUCTO
 ************************************/
const eliminarProducto = (req, res) => {
  const idProducto = req.params.id;

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

      // 1. Eliminar imágenes
      connection.query('DELETE FROM imagenproducto WHERE idProducto = ?', [idProducto], (err) => {
        if (err) return connection.rollback(() => {
          connection.release();
          console.error('Error al eliminar imágenes:', err);
          res.status(500).json({ error: 'Error al eliminar imágenes' });
        });

        // 2. Eliminar relaciones con categorías
        connection.query('DELETE FROM productocategoria WHERE idProducto = ?', [idProducto], (err) => {
          if (err) return connection.rollback(() => {
            connection.release();
            console.error('Error al eliminar categorías:', err);
            res.status(500).json({ error: 'Error al eliminar categorías' });
          });

          // 3. Eliminar relaciones con etiquetas
          connection.query('DELETE FROM productoetiqueta WHERE idProducto = ?', [idProducto], (err) => {
            if (err) return connection.rollback(() => {
              connection.release();
              console.error('Error al eliminar etiquetas:', err);
              res.status(500).json({ error: 'Error al eliminar etiquetas' });
            });

            // 4. Eliminar el producto
            connection.query('DELETE FROM producto WHERE idProducto = ?', [idProducto], (err, result) => {
              if (err) return connection.rollback(() => {
                connection.release();
                console.error('Error al eliminar producto:', err);
                res.status(500).json({ error: 'Error al eliminar producto' });
              });

              if (result.affectedRows === 0) {
                return connection.rollback(() => {
                  connection.release();
                  res.status(404).json({ mensaje: 'Producto no encontrado' });
                });
              }

              connection.commit(err => {
                if (err) return connection.rollback(() => {
                  connection.release();
                  console.error('Error al confirmar transacción:', err);
                  res.status(500).json({ error: 'Error al confirmar eliminación' });
                });

                connection.release();
                res.status(200).json({ mensaje: 'Producto eliminado correctamente' });
              });
            });
          });
        });
      });
    });
  });
};



module.exports = {
  obtenerProductos,
  obtenerProductoPorId,
  obtenerProductosConUsuarios,
  crearProducto,
  actualizarProducto,
  eliminarProducto
};
