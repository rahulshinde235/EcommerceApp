import React, { useState } from "react";
import "./Cart.css";
import Close from "../assets/Close.svg";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../redux/cart";
import { resetProducts } from "../redux/cart";

const Cart = ({ closeCartHandler }) => {
  const state = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const resetCart = (e) => {
    e.stopPropagation();
    alert("Products order you will receive them soon");
    dispatch(resetProducts());
    closeCartHandler();
  };

  return (
    <div className="cart">
      <div>
        <img
          src={Close}
          onClick={closeCartHandler}
          style={{ marginRight: "-90%" }}
          alt="close-icon"
        />
      </div>
      {state.length >= 1 ? (
        state.map((item) => (
          <div key={item.id} className="cart-card">
            <div style={{width: "40%"}}>
            <h2>
              Product Name:
            </h2>
            <h2 style={{fontWeight: "bolder"}}>
            {item.title}
            </h2>
            </div>
            <p>Price: {item.price} ₹</p>
            <button onClick={() => dispatch(deleteProduct(item.id))} style={{
              padding: "0.5rem",
              fontSize: "12px"
            }}>
              Delete Item
            </button>
          </div>
        ))
      ) : (
        <p>CART IS EMPTY</p>
      )}

      {state.length >= 1 && (
        <button className="order-btn" onClick={(e) => resetCart(e)}>
          Order
        </button>
      )}
    </div>
  );
};

export default Cart;
