import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../redux/actions";
import { useParams } from "react-router-dom";
import "./styles/VideogameDetail.css";
import { Link } from "react-router-dom";

const VideogameDetail = () => {
  const params = useParams();
  const { id } = params;
  const dispatch = useDispatch();
  const videogameDetail = useSelector((state) => state.videogameDetail);
  const loading = useSelector((state) => state.loading);

  // console.log(state.videogameDetail)

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  return (
    <div className='detail-container'>
      <div className="button-back">
        <Link to="/videogames">
          <button>Go Back</button>
        </Link>
      </div>
      <div className="card">
        {loading ? (
          <p>Loading</p>
        ) : (
          <Fragment>
            <img
              src={videogameDetail.image}
              alt="Not found"
              width="500px"
              height="500px"
            />
            <h1>{videogameDetail.name}</h1>
            <h3>{videogameDetail.genres}</h3>
            <p>{videogameDetail.description}</p>
            <h5>{videogameDetail.platforms}</h5>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default VideogameDetail;
