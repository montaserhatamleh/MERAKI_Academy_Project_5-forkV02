import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { TextField, Button, Container, Box, Typography } from '@mui/material';

const UpdateItem = () => {
  const { id } = useParams();
  const token = useSelector(state => state.auth.token);
  const [item, setItem] = useState({
    name: '',
    description: '',
    price: '',
    sub_category: '',
    available: true,
    image_url: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getItemInfo = async () => {
      try {
        const result = await axios.get(`http://localhost:5000/items/getItemById/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setItem(result.data.result);
      } catch (error) {
        setMessage('Error loading item information.');
      }
    };
    getItemInfo();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setItem({ ...item, image_url: files[0] });
    } else {
      setItem({ ...item, [name]: value });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(item).forEach((key) => {
      formData.append(key, item[key]);
    });
    try {
      const result = await axios.put(`http://localhost:5000/items/updateItems/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      });
      setMessage('Item updated successfully!');
      navigate('/restaurant_owner/view-item');
    } catch (error) {
      setMessage('Error updating item.');
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">Update Item</Typography>
        {message && <Typography color="error">{message}</Typography>}
        <Box component="form" sx={{ mt: 3 }} onSubmit={handleUpdate}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="name"
            label="Item Name"
            value={item.name}
            onChange={handleChange}
            InputProps={{ style: { color: 'white' } }}
            InputLabelProps={{ style: { color: 'white' } }}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="description"
            label="Description"
            value={item.description}
            onChange={handleChange}
            multiline
            rows={4}
            InputProps={{ style: { color: 'white' } }}
            InputLabelProps={{ style: { color: 'white' } }}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="price"
            label="Price"
            type="number"
            value={item.price}
            onChange={handleChange}
            InputProps={{ style: { color: 'white' } }}
            InputLabelProps={{ style: { color: 'white' } }}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="sub_category"
            label="Sub Category"
            value={item.sub_category}
            onChange={handleChange}
            InputProps={{ style: { color: 'white' } }}
            InputLabelProps={{ style: { color: 'white' } }}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="available"
            label="Available"
            value={item.available ? "Available" : "Not Available"}
            onChange={handleChange}
            InputProps={{ style: { color: 'white' } }}
            InputLabelProps={{ style: { color: 'white' } }}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="image"
            label="Item Image"
            type="file"
            onChange={handleChange}
            InputLabelProps={{ style: { color: 'white' } }}
            sx={{ marginBottom: 2 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            style={{ color: 'white' }}
          >
            Update Item
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default UpdateItem;
