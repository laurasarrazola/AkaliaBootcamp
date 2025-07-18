const db = require('../db');

/************************************
 * CONSULTA TODAS LAS IMÁGENES
 ************************************/
const obtenerImagenesProducto = (req, res) => {
  db.query('SELECT * FROM imagenProducto', (err, results) => {
    if (err) {
      console.error('Error al consultar imágenes:', err);
      return res.status(500).json({ error: 'Error en la base de datos' });
    }
    res.status(200).json(results);
  });
};

/************************************
 * CONSULTA IMÁGENES DE UN PRODUCTO
 ************************************/
const obtenerImagenesPorProducto = (req, res) => {
  const idProducto = req.params.id;
  db.query('SELECT * FROM imagenProducto WHERE idProducto = ?', [idProducto], (err, results) => {
    if (err) {
      console.error('Error al buscar imágenes:', err);
      return res.status(500).json({ error: 'Error en la base de datos' });
    }
    res.status(200).json(results);
  });
};

/************************************
 * INSERCIÓN NUEVA IMAGEN
 ************************************/
const crearImagenProducto = (req, res) => {
  const idProducto = req.params.productoId;
  const { urlImagen } = req.body;


  if (!idProducto || !urlImagen) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  const query = 'INSERT INTO imagenProducto (idProducto, urlImagen) VALUES (?, ?)';
  const values = [idProducto, urlImagen];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error al insertar imagen:', err);
      return res.status(500).json({ error: 'Error al insertar imagen' });
    }
    res.status(201).json({ mensaje: 'Imagen agregada correctamente', idInsertado: result.insertId });
  });
};

/************************************
 * ACTUALIZACIÓN DE IMAGEN
 ************************************/
const actualizarImagenProducto = (req, res) => {
  const id = req.params.id;
  const { idProducto, urlImagen } = req.body;

  const query = `
    UPDATE imagenProducto SET 
      idProducto = ?, 
      urlImagen = ?
    WHERE idImagenProducto = ?
  `;
  const values = [idProducto, urlImagen, id];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error al actualizar imagen:', err);
      return res.status(500).json({ error: 'Error al actualizar imagen' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Imagen no encontrada' });
    }
    res.status(200).json({ mensaje: 'Imagen actualizada correctamente' });
  });
};

/************************************
 * ELIMINACIÓN DE IMAGEN
 ************************************/
const eliminarImagenProducto = (req, res) => {
  const id = req.params.id;

  db.query('DELETE FROM imagenProducto WHERE idImagenProducto = ?', [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar imagen:', err);
      return res.status(500).json({ error: 'Error al eliminar imagen' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Imagen no encontrada' });
    }
    res.status(200).json({ mensaje: 'Imagen eliminada correctamente' });
  });
};

module.exports = {
  obtenerImagenesProducto,
  obtenerImagenesPorProducto,
  crearImagenProducto,
  actualizarImagenProducto,
  eliminarImagenProducto
};
