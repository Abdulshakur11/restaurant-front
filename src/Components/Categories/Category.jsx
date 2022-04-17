import './Category.css';
import { CATEGORIES } from "../../Query";
import { useQuery } from "@apollo/client";
import { NavLink } from "react-router-dom";

function Category() {
  const { data } = useQuery(CATEGORIES);

  return (
    <>
      <div className='header-section'>
        <div className='container'>
          {
            data && data.getCategories.map((e, i) => (
              <NavLink className="header-link" activeClassName='header-link_active' to={`/category/${e.id}`} id={e.id} key={i}>{e.category_name}</NavLink>
            ))
          }
        </div>
        
      </div>
    </>
  )
}

export default Category;