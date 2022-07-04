import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getVideogamesByName } from '../redux/actions';

export default function Nav() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');

 function handleInputChange(e){
    setName(e.target.value)
 }

 function handleSubmit(e){
  e.preventDefault(e);
  dispatch(getVideogamesByName(name))
 }

  return (
    <div>
      <input 
        type= 'text '
        name="search" 
        placeholder='Search by name' 
        onChange={e => handleInputChange(e)}/>

      <button type = 'submit' onClick={e => handleSubmit(e)}>Search</button>

      <Link to='/videogames'>
        <button>Home</button>
      </Link>
      <Link to = '/videogame'>
        <button>Create videogame</button>
      </Link>
      <h1>VideoGames!</h1>
    </div>
  )
}
