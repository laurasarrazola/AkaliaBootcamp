const express = require('express');
const app = express();
const router = require('./routes/index.js');
require('dotenv').config();
const path = require('path');


const PORT = process.env.PORT || 7001;

// Motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true })); // Para procesar datos de formularios
app.use(express.json());

app.use('/', router);
/*app.use('/', require('./routes/categoria-producto-routes-front.js'));*/


/***********************/
/*app.get('/', router);*/
app.get('/contactanos', router);
app.get('/productos', router);
app.get('/producto/:id', router);
app.get('/usuario-perfil', router);
/***********************/

// Middleware para manejar rutas no encontradas (404)
app.use((req, res, next) => {
  res.status(404).render('error404', { url: req.originalUrl });
});

// Middleware para manejar otros errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { error: err });
});


app.listen(process.env.PORT || 7001, () => {
  console.log(`Servidor en línea en el puerto ${PORT}`)
});