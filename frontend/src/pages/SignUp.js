import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import order from "../assets/images/order.jpg"
const SignUp = () => {
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    address: "",
    phone_number: "",
  });
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  
  const handleSignUp = async () => {
    try {
      const result = await axios.post('http://localhost:5000/users/signup', user);
      setMessage(result.data.message);
      setTimeout(() => {
        navigate('/signin');
      }, 2000);
    } catch (error) {
      console.error('Error during login:', error);
      if (error.response && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('An unexpected error occurred. Please try again.');
      }    }
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
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width:"70%", 
              justifyContent:"center"

            }}
          >
        <Typography component="h1" variant="h5" color="black">
          Sign Up
        </Typography>
        {message && <Typography color="error">{message}</Typography>}
        <Box component="form" onSubmit={(e) => e.preventDefault()}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={user.email}
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
            name="username"
            label="Username"
            value={user.username}
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
            name="password"
            label="Password"
            type="password"
            value={user.password}
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
            name="first_name"
            label="First Name"
            value={user.first_name}
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
            value={user.last_name}
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
            name="address"
            label="Address"
            value={user.address}
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
            value={user.phone_number}
            onChange={handleChange}
            InputProps={{
              style: { color: 'black' }
            }}
            InputLabelProps={{
              style: { color: 'black' }
            }}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSignUp}
            InputProps={{
              style: { color: 'black' }
            }}
            InputLabelProps={{
              style: { color: 'black' }
            }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
      </Grid>
      </Grid>
      </ThemeProvider>

  );
};

export default SignUp;
