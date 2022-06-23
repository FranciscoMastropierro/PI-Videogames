const { Router } = require("express");
const router = Router();
const {getVideogames, postVideogames} = require('../controllers/videogames.controller.js');


router.get('/', getVideogames)

router.post('/', postVideogames)

module.exports = router;
