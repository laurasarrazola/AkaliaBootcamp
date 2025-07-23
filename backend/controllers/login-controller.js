
const db = require('../db'); // o tu modelo

const loginUsuario = async (req, res) => {
  const { email, contrasena } = req.body;
  console.log(req);
  const sql = 'SELECT * FROM usuario WHERE email = ? AND contrasena = ?';

  db.query(sql, [email, contrasena], (err, results) => {
    if (err) {
      console.error('Error al consultar la base de datos:', err);
      return res.status(500).json({ mensaje: 'Error del servidor' });
    }

    if (results.length === 0) {
      return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }

    // Puedes quitar la contraseña antes de enviar la respuesta
    const usuario = results[0];
    delete usuario.contrasena;

    res.status(200).json(usuario);
  });
};

module.exports = { loginUsuario };
