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

module.exports = {
  obtenerCategorias,
  obtenerCategoriaPorId
};
