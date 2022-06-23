const axios = require('axios');
require('dotenv').config();
const { Genre } = require('../db.js');


const URL =`https://api.rawg.io/api/genres?key=${process.env.API_KEY}`;


module.exports = {
    
    getGenre : async (req, res) =>{
        try {
            // Find all users
            const genres = await Genre.findAll();

            return res.send(genres);
        
        } catch (error) {
            console.error(error);
        }


    },

};