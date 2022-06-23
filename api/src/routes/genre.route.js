const { Router } = require("express");
const router = Router();
const {getGenre} = require("../controllers/genre.controller.js");


router.get("/", getGenre);

module.exports = router;