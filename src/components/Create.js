import "./Create.css";
import React, { useState } from "react";
import { projectFirestore } from "../firebase/config";

const Create = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");

  const formHandler = (e) => {
    e.preventDefault();
    const data = {
      title: name,
      desc,
      price,
      rating,
    };
    projectFirestore.collection("products").add(data);
    alert("Product added to store");
    setName("");
    setDesc("");
    setPrice("");
    setRating("");
  };
  return (
    <div className="create">
      <form onSubmit={formHandler}>
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
    </div>
  );
};

export default Create;
