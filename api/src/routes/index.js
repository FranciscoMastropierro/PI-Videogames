const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const genre = require('./genre.route')
const videogame = require('./videogame.route.js')
const videogames = require('./videogames.route.js')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/genres', genre);

router.use('/videogame', videogame);

router.use('/videogames', videogames)


module.exports = router;
