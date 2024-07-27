import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const fetchAllRestaurants = () => {
    axios
      .get("http://localhost:5000/restaurants/")
      .then((result) => {
        setRestaurants(result.data.result);
        console.log(result.data.result);
      })
      .catch((err) => {
        console.log("fetch Restaurants not working", err);
      });
  };
  useEffect(() => {
    fetchAllRestaurants();
  }, []);
  return <div>

  </div>;
}

export default Restaurants;
