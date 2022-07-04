import React from 'react'
import { Link } from 'react-router-dom'
import './styles/GameCard.css'

export default function GameCard({ name, image, genres, id }) {
  return (
    <div className='gamecard-container'>
        <Link to = {`/videogame/${id}`} className='gamecard-title'>
          <h2>{name}</h2>
        </Link>
        <img src= {image} alt='not found' width='100%' height='auto' />
        <h5>{genres}</h5>
    </div>
  )
}
