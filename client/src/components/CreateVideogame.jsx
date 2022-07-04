import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { postVideogame, getGenres } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

export function validate(input){
  let errors = {};
  if(!input.name){
    errors.name = 'Name is required';
  } 
  if(!input.description){
    errors.description = 'Description is required';
  } 
  if(input.platforms.length === 0){
    errors.platforms = 'Platforms is required';
  } 
  if(input.genres.length === 0){
    errors.genres = 'At least one genre is required';
  } 
  return errors;
} 

export default function CreateVideogame() {

  const dispatch = useDispatch();
  const history = useHistory()
  const allGenres = useSelector(state => state.genres)

  const [checked, setChecked] = useState({
    PC : false,
    PS5 : false,
    PS4 : false,
    PS3 : false,
    PS2 : false,
    Xbox : false,
    Nintendo : false,
    iOS : false,
    Android : false,
    macOS : false,
    Linux : false,
    Wii : false,
    GameBoy : false,
    Genesis : false

  });

  const [input, setInput] = useState({
    name : '',
    image : '',
    released : '',
    description : '',
    rating : 0,
    genres : [],
    platforms : []
  })

  const [errors, setErrors] = useState ({});

  useEffect(() => {
    dispatch(getGenres());
    setErrors(validate(input));
  }, [dispatch, input])

  const handleChange = (e) =>{
    setInput({
      ...input,
      [e.target.name] : e.target.value
    });

    setErrors(validate({
      ...input,
      [e.target.name] : e.target.value
    }))
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    setErrors(validate(input));
    if(Object.keys(errors).length === 0){
      // console.log(input)
      const videogame = {
        name : input.name,
        image : input.image,
        released : input.released,
        description : input.description,
        rating : input.rating,
        genres : input.genres,
        platforms : input.platforms.join('-')
      }
      dispatch(postVideogame(videogame));
      alert('Videogame created!');
      setInput({
        name : '',
        image : '',
        released : '',
        description : '',
        rating : 0,
        genres : [],
        platforms : []
      });
      history.push('/videogames')
    } else {
      alert('Fields invalid, Check')
    }
  }
  
  const handleChangeCheckbox = (e) => {
    // console.log(e.target)
    if(!checked[e.target.id]){
      if(!input.platforms.includes(e.target.name)){
        setInput({
          ...input,
          platforms : [...input.platforms, e.target.name]
        })
        setErrors(validate({
          ...input,
          platforms : [...input.platforms, e.target.name]
        }))
      }
    }else{
      setInput({
        ...input,
        platforms : input.platforms.filter(elemt => elemt !== e.target.name )
      })
    }
    setChecked({
      ...checked,
      [e.target.id] : e.target.checked
    }) 
  }

  const handleChangeSelect = (e) =>{
    // console.log(e.target.value)
    if(e.target.value === 'All') return
    const genre = allGenres.find(elemt => elemt.name === e.target.value);
    if(!input.genres.includes(genre.id)){
        setInput({
          ...input,
          genres : [...input.genres, genre.id]
        })
        setErrors(validate({
          ...input,
          genres : [...input.genres, genre.id]
        }))
      } else {
        setInput({
          ...input,
           genres : input.genres.filter(e => e !== genre.id )
        })
      }
  }

  return (
    <div>
      <h1>Create your videogame</h1>
      <form>
        <div>
          <label>Name:</label>
          <input
            type='text'
            onChange={handleChange}
            value={input.name}
            name= 'name'
            className={errors.name && 'danger'}/>
            {errors.name ? (
              <p>
                <small>{errors.name}</small>
              </p>
            ) : ( false )}
        </div>
          <div>
          <label>Image:</label>
          <input
            type='text'
            onChange={handleChange}
            value={input.image}
            name= 'image'>
          </input>
        </div>
        <div>
          <label>Released:</label>
          <input
            type='date'
            onChange={handleChange}
            value={input.released}
            name= 'released'>
          </input>
        </div>
        <div>
          <label>Description:</label>
          <input
            type='text' 
            onChange={handleChange}
            value={input.description}
            name= 'description'
            className={errors.description && 'danger'}/>
            {errors.description ? (
              <p>
                <small>{errors.description}</small>
              </p>
            ) : ( false )}
        </div>
        <div>
          <label>Rating (0 a 5):</label>
          <input
            type='range'
            max={5}
            step={0.1}
            onChange={handleChange}
            value={input.rating}
            name= 'rating'>
          </input>
        </div>
        <div>
          <label>Platforms:</label>
          <label>
          <input
            type='checkbox'
            id= 'PC'
            name= 'PC'
            checked={checked.PC}
            onChange={e => handleChangeCheckbox(e)}
            >
          </input>PC</label>
          <label>
          <input
            type='checkbox'
            id='PS5'
            name= 'PlayStation 5'
            checked={checked.PS5}
            onChange={e => handleChangeCheckbox(e)}>
          </input>PlayStation 5</label>
          <label>
          <input
            type='checkbox'
            id='PS4'
            name= 'PlayStation 4'
            checked={checked.PS4}
            onChange={e => handleChangeCheckbox(e)}>
          </input>PlayStation 4</label>
          <label>
          <input
            type='checkbox'
            id='PS3'
            name= 'PlayStation 3'
            checked={checked.PS3}
            onChange={e => handleChangeCheckbox(e)}>
          </input>PlayStation 3</label>
          <label>
          <input
            type='checkbox'
            id='PS2'
            name= 'PlayStation 2'
            checked={checked.PS2}
            onChange={e => handleChangeCheckbox(e)}>
          </input>PlayStation 2</label>
          <label>
          <input
            type='checkbox'
            id='Xbox'
            name= 'Xbox'
            checked={checked.Xbox}
            onChange={e => handleChangeCheckbox(e)}>
          </input>Xbox</label>
          <label>
          <input
            type='checkbox'
            id='Nintendo'
            name= 'Nintendo 64'
            checked={checked.Nintendo}
            onChange={e => handleChangeCheckbox(e)}>
          </input>Nintendo 64</label>
          <label>
          <input
            type='checkbox'
            id='iOS'
            name= 'iOS'
            checked={checked.iOS}
            onChange={e => handleChangeCheckbox(e)}>
          </input>iOS</label>
          <label>
          <input
            type='checkbox'
            id='Android'
            name= 'Android'
            checked={checked.Android}
            onChange={e => handleChangeCheckbox(e)}>
          </input>Android</label>
          <label>
          <input
            type='checkbox'
            id='macOS'
            name= 'macOS'
            checked={checked.macOS}
            onChange={e => handleChangeCheckbox(e)}>
          </input>macOS</label> 
          <label>
          <input
            type='checkbox'
            id='Linux'
            name= 'Linux'
            checked={checked.Linux}
            onChange={e => handleChangeCheckbox(e)}>
          </input>Linux</label>
          <label>
          <input
            type='checkbox'
            id='Wii'
            name= 'Wii'
            checked={checked.Wii}
            onChange={e => handleChangeCheckbox(e)}>
          </input>Wii</label>
          <label>
          <input
            type='checkbox'
            id='GameBoy'
            name= 'Game Boy'
            checked={checked.GameBoy}
            onChange={e => handleChangeCheckbox(e)}>
          </input>Game Boy</label>
          <label>
          <input
            type='checkbox'
            id='Genesis'
            name= 'Genesis'
            checked={checked.Genesis}
            onChange={e => handleChangeCheckbox(e)}>
          </input>Genesis</label>
        <br/>
          {errors.platforms ? (
              <p>
                <small>{errors.platforms}</small>
              </p>
            ) : ( false )}
        </div>
        <br/>
        <div>
          <label>Genres:</label>
          <select onChange={e => handleChangeSelect(e)} >
          <option value={'All'}>---</option>
          {allGenres?.map(e => <option key={e.id} value={e.name}>{e.name}</option>)}  
          </select>
          {errors.genres ? (
              <p>
                <small>{errors.genres}</small>
              </p>
            ) : ( false )}
        </div>
        <br/>
        <label>Selected:</label><br/>
        {input.genres?.map(e =>{
          const genre = allGenres.find(elemt => elemt.id === e)
          return <button key={genre.id} value={genre.name} onClick={e => handleChangeSelect(e)}>{genre.name}</button>
        })}
        {/* {JSON.stringify(input)} */}
        <br></br>
        <input 
        type='submit' 
        value='Create' 
        disabled={errors.name || errors.description || errors.platforms ? true : false} 
        onClick={e => handleSubmit(e)}/>
      </form>
    </div>
  )
}
