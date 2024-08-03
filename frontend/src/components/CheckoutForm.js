import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import axios from 'axios';

const CheckoutForm = ({ totalAmount, createOrder }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(`http://localhost:5000/create-payment-intent/pay`, {
        amount: totalAmount * 100,
        currency: 'usd',
      });

      const clientSecret = data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: credentials.name,
            email: credentials.email,
            phone: credentials.phone,
            address: {
              line1: credentials.address,
            },
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
        console.error('Payment failed:', result.error.message);
      } else {
        console.log('Payment succeeded:', result.paymentIntent);
        createOrder();
      }
    } catch (error) {
      setError(error.message);
      console.error('Error:', error);
    }

    setLoading(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        fullWidth
        label="Name"
        name="name"
        value={credentials.name}
        onChange={handleInputChange}
        required
        sx={{ mb: 2 }}
        InputLabelProps={{ style: { color: 'black' } }}
      />
      <TextField
        fullWidth
        label="Email"
        name="email"
        type="email"
        value={credentials.email}
        onChange={handleInputChange}
        required
        sx={{ mb: 2 }}
        InputLabelProps={{ style: { color: 'black' } }}
      />
      <TextField
        fullWidth
        label="Phone"
        name="phone"
        value={credentials.phone}
        onChange={handleInputChange}
        required
        sx={{ mb: 2 }}
        InputLabelProps={{ style: { color: 'black' } }}
      />
      <TextField
        fullWidth
        label="Address"
        name="address"
        value={credentials.address}
        onChange={handleInputChange}
        required
        sx={{ mb: 2 }}
        InputLabelProps={{ style: { color: 'black' } }}
      />
      <Typography variant="h6" sx={{ mb: 2 }}>
        Total Amount: ${totalAmount.toFixed(2)}
      </Typography>
      <Box sx={{ mb: 2 }}>
        <CardElement options={{ hidePostalCode: true }} />
      </Box>
      <Button type="submit" variant="contained" color="primary" disabled={!stripe || loading}>
        {loading ? 'Processing...' : 'Pay Now And Submit Order'}
      </Button>
    </Box>
  );
};

export default CheckoutForm;
