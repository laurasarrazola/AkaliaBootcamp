const db = require('../db');

/* Como las categorías serán predefinidas y no modificables desde la interfaz, solo se necesita controladores para consultar. */

/************************************
 *    CONSULTA TODAS LAS CATEGORÍAS
 ************************************/
const obtenerCategorias = (req, res) => {
  db.query('SELECT * FROM categoria', (err, results) => {
    if (err) {
      console.error('Error al consultar categorías:', err);
      return res.status(500).json({ error: 'Error en la base de datos' });
    }
    res.status(200).json(results);
  });
};
/************************************
 *   CONSULTA CATEGORÍA POR ID
 ************************************/
const obtenerCategoriaPorId = (req, res) => {
  const id = req.params.id;

  db.query('SELECT * FROM categoria WHERE idCategoria = ?', [id], (err, results) => {
    if (err) {
      console.error('Error al buscar categoría:', err);
      return res.status(500).json({ error: 'Error en la base de datos' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    res.status(200).json(results[0]);
  });
};
/************************************
 *   CONSULTA CATEGORÍA POR ID PRODUCTO
 ************************************/
const obtenerCategoriasPorProducto = (req, res) => {
  const idProducto = req.params.id;
  console.log('Buscando categorías para producto con ID:', idProducto); 
  const query = `
    SELECT c.* 
    FROM categoria c
    JOIN productocategoria  cp ON c.idCategoria = cp.idCategoria
    WHERE cp.idProducto = ?
  `;

  db.query(query, [idProducto], (err, results) => {
    if (err) {
      console.error('Error al buscar categorías:', err);
      return res.status(500).json({ error: 'Error en la base de datos' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'No se encontraron categorías para este producto' });
    }

    res.status(200).json(results);
  });
};



module.exports = {
  obtenerCategorias,
  obtenerCategoriaPorId,
  obtenerCategoriasPorProducto
};
