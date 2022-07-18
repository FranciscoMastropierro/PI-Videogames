const { Router } = require("express");
const router = Router();
const {getVideogameDetail, deleteVideogame} = require('../controllers/videogame.controller.js');

router.get('/:id', getVideogameDetail)
router.delete('/:id', deleteVideogame)

module.exports = router;