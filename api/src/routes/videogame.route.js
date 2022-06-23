const { Router } = require("express");
const router = Router();
const {getVideogameDetail} = require('../controllers/videogame.controller.js');

router.get('/:id', getVideogameDetail)

module.exports = router;