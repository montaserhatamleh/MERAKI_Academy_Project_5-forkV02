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
    {restaurants.map((elem,i)=>(
        <div key={i}>
            <h1>{elem.name}</h1>
            <h1>{elem.image_url}</h1>
            <h1>{elem.phone_number}</h1>
            <h1>{elem.rating}</h1>
            <h1>{elem.address}</h1>
        </div>
        
    ))}
  </div>;
}

export default Restaurants;
