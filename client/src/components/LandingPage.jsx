import React from 'react';
import { Link } from 'react-router-dom';
import './styles/LandingPage.css';


export default function LandingPage() {
  return (
    <div className='container-landing'>
        <h1 className='title'>Bienvenidos</h1>
        <Link to={`/videogames`} >
            <button>Enter</button>
        </Link>
    </div>
  )
}

