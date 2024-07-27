import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import axios from 'axios';

const BecomeRider = () => {
  const [rider, setRider] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    address: "",
    phone_number: "",
    vehicle_details: ""
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setRider({ ...rider, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post('http://localhost:5000/users/riderRegistration', rider);
      setMessage(result.data.message);
      setTimeout(() => {
        navigate('/');
      }, 2000); // Redirect after 2 seconds
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
          Become a Rider
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
            value={rider.username}
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
            value={rider.email}
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
            value={rider.password}
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
            value={rider.first_name}
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
            value={rider.last_name}
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
            value={rider.address}
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
            value={rider.phone_number}
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
            name="vehicle_details"
            label="Vehicle Details"
            value={rider.vehicle_details}
            onChange={handleChange}
            InputProps={{
              style: { color: 'white' }
            }}
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

export default BecomeRider;
