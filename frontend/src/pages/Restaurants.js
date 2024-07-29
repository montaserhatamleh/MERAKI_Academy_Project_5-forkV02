import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

//nav
function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [filterCategory, setFilterCategory] = useState([]);
  const [search, setSearch] = useState("");

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  const categorySearch = (text) => {
    //if fetch all restaurants
    if (text == "All") {
      fetchAllRestaurants();
    }
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
    // function for Search 
    // const onSearch = restaurants.filter((elem) => {
    //   return elem.name.toLowerCase().includes(search.toLowerCase());
    // });

    fetchAllRestaurants();
  }, [search, restaurants]);
  return (
    <div>
      <Search >
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
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
          <MenuItem value={"All"}>All</MenuItem>
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
              <Paper>
                <Card sx={{ minWidth: 300, borderRadius: 2, boxShadow: 3 }}>
                  <CardContent>
                    <CardHeader
                      action={<IconButton aria-label="settings"></IconButton>}
                      title={elem.name}
                      style={{ textAlign: "center" }}
                    />
                    <div style={{ textAlign: "center" }}>
                      <img
                        src={elem.image_url}
                        alt={elem.name}
                        style={{
                          width: "200px",
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
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default Restaurants;
