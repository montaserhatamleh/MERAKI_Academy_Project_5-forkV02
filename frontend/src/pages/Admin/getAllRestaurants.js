import React, { useEffect, useState } from 'react'
import axios from "axios";
import {
    Button,
    Container,
    List,
    ListItem,
    ListItemText,
    Typography,
    Box,
  } from "@mui/material";

const GetAllRestaurants = ()=> {
    const [restaurants , setRestaurants]=useState([]);
    const getAllRestaurants = async () => {
        try {
          const result = await axios.get(`http://localhost:5000/restaurants/`)
          console.log(result)
          setRestaurants(result.data.result);
        } catch (err) {
          console.log(err);
        }
      };
    
    
    const deletedRestaurant = async (id)=>{
        try{
        const deleted = await axios.put(`http://localhost:5000/restaurants/deleteRestaurant/${id}`)  
         setRestaurants(restaurants.filter((ele)=> ele.id!== id))    
       }catch(err){ 
        console.log(err) ; 
    }  }

      useEffect(()=>{
        getAllRestaurants() ; 
      },[])


    return (
       <>
        <Container
        maxWidth="lr"
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
  
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <Typography variant="h5" gutterBottom>
          All Restaurants
        </Typography>
        <List sx={{ width: "100%" }}>
          <ListItem
            sx={{
              display: "flex",
              alignItems: "center",
              borderBottom: "1px solid black",
            }}
          >
            <ListItemText primary="Name" sx={{ flex: 1, fontWeight: "bold" }} />
            <ListItemText primary="Category" sx={{ flex: 1, fontWeight: "bold" }} />
            <ListItemText primary="Phone" sx={{ flex: 1, fontWeight: "bold" }} />
            <Box sx={{ flex: 1 }} />
          </ListItem>
          {restaurants.map((restaurant) => (
            <ListItem
              key={restaurant.id}
              sx={{
                display: "flex",
                alignItems: "center",
                borderBottom: "1px solid #ddd",
                padding: "11px",
              }}
            >
              <ListItemText primary={restaurant.name} sx={{ flex: 1 }} />
              <ListItemText primary={restaurant.category} sx={{ flex: 1 }} />
              <ListItemText primary={restaurant.phone_number} sx={{ flex: 1 }} />
              <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
                <Button
                 onClick={()=>deletedRestaurant(restaurant.id)}
                  variant="contained"
                  color="primary"
                  sx={{ marginRight: "10px" }}
                >
                 Delete
                </Button>
              </Box>
            </ListItem>
          ))}
        </List>
      </Container>
     
      </>
    )

}

export default GetAllRestaurants