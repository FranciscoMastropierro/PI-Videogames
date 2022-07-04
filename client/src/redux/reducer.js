import { GET_VIDEOGAMES, GET_DETAIL, GET_GENRES, FILTER_BY_GENRE, FILTER_BY_EA, ORDER_BY_NAME, ORDER_BY_RATING,GET_VIDEOGAMES_BY_NAME, POST_VIDEOGAME, SET_LOADING } from "./actions";


const inicialState = {
    videogames : [],
    allVideogames : [],
    videogameDetail : {},
    genres: [],
    loading : false
}

function rootReducer (state = inicialState, action){
    switch(action.type){
        case GET_VIDEOGAMES : 
            return {
                ...state,
                videogames : action.payload,
                allVideogames : action.payload
            };
        case GET_VIDEOGAMES_BY_NAME :
            return {
                ...state,
                videogames : action.payload
            }

        case GET_DETAIL :
            return {
                ...state,
                videogameDetail : action.payload
            };
        case GET_GENRES :
            return {
                ...state,
                genres: action.payload
            }
        case FILTER_BY_GENRE:
            
            const videogamesFiltered = action.payload === 'All'? state.allVideogames : state.allVideogames.filter(e => e.genres.includes(action.payload))
    
            return{
                ...state,
                videogames: videogamesFiltered
            }

        case FILTER_BY_EA:
            const videogamesFilteredByEA = action.payload === 'Added'? state.allVideogames.filter(e => e.inBd) : state.allVideogames.filter(e => !e.inBd);
            
            return {
                ...state,
                videogames : action.payload === 'All' ? state.allVideogames : videogamesFilteredByEA
            }

        case ORDER_BY_NAME:
            let sortedByName = action.payload === 'A-Z' ?
                state.videogames.sort(function (a, b){
                    if(a.name.toString() > b.name.toString()) return 1;
                    if(b.name.toString() > a.name.toString()) return -1;
                    return 0;
                }) : 
                state.videogames.sort(function(a,b){
                    if(a.name.toString() > b.name.toString()) return -1;
                    if(b.name.toString() > a.name.toString()) return 1;
                    return 0;
                });
            return {
                ...state,
                videogames : sortedByName
            }    
        
        case ORDER_BY_RATING :
            let sortedByRating = action.payload === 'TOP'?
            state.videogames.sort(function (a, b){
                if(a.rating > b.rating) return -1;
                if(b.rating > a.rating) return 1;
                return 0;
            }) : 
            state.videogames.sort(function(a,b){
                if(a.rating > b.rating) return 1;
                if(b.rating > a.rating) return -1;
                return 0;
            });
            return {
                ...state,
                videogames : sortedByRating
            }
        case POST_VIDEOGAME:
            return {...state}
        
        case SET_LOADING :
            return{
                ...state,
                loading : action.payload
            } 
        default:
            return {...state}

        
    }

}

export default rootReducer;
 