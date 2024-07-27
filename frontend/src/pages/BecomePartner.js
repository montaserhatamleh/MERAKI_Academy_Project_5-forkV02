import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Container, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';

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
      } else {
        setMessage('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Become a Partner
        </Typography>
        {message && <Typography color="error">{message}</Typography>}
        <Box component="form" onSubmit={(e) => e.preventDefault()} sx={{ mt: 1 }}>
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
              style: { color: 'white' }
            }}
            InputLabelProps={{
              style: { color: 'white' }
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
              style: { color: 'white' }
            }}
            InputLabelProps={{
              style: { color: 'white' }
            }}
          />
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
              style: { color: 'white' }
            }}
            InputLabelProps={{
              style: { color: 'white' }
            }}
          />
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
              style: { color: 'white' }
            }}
            InputLabelProps={{
              style: { color: 'white' }
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
              style: { color: 'white' }
            }}
            InputLabelProps={{
              style: { color: 'white' }
            }}
          />
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
              style: { color: 'white' }
            }}
            InputLabelProps={{
              style: { color: 'white' }
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
              style: { color: 'white' }
            }}
            InputLabelProps={{
              style: { color: 'white' }
            }}
          />
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel style={{ color: 'white' }}>Category</InputLabel>
            <Select
              name="category"
              value={restaurant.category}
              onChange={handleChange}
              label="Category"
              sx={{ color: 'white', borderColor: 'white' }}
              InputLabelProps={{
                style: { color: 'white' }
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
              style: { color: 'white' }
            }}
            InputLabelProps={{
              style: { color: 'white' }
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
              style: { color: 'white' }
            }}
            InputLabelProps={{
              style: { color: 'white' }
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
              style: { color: 'white' }
            }}
            InputLabelProps={{
              style: { color: 'white' }
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
              style: { color: 'white' }
            }}
            InputLabelProps={{
              style: { color: 'white' }
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="image"
            label="Restaurant Image"
            type="file"
            onChange={handleChange}
            InputLabelProps={{
              style: { color: 'white' }
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
    </Container>
  );
};

export default BecomePartner;
