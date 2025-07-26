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
  const { tituloProducto, descripcionProducto, precio, idEmprendimiento } = req.body;

  if (!tituloProducto || !descripcionProducto || !precio || !idEmprendimiento) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  const query = `
    INSERT INTO producto (tituloProducto, descripcionProducto, precio, idEmprendimiento)
    VALUES (?, ?, ?, ?)
  `;
  const values = [tituloProducto, descripcionProducto, precio, idEmprendimiento];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error al insertar producto:', err);
      return res.status(500).json({ error: 'Error al insertar producto' });
    }
    res.status(201).json({ mensaje: 'Producto creado correctamente', idInsertado: result.insertId });
  });
};

/************************************
 *     ACTUALIZACIÓN DE PRODUCTO
 ************************************/
const actualizarProducto = (req, res) => {
  const id = req.params.id;
  const { tituloProducto, descripcionProducto, precio, idEmprendimiento } = req.body;

  const query = `
    UPDATE producto SET 
      tituloProducto = ?, 
      descripcionProducto = ?, 
      precio = ?, 
      idEmprendimiento = ?
    WHERE idProducto = ?
  `;
  const values = [tituloProducto, descripcionProducto, precio, idEmprendimiento, id];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error al actualizar producto:', err);
      return res.status(500).json({ error: 'Error al actualizar producto' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    res.status(200).json({ mensaje: 'Producto actualizado correctamente' });
  });
};

/************************************
 *     ELIMINACIÓN DE PRODUCTO
 ************************************/
const eliminarProducto = (req, res) => {
  const id = req.params.id;

  db.query('DELETE FROM producto WHERE idProducto = ?', [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar producto:', err);
      return res.status(500).json({ error: 'Error al eliminar producto' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    res.status(200).json({ mensaje: 'Producto eliminado correctamente' });
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
