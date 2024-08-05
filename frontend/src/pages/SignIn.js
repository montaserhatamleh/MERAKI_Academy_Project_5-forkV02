import React, { useState } from "react";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken, setUserId, setRole } from "../redux/auth";
import { useNavigate } from "react-router-dom";
import GoogleLogIn from "../components/GoogleLogIn";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });

      const { token, user, role } = response.data;

      dispatch(setToken(token));
      dispatch(setUserId(user));
      dispatch(setRole(role));

      navigate("/restaurants");
    } catch (error) {
      console.error("Error during login:", error);
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          width: "100%",
          backgroundColor: "white",
          padding: "20px",
          margin: "auto",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          borderRadius: "8px",
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "500px",
          marginBottom: "50px",
        }}
      >
        <Typography component="h1" variant="h5" color="black">
          Sign In
        </Typography>
        {errorMessage && (
          <Typography color="error" variant="body2">
            {errorMessage}
          </Typography>
        )}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              style: { color: "black" },
            }}
            InputLabelProps={{
              style: { color: "black" },
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
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              style: { color: "black" },
            }}
            InputLabelProps={{
              style: { color: "black" },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
        <GoogleLogIn />
      </Box>
    </Container>
  );
};

export default Signin;
