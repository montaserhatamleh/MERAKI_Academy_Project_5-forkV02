import React, { useState, useContext, useEffect } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Rating,
  Container,
  Grid,
} from "@mui/material";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

//nav
//params

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
  return (
    <div>
      <Container maxWidth={100}>
        <Grid container spacing={3} margin={2} padding={2}>
          {restaurants.map((elem) => (
            <Grid item>
              <Card sx={{ minWidth: 300 }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {elem.name}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    <img src={elem.image_url} />
                  </Typography>
                  <Typography variant="body2">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* {restaurants.map((elem, i) => (
        <div key={i}>
          <h1>{elem.name}</h1>
          <h1>{elem.image_url}</h1>
          <h1>{elem.phone_number}</h1>
          <h1>{elem.rating}</h1>
          <h1>{elem.address}</h1>
        </div>
      ))} */}
    </div>
  );
}

export default Restaurants;
