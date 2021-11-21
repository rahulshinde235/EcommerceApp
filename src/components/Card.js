import "./Card.css";
import { addProduct } from "../redux/cart";

import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import Edit from "../assets/edit.svg";
import Delete from "../assets/delete.svg";
import { projectFirestore } from "../firebase/config";
import Modal from "../components/Modal";
const sofaImages = [
  "https://cdn.pixabay.com/photo/2016/11/18/17/20/living-room-1835923_960_720.jpg",
  "https://cdn.pixabay.com/photo/2017/08/02/01/01/living-room-2569325__340.jpg",
  "https://cdn.pixabay.com/photo/2017/03/19/01/43/living-room-2155376_960_720.jpg",
  "https://cdn.pixabay.com/photo/2014/09/15/21/46/couch-447484__340.jpg",
  "https://cdn.pixabay.com/photo/2016/11/30/08/48/bedroom-1872196__340.jpg",
  "https://cdn.pixabay.com/photo/2016/11/23/14/29/living-room-1853203__340.jpg",
  "https://cdn.pixabay.com/photo/2013/09/21/14/30/sofa-184551__340.jpg",
  "https://cdn.pixabay.com/photo/2017/06/13/22/43/interior-2400372__340.jpg",
];
const Card = ({ products }) => {
  const state = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [productID, setproductID] = useState(null);
  const [modalState, setmodalState] = useState(null);

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");

  const deleteHandler = (id) => {
    projectFirestore.collection("products").doc(id).delete();
    alert("Product deleted from store");
  };
  const editHandler = (id) => {
    setmodalState(true);
    setproductID(id);
    fetchData(id);
  };

  const fetchData = async (id) => {
    projectFirestore
      .collection("products")
      .doc(id)
      .get()
      .then((snapshot) => {
        setName(snapshot.data().title);
        setPrice(snapshot.data().price);
        setDesc(snapshot.data().desc);
        setRating(snapshot.data().rating);
      });
  };
  const formHandler = (e) => {
    e.preventDefault();

    projectFirestore.collection("products").doc(productID).update({
      title: name,
      desc,
      price,
      rating,
    });
    setproductID(null);
    setmodalState(false);
  };

  const handletoCart = (product) => {
    var data = state.find(function (ele) {
      return ele.id === product.id;
    });
    if (data) {
      alert("Orders  restricted to 1 item per person");
      /* vendors contains the element we're looking for */
    } else {
      dispatch(
        addProduct({
          title: product.title,
          price: product.price,
          id: product.id,
        })
      );
    }
  };
  return (
    <div className="card">
      {products.map((product, index) => (
        <div key={product.id} className="card-container">
          <div className="left-container">
            <img
              src={sofaImages[index]}
              alt="Product "
              style={{ width: "200px", height: "200px" }}
            />
            <div className="left-price">
              <h2>{product.title}</h2>
              <p> Price : {product.price} ₹</p>

              <br />
              <p>Rating :{product.rating}/5</p>
            </div>
            <div className="edit-container">
              <img
                src={Edit}
                alt="edit"
                onClick={() => editHandler(product.id)}
              />
              <img
                src={Delete}
                alt="delete"
                onClick={() => deleteHandler(product.id)}
              />
            </div>
          </div>
          <div className="right-container">
            <p>{product.desc}</p>
            <button
              onClick={() =>
                handletoCart({
                  id: product.id,
                  title: product.title,
                  price: product.price,
                })
              }
            >
              Add To Cart
            </button>
          </div>
        </div>
      ))}
      {modalState && (
        <Modal>
          <form onSubmit={formHandler} className="form">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label htmlFor="textarea">Description:</label>
            <textarea
              id="textarea"
              cols="30"
              rows="10"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              required
            />
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <label htmlFor="rating">rating</label>
            <input
              type="number"
              id="rating"
              onChange={(e) => setRating(e.target.value)}
              min="1"
              max="5"
              value={rating}
              required
            />
            <button>Submit</button>
          </form>
          <button
            className="close-btn"
            type="button"
            onClick={() => setmodalState(null)}
          >
            Close
          </button>
        </Modal>
      )}
    </div>
  );
};

export default Card;
