import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { getDetail } from '../redux/actions';
import { useParams } from 'react-router-dom';


const VideogameDetail = () => {
  
  const params = useParams()
  const {id} = params;
  const dispatch = useDispatch();
  const videogameDetail = useSelector(state => state.videogameDetail);

  // console.log(state.videogameDetail)

  useEffect(() => {
    dispatch(getDetail(id));
  },[dispatch, id])

  return (
    <div>
      <img src={videogameDetail.image} alt='Not found' width='500px' height='500px'/>
      <h1>{videogameDetail.name}</h1>
      <h3>{videogameDetail.genres}</h3>
      {videogameDetail.description}
      <h5>{videogameDetail.platforms}</h5>
    </div>
  )
};

export default VideogameDetail;