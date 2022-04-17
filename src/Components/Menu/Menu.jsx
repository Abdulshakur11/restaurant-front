import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { MENUS } from "../../Query";
import { useContext } from "react";
import { Context } from "../../Context/Context";

function Menu() {
  const { branchId } = useParams();
  const { data } = useQuery(MENUS, { variables: { branchId } });

  const { items, setItems } = useContext(Context);

  // Insert to local storage;
  window.localStorage.setItem('item', JSON.stringify(items));

  // Function for add to cart
  const handleAddCartClick = (e) => {
    const menuId = e.target.id;
    const foundMenu = data.getMenus.find(e => e.id === menuId);
    setItems([...new Set([...items, foundMenu])])
  };

  return (
    <>
      <h4 className="title">Menu</h4>
      <ul className="restaurants-list">
        {
          data && data.getMenus.map((e, i) => (
            <li className="card-item" key={i}>
              <img src="https://picsum.photos/250/300" alt="" />
              <div className="card-bottom">
                <h4 className="card-title">{e.food}</h4>
                <h5>{e.price} so'm</h5>
                <div>
                  <button className="btn btn-outline-primary cart-btn" id={e.id} onClick={(e) => handleAddCartClick(e)} >Add to cart</button>
                </div>
              </div>
            </li>
          ))
        }
      </ul>
    </>
  )
};

export default Menu