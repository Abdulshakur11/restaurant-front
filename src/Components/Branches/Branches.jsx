import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { BRANCHES } from "../../Query";


function Branches() {
  const { restaurantId } = useParams();

  const { data } = useQuery(BRANCHES, {
    variables: { restaurantId }
  });

  return (
    <>
      <h4 className="title">Branches</h4>
      <div>
        <ul className="restaurants-list">
          {
            data && data.getBranches.map((e, i) => (
              <li className="card-item" key={i}>
                <Link className="card-link" to={`/branches/${e.id}`}>
                  <img className="image" src="https://picsum.photos/250/300" alt="" />
                  <div className="card-bottom">
                    <h5 className="card-title">{e.branche_name}</h5>
                  </div>
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
    </>
  )
}

export default Branches;