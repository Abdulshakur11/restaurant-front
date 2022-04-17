import { Switch, Route } from 'react-router-dom';
import './App.css';
import Home from "./Pages/Home/Home";
import Restaurants from "./Components/Restaurants/Restaurants";
import Branches from './Components/Branches/Branches';
import Menu from './Components/Menu/Menu';
import hot from "./images/hot.jpg";
import big from "./images/big.jpg";
import tandir from "./images/tandir.jpg";

function App() {
  return (
    <>
      <div>
        <Home />
      </div>

      <div className='intro-section'>
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={hot} className="d-block" alt="..." />
            </div>
            <div className="carousel-item">
              <img src={big} className="d-block" alt="..." />
            </div>
            <div className="carousel-item">
              <img src={tandir} className="d-block" alt="..." />
            </div>
          </div>
        </div>
      </div>

      <div className='container'>
        <Switch>
          <Route path="/" component={Restaurants} exact />
          <Route path="/category/:categoryId" component={Restaurants} />
          <Route path="/restaurant/:restaurantId" component={Branches} />
          <Route path="/branches/:branchId" component={Menu} />
        </Switch>
      </div>
    </>
  );
}

export default App;
