import "./Home.css";
import React, { useEffect, useState } from "react";
import Sun from "../assets/sun.svg";
import Sort from "../assets/sort.svg";
import { projectFirestore } from "../firebase/config";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../redux/theme";
const Home = () => {
  const theme = useSelector((state) => state.theme.value);
  // console.log(theme.value);
  const dispatch = useDispatch();

  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);
  const [sorted, setsorted] = useState(null);
  const [unFilteredData, setunFilteredData] = useState(null);
  useEffect(() => {
    setIsPending(true);
    const unsub = projectFirestore.collection("products").onSnapshot(
      (snapshot) => {
        if (snapshot.empty) {
          setError("No products Found");
          setIsPending(false);
        } else {
          let results = [];
          snapshot.docs.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() });
          });
          setData(results);
          setunFilteredData(results);
          setIsPending(false);
        }
      },
      (err) => {
        setError(err.message);
        setIsPending(false);
      }
    );
    return () => {
      unsub();
    };
  }, []);
  const handleSort = () => {
    if (sorted) {
      setData([...unFilteredData]);
      setsorted(false);
    } else {
      var obj = [...data];
      obj.sort((a, b) => a.price - b.price);
      obj.map((item, i) => (
        <div key={i}>
          {" "}
          {item.matchID}
          {item.timeM} {item.description}
        </div>
      ));
      setData([...obj]);
      setsorted(true);
    }
  };
  const toggleMode = () => {
    let currValue = theme.value === "dark" ? "" : "dark";
    dispatch(
      changeTheme({
        value: currValue,
      })
    );
  };
  const darkClass = theme?.value ?? "";
  return (
    <div className={`home ${darkClass}`}>
      <div className="filters">
        <img src={Sun} alt="theme changer" onClick={toggleMode} className={`${darkClass === "dark" ? "dark-theme-button": ""}`}/>
        <button onClick={handleSort} className="sort-button">
          Sort by price
          <img src={Sort} alt="sort products" />
        </button>
      </div>
      {error && <p>{error}</p>}
      {isPending && <p>Data is loading....</p>}
      {data && <Card products={data} />}
    </div>
  );
};

export default Home;
