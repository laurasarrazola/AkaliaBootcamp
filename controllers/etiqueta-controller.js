const db = require('../db')

/* Como las etiquetas serán predefinidas y no modificables desde la interfaz,
   solo se necesita controladores para consultar. */

/************************************
 *    CONSULTA TODAS LAS ETIQUETAS
 ************************************/
const obtenerEtiquetas = (req, res) => {
  db.query('SELECT * FROM etiqueta', (err, results) => {
    if (err) {
      console.error('Error al consultar etiquetas:', err);
      return res.status(500).json({ error: 'Error en la base de datos' });
    }
    res.status(200).json(results);
  });
};

/************************************
 *   CONSULTA ETIQUETA POR ID
 ************************************/
const obtenerEtiquetaPorId = (req, res) => {
  const id = req.params.id;

  db.query('SELECT * FROM etiqueta WHERE idEtiqueta = ?', [id], (err, results) => {
    if (err) {
      console.error('Error al buscar etiqueta:', err);
      return res.status(500).json({ error: 'Error en la base de datos' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Etiqueta no encontrada' });
    }

    res.status(200).json(results[0]);
  });
};

module.exports = {
  obtenerEtiquetas,
  obtenerEtiquetaPorId
};
