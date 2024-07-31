import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

const OneRest = () => {
  const { id } = useParams();
  console.log(id);
  const [restaurantsById, setRestaurantsById] = useState([]);

  const fetchRestaurantsInfoById = (id) => {
    axios
      .get(`http://localhost:5000/restaurants/allInfo/${id}`)
      .then((result) => {
        setRestaurantsById(result.data);
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchRestaurantsInfoById(id);
  }, [id]);

  return <>
   
  </>;
};

export default OneRest;
