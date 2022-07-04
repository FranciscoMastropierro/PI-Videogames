import React, { useEffect, useState } from 'react'
// import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import { getVideogames, filterVideogamesByGenres, filterVideogamesByEA, orderByName, orderByRating, getGenres } from '../redux/actions';
// import { Link } from 'react-router-dom';
import GameCard  from './GameCard';
import Paginated from './Paginated';
import './styles/Videogames.css'

export default function Videogames() {

  const dispatch = useDispatch();
  const allVideogames = useSelector(state => state.videogames);
  const allGenres = useSelector(state => state.genres);

  const [order, setOrder] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const [videogamesPerPage, setVideogamesPerPage] = useState(15);
  const indexLastVideogame = currentPage * videogamesPerPage;
  const indexFirstVideogame = indexLastVideogame - videogamesPerPage;
  const currentVideogames = allVideogames.slice(indexFirstVideogame, indexLastVideogame);



  function handleFilterGenres(e){
    e.preventDefault();
    console.log(e.target.value)
    dispatch(filterVideogamesByGenres(e.target.value))
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`)
  }
  function handleFilterEA(e){
    e.preventDefault();
    dispatch(filterVideogamesByEA(e.target.value))
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`)
  }

  function handleSortName (e){
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`)

  };

  function handleSortRating (e){
    e.preventDefault();
    dispatch(orderByRating(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`)
  };

  function handleClick(e){
    e.preventDefault();
    dispatch(getVideogames());
  }

  useEffect(() => {
    dispatch(getVideogames());
    dispatch(getGenres());
  },[dispatch])

  return (
    <div>
      <label>Choose genres :</label>
      <select onChange={e => handleFilterGenres(e)} >
      <option value={'All'}>All</option>
      {allGenres?.map(e => <option key={e.id} value={e.name}>{e.name}</option>)}  
      </select>
      <label>Existing / Added :</label>
      <select onChange={e => handleFilterEA(e)}>
        <option value={'All'}>All</option>
        <option value={'Existing'}>Existing</option>
        <option value={'Added'}>Added</option>
      </select>  
      <label>In order :</label>
      <select onChange={e => handleSortName(e)}>
        <option value='ALL'>--</option>
        <option value='A-Z'>A-Z</option>
        <option value='Z-A'>Z-A</option>
      </select>
      <label>Rating by :</label>
      <select onChange={e => handleSortRating(e)}>
        <option value='ALL'>--</option>
        <option value='TOP'>TOP</option>
        <option value='BOTTOM'>BOTTOM</option>
      </select>
      <button onClick={e => handleClick(e)}>Reload Games</button>
      <Paginated 
      videogamesPerPage={videogamesPerPage}
      allVideogames={allVideogames.length}
      setCurrentPage = {setCurrentPage}
      currentPage = {currentPage}
      />
      <div className='videogames-container'>
      {
        currentVideogames?.map(e => <GameCard key={e.id} name={e.name} image={e.image} genres={e.genres.join('-')} id={e.id} />)
      }
      </div>
      <Paginated 
      videogamesPerPage={videogamesPerPage}
      allVideogames={allVideogames.length}
      setCurrentPage = {setCurrentPage}
      currentPage = {currentPage}
      />
    </div>
  )

}
