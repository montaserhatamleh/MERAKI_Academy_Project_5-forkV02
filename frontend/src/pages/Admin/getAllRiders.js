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

const GetAllRiders = ()=> {
    const [riders , setRiders]=useState([]);
    const getAllRiders = async () => {
        try {
          const result = await axios.get(`http://localhost:5000/riders/all`)
          console.log(result)
          setRiders(result.data.result);
        } catch (err) {
          console.log(err);
        }
      };
    
    
    const deletedRiders = async (id)=>{
        console.log(id)
        try{
        const deleted = await axios.put(`http://localhost:5000/riders/deleted/${id}`)  
         setRiders(riders.filter((ele)=> ele.id!== id))    
       }catch(err){ 
        console.log(err) ; 
    }  }

      useEffect(()=>{
        getAllRiders() ; 
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
          All Riders
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
            <ListItemText primary="Last Name" sx={{ flex: 1, fontWeight: "bold" }} />
            <ListItemText primary="Phone" sx={{ flex: 1, fontWeight: "bold" }} />
            <Box sx={{ flex: 1 }} />
          </ListItem>
          {riders.map((rider) => (
            <ListItem
              key={rider.id}
              sx={{
                display: "flex",
                alignItems: "center",
                borderBottom: "1px solid #ddd",
                padding: "11px",
              }}
            >
              <ListItemText primary={rider.first_name} sx={{ flex: 1 }} />
              <ListItemText primary={rider.last_name} sx={{ flex: 1 }} />
              <ListItemText primary={rider.phone_number} sx={{ flex: 1 }} />
              <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
                <Button
                 onClick={()=>deletedRiders(rider.id)}
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

export default GetAllRiders