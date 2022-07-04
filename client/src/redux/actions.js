import axios from 'axios';

export const GET_VIDEOGAMES = 'GET VIDEOGAMES';
export const GET_VIDEOGAMES_BY_NAME = 'GET VIDEOGAMES BY NAME';
export const POST_VIDEOGAME = 'POST VIDEOGAME';
export const GET_DETAIL = 'GET DETAIL';
export const GET_GENRES = 'GET_GENRES';
export const FILTER_BY_GENRE = 'FILTER_BY_GENRE';
export const FILTER_BY_EA = 'FILTER_BY_EA';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const ORDER_BY_RATING = 'ORDER_BY_RATING' 

const URL_VIDEOGAMES = "http://localhost:3001/videogames/";
const URL_GET = "http://localhost:3001/videogame/";
const URL_GENRES = 'http://localhost:3001/genres';

export const getVideogames = () => {
    return async function (dispatch){
        try {
        const {data} = await axios.get(URL_VIDEOGAMES);
        return dispatch({type : GET_VIDEOGAMES, payload : data})
            
        } catch (error) {
            console.log(error);
            return error;
        }
    }
};

export const getVideogamesByName = (name) => {
    return async function (dispatch){
        try {
        const {data} = await axios.get(`${URL_VIDEOGAMES}?name=${name}`);
        return dispatch({type : GET_VIDEOGAMES_BY_NAME, payload : data})
            
        } catch (error) {
            console.log(error);
            return error;
        }
    }
};

export const getGenres = () =>{
    return async function (dispatch){
        try {
            const {data} = await axios.get(URL_GENRES)
            
            return dispatch ({type:GET_GENRES, payload: data})

        } catch (error) {
            console.log(error);
        }
    }
};

export const filterVideogamesByGenres = (payload) =>{
    return {
        type : FILTER_BY_GENRE,
        payload
    }

};

export const filterVideogamesByEA = (payload) =>{
    return {
        type : FILTER_BY_EA,
        payload
    }

};

export const orderByName = (payload) => {
    return {
        type : ORDER_BY_NAME,
        payload
    }
};

export const orderByRating = (payload) =>{
    return {
        type : ORDER_BY_RATING,
        payload
    }
};

export const postVideogame = (videogame) => {
    return async function (){
        try {
        const {data} = await axios.post(URL_VIDEOGAMES, videogame);
        
        return {
            type : POST_VIDEOGAME,
            payload : data
        }
        } catch (error) {
            console.log(error);
            // return error;
        }
    }
};

export const getDetail = (id) => {
    return async function (dispatch){
        try {

        const {data} = await axios.get(URL_GET+id);
        // console.log(data)
        
        return dispatch({type : GET_DETAIL, payload : data})
            
        } catch (error) {
            console.log(error);
            // return error;
        }
    }
};

