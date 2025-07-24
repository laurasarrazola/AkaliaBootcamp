const express = require('express');
const router = express.Router();
require('dotenv').config();

router.get('/', async (req, res) => {
    try {
        res.render('pages/contactanos', { title: 'Contactanos' });
    } catch (error) {
        console.error('Error: ', error.message);

        //Renderizar pagina de error
        res.status(500).render('Error ', {
            error: 'Error del servidor',
            message: 'No se pudo cargar pagina de contacto. Verifica que el backend esté funcionando.',
        });
    }
});

module.exports = router;
