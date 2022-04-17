import "./Restaurants.css"
import { RESTAURANTS, ALLRESTAURANTS } from "../../Query";
import { useQuery } from "@apollo/client";
import { useParams, Link } from "react-router-dom";

function Restaurants() {
  const { categoryId } = useParams();
  const { data } = useQuery(RESTAURANTS, { variables: { categoryId: categoryId || 1 } });

  const { data: all_restaurants } = useQuery(ALLRESTAURANTS);

  return (
    <>
      <div className="restaurant-section">
        <h4 className="title">Restaurants</h4>
        {
          categoryId ?
            <ul className="restaurants-list">
              {
                data && data.getRestaurants.map((e, i) => (
                  <li className="card-item" key={i}>
                    <Link className="card-link" to={`/restaurant/${e.id}`}>
                      <img className="image" src="https://picsum.photos/250/300" alt="" />
                      <div className="card-bottom">
                        <h5 className="card-title">{e.restaurant_name}</h5>
                      </div>
                    </Link>
                  </li>
                ))
              }
            </ul>
            :
            <ul className='restaurants-list'>
              {
                all_restaurants && all_restaurants.getAllRestaurants.map((e, i) => (
                  <li className="card-item" key={i}>
                    <Link className="card-link" to={`/restaurant/${e.id}`}>
                      <img className="image" src="https://picsum.photos/250/300" alt="" />
                      <div className="card-bottom">
                        <h5 className="card-title">{e.restaurant_name}</h5>
                      </div>
                    </Link>
                  </li>
                ))
              }
            </ul>
        }
      </div>

    </>
  )
}

export default Restaurants;