import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  Button,
  Typography,
  Container,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TextField,
  CircularProgress,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAllRestaurants();
  }, []);

  useEffect(() => {
    if (category === "All") {
      fetchAllRestaurants();
    } else {
      categorySearch(category);
    }
  }, [category]);

  const fetchAllRestaurants = () => {
    axios
      .get("http://localhost:5000/restaurants/")
      .then((result) => {
        setRestaurants(result.data.result);
        setLoading(false);
      })
      .catch((err) => {
        console.log("fetch Restaurants not working", err);
        setError("Error fetching restaurants");
        setLoading(false);
      });
  };

  const categorySearch = (text) => {
    axios
      .get(`http://localhost:5000/restaurants/byCategory/${text}`)
      .then((result) => {
        setRestaurants(result.data.result);
      })
      .catch((err) => {
        console.log(err);
        setError("Error fetching restaurants by category");
      });
  };

  const filteredRestaurantsByDeliveryFees = () => {
    axios
      .get(`http://localhost:5000/restaurants/getAllRestaurantByDeliveryFees`)
      .then((result) => {
        setRestaurants(result.data.result);
      })
      .catch((err) => {
        console.log(err);
        setError("Error fetching restaurants by delivery fees");
      });
  };

  const filteredRestaurants = restaurants.filter((elem) =>
    elem.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <CircularProgress size={80} />
      </Box>
    );

  if (error)
    return (
      <Typography variant="h6" color="error">
        {error}
      </Typography>
    );

  return (
    <div style={{ padding: "20px"}}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={3}
        p={1}
        bgcolor=""
        boxShadow={2}
        borderRadius={2}
      >
        <TextField
          variant="outlined"
          placeholder="Search…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
            endAdornment: search && (
              <InputAdornment position="end">
                <IconButton onClick={() => setSearch("")} edge="end">
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ flex: 1, mr: 2 }}
        />
        <FormControl variant="outlined" sx={{ width: "200px", mr: 2 }}>
          <InputLabel id="category-select-label">Select Category</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            label="Select Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Syrian">Syrian</MenuItem>
            <MenuItem value="Lebanese">Lebanese</MenuItem>
            <MenuItem value="Palestinian">Palestinian</MenuItem>
            <MenuItem value="Jordanian">Jordanian</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          size="large"
          onClick={filteredRestaurantsByDeliveryFees}
          sx={{ color: 'white',  backgroundColor: "#2E7D32", fontWeight: '500', borderRadius: '20px', '&:hover': { backgroundColor: '#388e3c', color: '#ffd700' } }}
        >
          Sort Low Fees
        </Button>
      </Box>
      <Container maxWidth="md">
        <Grid container spacing={13}>
          {filteredRestaurants.map((elem, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Card
                onClick={() => navigate(`/one/${elem.id}`)}
                sx={{
                  minWidth: 300,
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: "transform 0.3s",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              >
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

export default Restaurants