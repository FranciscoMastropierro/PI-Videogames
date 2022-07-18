import React from 'react';
import { Link } from 'react-router-dom';
import './styles/LandingPage.css';


export default function LandingPage() {
  return (
    <div className='container-general'>
    <div className='container-landing'>
      <div className='glass'>
        <h1 className='title'>Welcome to the jungle</h1>
        <Link to={`/videogames`} >
            <button className='enter-button'>Enter</button>
        </Link>
      </div>
    </div>
    </div>
  )
}

