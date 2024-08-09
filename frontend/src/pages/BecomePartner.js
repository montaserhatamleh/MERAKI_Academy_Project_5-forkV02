import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Container, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import order from "../assets/images/owner.webp"

const BecomePartner = () => {
  const [restaurant, setRestaurant] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    address: "",
    phone_number: "",
    category: "",
    restaurant_name: "",
    restaurant_address: "",
    restaurant_phone_number: "",
    delivery_fees: "",
    image: null 
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setRestaurant({ ...restaurant, image: files[0] });
    } else {
      setRestaurant({ ...restaurant, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(restaurant).forEach((key) => {
      formData.append(key, restaurant[key]);
    });
    try {
      const result = await axios.post('http://localhost:5000/users/restaurantOwnerRegistration', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(result.data.message);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Error during registration:', error);
      if (error.response && error.response.data.message) {
        setMessage(error.response.data.message);
        console.log(error.response.data.message);
      } else {
        setMessage('An unexpected error occurred. Please try again.');
      }
    }
  };

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
       item
       xs={false}
       sm={4}
       md={7}
       sx={{
         backgroundImage:
           `url(${order})`,
         backgroundColor: (t) =>
           t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
         backgroundSize: 'cover',
         backgroundPosition: 'left',
       }}
     />
     <Grid style={{display:"flex" , justifyContent:"center"}} item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <Box
        sx={{
          backgroundColor: "white",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
      
        }}
      >
        <Typography component="h1" variant="h5" color="black">
          Become a Partner
        </Typography>
        {message && <Typography color="error">{message}</Typography>}
        <Box component="form" onSubmit={(e) => e.preventDefault()} sx={{ mt: 1 }}>
         <Box style={{  display: "flex",
          gap:"10px" ,
          alignItems: "center",}}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="username"
            label="Username"
            value={restaurant.username}
            onChange={handleChange}
            InputProps={{
              style: { color: 'black' }
            }}
            InputLabelProps={{
              style: { color: 'black' }
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email Address"
            value={restaurant.email}
            onChange={handleChange}
            InputProps={{
              style: { color: 'black' }
            }}
            InputLabelProps={{
              style: { color: 'black' }
            }}
          />
          </Box>
          <Box style={{  display: "flex",
          gap:"10px" ,
          alignItems: "center",}}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="first_name"
            label="First Name"
            value={restaurant.first_name}
            onChange={handleChange}
            InputProps={{
              style: { color: 'black' }
            }}
            InputLabelProps={{
              style: { color: 'black' }
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="last_name"
            label="Last Name"
            value={restaurant.last_name}
            onChange={handleChange}
            InputProps={{
              style: { color: 'black' }
            }}
            InputLabelProps={{
              style: { color: 'black' }
            }}
          />
          </Box>
          <Box style={{  display: "flex",
          gap:"10px" ,
          alignItems: "center"}}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="address"
            label="Address"
            value={restaurant.address}
            onChange={handleChange}
            InputProps={{
              style: { color: 'black' }
            }}
            InputLabelProps={{
              style: { color: 'black' }
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="phone_number"
            label="Phone Number"
            value={restaurant.phone_number}
            onChange={handleChange}
            InputProps={{
              style: { color: 'black' }
            }}
            InputLabelProps={{
              style: { color: 'black' }
            }}
          />
          </Box>
          <Box style={{  display: "flex",
          gap:"10px" ,
          alignItems: "center"}} >
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel style={{ color: 'black' }}>Category</InputLabel>
            <Select
              name="category"
              value={restaurant.category}
              onChange={handleChange}
              label="Category"
              sx={{ color: 'black', borderColor: 'black' }}
              InputLabelProps={{
                style: { color: 'black' }
              }}
            >
              <MenuItem value="Lebanese">Lebanese</MenuItem>
              <MenuItem value="Syrian">Syrian</MenuItem>
              <MenuItem value="Palestinian">Palestinian</MenuItem>
              <MenuItem value="Jordanian">Jordanian</MenuItem>
              <MenuItem value="Egyptian">Egyptian</MenuItem>
            </Select>
          </FormControl>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="restaurant_name"
            label="Restaurant Name"
            value={restaurant.restaurant_name}
            onChange={handleChange}
            InputProps={{
              style: { color: 'black' }
            }}
            InputLabelProps={{
              style: { color: 'black' }
            }}
          />
          </Box>

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={restaurant.password}
            onChange={handleChange}
            InputProps={{
              style: { color: 'black' }
            }}
            InputLabelProps={{
              style: { color: 'black' }
            }}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="restaurant_address"
            label="Restaurant Address"
            value={restaurant.restaurant_address}
            onChange={handleChange}
            InputProps={{
              style: { color: 'black' }
            }}
            InputLabelProps={{
              style: { color: 'black' }
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="restaurant_phone_number"
            label="Restaurant Phone Number"
            value={restaurant.restaurant_phone_number}
            onChange={handleChange}
            InputProps={{
              style: { color: 'black' }
            }}
            InputLabelProps={{
              style: { color: 'black' }
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="delivery_fees"
            label="Delivery Fees"
            type="number"
            value={restaurant.delivery_fees}
            onChange={handleChange}
            InputProps={{
              style: { color: 'black' }
            }}
            InputLabelProps={{
              style: { color: 'black' }
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="image"
            type="file"
            onChange={handleChange}
            InputLabelProps={{
              
            }}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
            style={{ color: 'white' }}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Grid>
    </Grid>
    </ThemeProvider>
  );
};

export default BecomePartner;
