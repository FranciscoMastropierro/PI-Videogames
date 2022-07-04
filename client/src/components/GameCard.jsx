import React from 'react'
import { Link } from 'react-router-dom'
import './styles/GameCard.css'

export default function GameCard({ name, image, genres, id }) {
  const URL = 'https://us.123rf.com/450wm/themoderncanvas/themoderncanvas1602/themoderncanvas160200091/52803071-fotos-icono-digital-%C3%A1lbum-de-fotos-se%C3%B1al-galer%C3%ADa-de-im%C3%A1genes-de-s%C3%ADmbolos-blanco-icono-de-la-galer%C3%ADa-.jpg'
  return (
    <div className='gamecard-container'>
        <Link to = {`/videogame/${id}`} className='gamecard-title'>
          <h2>{name}</h2>
        </Link>
        <img src= {image || URL } alt='not found' width='100%' height='auto' />
        <h5>{genres}</h5>
    </div>
  )
}
