const axios = require('axios');
require('dotenv').config();
const { conn } = require('../db.js');
const {Videogame, Genre} = conn.models;
// const {Genre} = require('../models/Genre.js');

const { Op } = require("sequelize");




module.exports = {
    getVideogameDetail : async (req, res) =>{
        const {id} = req.params;

        if(!id.includes('-')){

            try {
                const URL =`https://api.rawg.io/api/games/${id}?key=${process.env.API_KEY}`;

                const videogame = await axios.get(URL);
    
                let aux = {
                    name : videogame.data.name, 
                    image : videogame.data.background_image,
                    genres : videogame.data.genres.map(e => e.name),
                    description : videogame.data.description,
                    released : videogame.data.released, 
                    rating : videogame.data.rating, 
                    platforms : videogame.data.platforms.map(e => e.platform.name),
    
                }
    
                // console.log(aux)
                res.send(aux)

            } catch (error) {

                console.log(error);
                res.status(404).send('Videogame not found');

            }
          

        } else {
            try {

                // console.log(Genre.__proto__)

                const videogame = await Videogame.findOne({
                    where: {id},
                    include : {
                        model :Genre
                    }
                });
            

                const aux = {
                    name : videogame.getDataValue('name'), 
                    image : videogame.getDataValue('image'),
                    genres : videogame.getDataValue('Genres').map(e => e.name),
                    description : videogame.getDataValue('description'),
                    released : videogame.getDataValue('released'), 
                    rating : videogame.getDataValue('rating'), 
                    platforms : videogame.getDataValue('platforms'),
                }

                 res.send(aux);

            } catch (error) {
                console.log(error);
                res.status(404).send('Videogame not found');
            }
        }


        
    }
};