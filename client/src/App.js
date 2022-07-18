import './App.css';
import LandingPage from './components/LandingPage';
import Videogames from './components/Videogames'
import VideogameDetail from './components/VideogameDetail'
import Nav from './components/Nav';
import CreateVideogame from './components/CreateVideogame';
import {Route} from 'react-router-dom';


function App() {
  return (
    <div >
      <Route exact path="/" render={() => <LandingPage  />} />
      <Route path="/:videogame" render={() => <Nav  />} />
      <Route exact path="/videogame" render={() => <CreateVideogame  />} />
      <Route path="/videogames" render={() => <Videogames  />} />
      <Route path="/videogame/:id" render={() => <VideogameDetail  />} />


    </div>
  );
}

export default App;
