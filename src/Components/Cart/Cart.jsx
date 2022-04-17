import "./Cart.css";

import { useMutation } from "@apollo/client";

import { ORDERS } from "../../Query";

import cart from "../../images/cart-outline.svg";
import deleteIcon from "../../images/trash-outline.svg";

import { useContext, useEffect, useState } from "react";
import { Context } from "../../Context/Context";
import { Button, Offcanvas } from "react-bootstrap";


function Cart() {
  const [food, setFood] = useState();
  const [test, setTest] = useState();
  const [show, setShow] = useState(false);
  const { items, setItems } = useContext(Context);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handlClick = (menuId) => {
    const foundFromLsMenu = items.find(e => e.id === menuId);
    const { food, price } = foundFromLsMenu;
    setFood({ food, price });
  };

  // This hook is for cart sms
  useEffect(() => {
    setTest(items.length);
  }, [items]);

  const productQuantity = document.querySelector('.product-quantity');
  const price = document.querySelector('.price');

  // Increment function
  const handleAddBtn = () => {
    ++productQuantity.innerHTML;
    price.innerHTML = parseInt(price.innerHTML) + food?.price;
  };
  // Decrement function
  const handleSplitBtn = () => {
    if (productQuantity.innerHTML >= 2) {
      --productQuantity.innerHTML
      price.innerHTML = parseInt(price.innerHTML) - food?.price;
    }
  };

  const [newOrder] = useMutation(ORDERS, {
    update: (cache, data) => {
      console.log(data);
    }
  });

  const handleSubmit = (e) => {
    const { username, location, phone_number } = e.target.elements;
    newOrder({
      variables: {
        username: username.value,
        location: location.value,
        phone_number: phone_number.value,
        food_name: food?.food,
        food_price: price.innerHTML - 0, // malumotni jo'natayotganimizda input'dan String holtda ketadi agar - 0 qilsak u Number type'da ketadi 
        food_count: productQuantity.innerHTML - 0
      }
    });
    alert('Click OK to confirm the order')
  };

  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id))
    localStorage.setItem("item", JSON.stringify(items));
  };



  return (
    <>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="cart-list">
            {
              items.map((e, i) => (
                <li className="cart-item" key={i}>
                  <img className="cart-item-img" src="https://picsum.photos/60/60" alt="" />
                  <div className="cart-title-wrapper">
                    <h5 className="cart-title">{e.food}</h5>
                    <p className="cart-price">{e.price} so'm</p>
                  </div>
                  <button className="btn btn-outline-success order-btn" id={e.id} onClick={() => handlClick(e.id) || handleClose()} data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Order</button>
                  <button className="delete-btn" onClick={() => handleDelete(e.id)} id={e.id} ><img src={deleteIcon} alt="" width="30" height="30" /></button>
                </li>
              ))
            }
          </ul>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Cart open btn below */}
      <div className="cart-open-btn-wrapper">
        <p className="sp">{test}</p>
        <Button className="cart-open-btn" onClick={handleShow} type="button"><img src={cart} alt="" width="30" height="30" /></Button>
      </div>


      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Order food</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <img src="https://picsum.photos/200/350" alt="" />
                <div>
                  <h5>{food?.food}</h5>
                  <label className="label" htmlFor="name">Name</label>
                  <input className="form-control name" name="username" type="text" id="name" placeholder="Name" required />
                  <label className="label" htmlFor="location">Location</label>
                  <input className="form-control" name="location" type="text" id="location" placeholder="Location" required />
                  <label className="label" htmlFor="phone_number">Phone number</label>
                  <input className="form-control" name="phone_number" type="text" id="phone_number" placeholder="Phone number" required />

                  <div className="quantity-wrapper">
                    <p className="quantity-title">Quantity:</p>
                    <button type="button" className="btn btn-outline-danger quantity-btn" onClick={handleSplitBtn}>-</button>
                    <div className="product-quantity">1</div>
                    <button type="button" className="btn btn-outline-danger quantity-btn" onClick={handleAddBtn}>+</button>
                  </div>

                  <div className="quantity-wrapper">
                    <p className="quantity-title">Price:</p>
                    <p className="price-h5"><span className="price">{food?.price}</span> so'm</p>
                  </div>

                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary">Order</button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </>
  )
}

export default Cart;
