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
  Menu,
  MenuItem,
  Autocomplete,
  TextField,
  FormControl,
  InputLabel,
  Select,
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
  const [filterCategory, setFilterCategory] = useState([]);
  // const [search, setSearch] = useState("");

  const categorySearch = (text) => {


    axios
      .get(`http://localhost:5000/restaurants/byCategory/${text}`)
      .then((result) => {
        // setFilterCategory(result.data.result);
        setRestaurants(result.data.result);
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchAllRestaurants = () => {
    
    axios
      .get("http://localhost:5000/restaurants/")
      .then((result) => {
        setRestaurants(result.data.result);
        // console.log(result.data.result);
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
      <FormControl
        variant="outlined"
        sx={{ mt: 4, ml: 5, width: "150px", color: "white" }}
      >
        <InputLabel id="demo-simple-select-label" xs={{ color: "white" }}>
          Select Category
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Select an Option"
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "primary.main",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "primary.dark",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "primary.light",
            },
          }}
          onChange={(e) => {
            categorySearch(e.target.value);
          }}
        >
          <MenuItem value={"Italian"}>Italian</MenuItem>
          <MenuItem value={"Chinese"}>Chinese</MenuItem>
          <MenuItem value={"Mexican"}>Mexican</MenuItem>
          <MenuItem value={"Indian"}>Indian</MenuItem>
          <MenuItem value={"American"}>American</MenuItem>
          <MenuItem value={"French"}>French</MenuItem>
          <MenuItem value={"Japanese"}>Japanese</MenuItem>
          <MenuItem value={"Korean"}>Korean</MenuItem>
        </Select>
      </FormControl>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Grid container spacing={15}>
          {restaurants.map((elem, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Card sx={{ minWidth: 300, borderRadius: 2, boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    {elem.name}
                  </Typography>
                  <div style={{ textAlign: "center" }}>
                    <img
                      src={elem.image_url}
                      alt={elem.name}
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "8px",
                      }}
                    />
                  </div>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 2 }}
                  >
                    <strong>Phone:</strong> {elem.phone_number}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Rating:</strong> {elem.rating}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Category:</strong> {elem.category}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default Restaurants;
