import "./Navbar.css";
import { Link } from "react-router-dom";
import Brand from "../assets/brand.jpg";
import CartImage from "../assets/cart.svg";
import Profile from "../assets/profile.svg";
import { useSelector } from "react-redux";
import { useState } from "react";
import Cart from "./Cart";

const Navbar = () => {
  const state = useSelector((state) => state.cart);
  const theme = useSelector((state) => state.theme.value);

  const [cartOpen, setcartOpen] = useState(false);
  const closeCartHandler = () => {
    setcartOpen(false);
  };
  return (
    <div className={`navbar${theme.value}`}>
      <div className="navbar-left">
        <img src={Brand} alt="company logo" width="80px" height="80px" />
        <Link to="/">Products</Link>
        <Link to="/create">Add a product</Link>
      </div>
      <div className="navbar-right">
        <div className="wrapper">
          <img
            src={CartImage}
            alt="shopping cart"
            onClick={() => setcartOpen(true)}
          />

          <span className="cart-count"> {state.length} </span>
        </div>
        <p>John Doe</p>
        <img src={Profile} alt="profile pic" />
      </div>
      {cartOpen && <Cart closeCartHandler={closeCartHandler} />}
    </div>
  );
};

export default Navbar;
