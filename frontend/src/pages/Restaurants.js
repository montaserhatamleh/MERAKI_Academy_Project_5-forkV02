import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios, { Axios } from "axios";
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
  Paper,
  CardHeader,
  IconButton,
  InputBase,
  CircularProgress,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAllRestaurants = () => {
    axios
      .get("http://localhost:5000/restaurants/")
      .then((result) => {
        setRestaurants(result.data.result);
        // console.log(result.data.result);
        setLoading(false);
      })
      .catch((err) => {
        console.log("fetch Restaurants not working", err);
        setLoading(false);
      });
  };
  const categorySearch = (text) => {
    //if fetch all restaurants
    if (text == "All") {
      fetchAllRestaurants();
    }
    axios
      .get(`http://localhost:5000/restaurants/byCategory/${text}`)
      .then((result) => {
        setRestaurants(result.data.result);
        // console.log(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const filteredRestaurantsByDeliveryFees = () => {
    axios
      .get(`http://localhost:5000/restaurants/getAllRestaurantByDeliveryFees`)
      .then((result) => {
        setRestaurants(result.data.result);
        // console.log(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const navigateRestaurantsById = (id) => {
    navigate(`/one/${id}`);
  };

  useEffect(() => {
    fetchAllRestaurants();
  }, []);

  const filteredRestaurants = restaurants.filter((elem) =>
    elem.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <CircularProgress />;

  if (error)
    return (
      <Typography variant="h6" color="error">
        {error}
      </Typography>
    );

  return (
    <div style={{ padding: "20px", backgroundColor:  ""}}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={3}
        p={1}
        bgcolor="white"
        boxShadow={2}
        borderRadius={2}
      >
        <TextField
          variant="outlined"
          placeholder="Search…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon />,
          }}
          sx={{ flex: 1, mr: 2 }}
        />
        <FormControl variant="outlined" sx={{ width: "400px", mr: 2 }}>
          <InputLabel id="category-select-label">Select Category</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            label="Select Category"
            onChange={(e) => categorySearch(e.target.value)}
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
          >
            <MenuItem value={"All"}>All</MenuItem>
            <MenuItem value={"Syrian"}>Syrian</MenuItem>
            <MenuItem value={"Lebanese"}>Lebanese</MenuItem>
            <MenuItem value={"Palestinian"}>Palestinian</MenuItem>
            <MenuItem value={"Jordanian"}>Jordanian</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          size="large"
          onClick={filteredRestaurantsByDeliveryFees}
          sx={{ height: "56px" }}
        >
          Sort Low Fees
        </Button>
      </Box>
      <Container maxWidth="md">
        <Grid container spacing={13}>
          {filteredRestaurants.map((elem, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Card
                onClick={() => navigateRestaurantsById(elem.id)}
                sx={{
                  minWidth: 300,
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: "transform 0.3s",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              >
                <CardHeader
                  action={<IconButton aria-label="settings"></IconButton>}
                  title={elem.name}
                  sx={{ textAlign: "center" }}
                />
                <CardContent>
                  <div style={{ textAlign: "center" }}>
                    <img
                      src={elem.image_url}
                      alt={elem.name}
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "8px",
                        maxHeight: "300px",
                        objectFit: "cover",
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
                    <strong>Delivery Fees:</strong> {elem.delivery_fees}
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
