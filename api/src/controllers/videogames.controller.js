const axios = require('axios');
require('dotenv').config();
const { conn } = require('../db.js');
const {Videogame, Game_Genre} = conn.models;
const { Op } = require("sequelize");



const URL =`https://api.rawg.io/api/games?key=${process.env.API_KEY}`;



module.exports = {
    getVideogames : async (req, res) => {
        const {name} = req.query;

        if(!name) {
        const videogamesBd = await Videogame.findAll();

            try {
                const {data} = await axios.get(URL)    
                let {next, results} = data;
                const videogamesApi = [];
                results.forEach(e => {
                    const {id, name, rating, background_image, genres } = e;
                    const genre =[]
                    genres.forEach(e => genre.push(e.name));
                    videogamesApi.push({id, name, rating, background_image, genres : genre});
                });
            for (let i = 1; i < 5; i++) {
                const aux = await axios.get(next)
                next = aux.data.next;
                aux.data.results.forEach(e => {
                    const {id, name,rating, background_image, genres } = e;
                    const genre =[]
                    genres.forEach(e => genre.push(e.name));
                    videogamesApi.push({id, name, rating, background_image, genres :genre});
                });    
            }
            

            return res.json(videogamesApi.concat(videogamesBd));

            } catch (error) {
                console.log(error);
            }

        
        } else {

             const videogamesBd = await Videogame.findAll({
               where: {
                 name: { [Op.substring]: name },
               },

               limit: 15,
             });

            console.log(videogamesBd);   
            let sizePage = 15;
            // console.log(videogamesBd[0].getDataValue('name'))
            let videogameSearchBd =[]; 
            if(videogamesBd.length > 0) {
                videogamesBd.forEach(e => videogameSearchBd.push(e.dataValues));
                sizePage = sizePage - videogamesBd.length;
            }
            const URL_Search = `https://api.rawg.io/api/games?key=${process.env.API_KEY}&search=${name}&page_size=${sizePage}`;

            try {
                
                const search = await axios.get(URL_Search);

                const videogameSearchApi = [];
                if(search.data.count == 0) return res.status(404).json({error: `Do not exist videogame : ${name}`});
                search.data.results.forEach(e => {
                    const {id, name,rating, background_image, genres } = e;
                    const genre =[]
                    genres.forEach(e => genre.push(e.name));
                    videogameSearchApi.push({id, name, rating, background_image, genres :genre});
                });
                return res.json(videogameSearchApi.concat(videogameSearchBd));
                
            } catch (error) {
                console.log(error);
            }

        }



    },

    postVideogames : async (req, res) =>{
        let {name, description, released, rating, genres, platforms} = req.body;
        // let allPlaforms = platforms.toString();
        console.log(genres)
        try {
            if(!name || !description || !platforms) return res.status(400).json({error: 'Not all fields are required, but...'})
            
            const aux = {
                    name, 
                    description,
                    released, 
                    rating, 
                    platforms

            }

            const videogame = await Videogame.create(aux);
            
            console.log(videogame)

            genres.forEach(async (e) => await videogame.addGenre(e,{ through: Game_Genre }));

            res.json({msj : `Game added`, data : videogame.dataValues})

        } catch (error) {
            console.error(error);
        }
    }
};