import "./Navbar.css";
import Brand from "../assets/brand.jpg";
import CartImage from "../assets/cart.svg";
import Profile from "../assets/profile.svg";
import { useSelector } from "react-redux";
import { useState } from "react";
import Cart from "./Cart";
import Button from "./Button";

const Navbar = () => {
  const state = useSelector((state) => state.cart);
  const theme = useSelector((state) => state.theme.value);
  console.log({theme});

  const [cartOpen, setcartOpen] = useState(false);
  const closeCartHandler = () => {
    setcartOpen(false);
  };
  return (
    <div className={`navbar ${theme?.value ?? ""}`}>
      <div className="navbar-left">
        <div className="brand-image-container">
          <img src={Brand} alt="company logo" width="80px" height="80px" className="brand-image"/>
        </div>
        <Button link="/">Products</Button>
        <Button link="/create">Add a product</Button>
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
