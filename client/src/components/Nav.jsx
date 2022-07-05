import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getVideogamesByName } from '../redux/actions';
import './styles/Nav.css'

export default function Nav() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState('');

 function handleInputChange(e){
    setName(e.target.value)
 }

 function handleSubmit(e){
  e.preventDefault(e);
  dispatch(getVideogamesByName(name));
  setName('');
  history.push('/videogames')
 }

  return (
    <div className='container-nav'>
      <div className='container-buttons'>
        <div>
      <input 
        type= 'text '
        name="search" 
        placeholder='Search by name' 
        className='button'
        onChange={e => handleInputChange(e)}/>

      <button type = 'submit'className='button' onClick={e => handleSubmit(e)}>Search</button>
      </div>
      <div>
      <Link to='/videogames'>
        <button className='button'>Home</button>
      </Link>
      </div>
      <div>
      <Link to = '/videogame'>
        <button className='button'>Create videogame</button>
      </Link>
      </div>
      </div>
    </div>
  )
}
