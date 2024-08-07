import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Box,
  Button,
  Modal,
  IconButton,
  Rating,
  Badge,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
  

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  padding: theme.spacing(1),
  borderRadius: '50%',
  boxShadow: theme.shadows[2],
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
    boxShadow: theme.shadows[6],
    transform: 'scale(1.1)',
    transition: 'transform 0.2s ease-in-out',
  },
  '&:active': {
    transform: 'scale(1.05)',
  }
}));

const RestaurantDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [warningModal, setWarningModal] = useState(false);
  const [loginPromptModal, setLoginPromptModal] = useState(false);
  const [newItem, setNewItem] = useState(null);
  const [cartRestaurantId, setCartRestaurantId] = useState(null);

  useEffect(() => {
    getRestaurantData();
    if (token) getCartData();
  }, [id, token, newItem]);

  const getRestaurantData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/restaurants/allInfo/${id}`
      );
      setRestaurant(response.data.restaurant);
      setLoading(false);
    } catch (err) {
      setError("Failed to get restaurant data.");
      setLoading(false);
    }
  };

  const getCartData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/carts/elements", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(response.data.cart);
      console.log(response.data.cart);
      if (response.data.cart.length > 0) {
        setCartRestaurantId(response.data.cart[0].restaurant_id);
      }
    } catch (error) {
      console.error("Error getting cart data", error);
    }
  };

  const addItemToCart = async (item) => {
    if (!token) {
      setLoginPromptModal(true);
      return;
    }

    if (cartRestaurantId && cartRestaurantId !== item.restaurant_id) {
      setNewItem(item);
      setWarningModal(true);
    } else {
      await handleAddItem(item);
    }
  };

  const handleAddItem = async (item) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/carts",
        { menu_item_id: item.id, quantity: 1, restaurant_id: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (cartRestaurantId !== id) {
        setCartItems([]);
      }
      setCartItems((prevCartItems) => {
        const itemIds = prevCartItems.map((cartItem) => cartItem.menu_item_id);
        if (itemIds.includes(item.id)) {
          return prevCartItems;
        } else {
          return [...prevCartItems, response.data.cart_item];
        }
      });
      setCartRestaurantId(id);
      setWarningModal(false);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const handleConfirmReplace = async () => {
    await handleAddItem(newItem);
    setWarningModal(false);
  };

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
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4, 
        }}
      >
        <Typography variant="h4" gutterBottom color="black">
          {restaurant.name}
        </Typography>
        {token && (
          <StyledIconButton onClick={() => navigate("/my_cart")}>
            <Badge badgeContent={cartItems.length} color="error">
              <ShoppingCartIcon fontSize="large" />
            </Badge>
          </StyledIconButton>
        )}
      </Box>

      <Box sx={{ display: "flex", mb: 4, alignItems: "flex-start" }}>
        <img
          src={restaurant.image_url}
          alt={restaurant.name}
          style={{
            width: "200px",
            height: "200px",
            borderRadius: "8px", 
            marginRight: "24px",
            objectFit: "cover",
          }}
        />
        <Box>
          <Typography variant="body1" gutterBottom color="black">
            <strong>Address:</strong> {restaurant.address}
          </Typography>
          <Typography variant="body1" gutterBottom color="black">
            <strong>Category:</strong> {restaurant.category}
          </Typography>
          <Typography variant="body1" gutterBottom color="black">
            <strong>Phone:</strong> {restaurant.phone_number}
          </Typography>
          <Typography variant="body1" gutterBottom color="black">
            <strong>Delivery Fees:</strong> ${restaurant.delivery_fees}
          </Typography>
          <Typography variant="body1" gutterBottom color="black">
            <strong>Rating:</strong>
            <Rating
              name={`average-rating-${restaurant.id}`}
              value={restaurant.average_rating}
              precision={0.1}
              size="large"
              sx={{ mt: 1 }}
            />{" "}
            ({restaurant.rating_count})
          </Typography>
        </Box>
      </Box>

      <Typography variant="h5" gutterBottom color="black">
        Menu
      </Typography>

      {Object.keys(restaurant.menu_items).map((category) => (
        <Box key={category} sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom color="black">
            {category}
          </Typography>
          <Grid container spacing={2}>
            {restaurant.menu_items[category].map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card
                  sx={{
                    minWidth: 300,
                    borderRadius: 2,
                    boxShadow: 3,
                    transition: "transform 0.3s",
                    "&:hover": { transform: "scale(1.05)" },
                    overflow: "hidden", 
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={item.image_url || "default_image_url.jpg"}
                    alt={item.name}
                    sx={{ objectFit: "cover" }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {item.description}
                    </Typography>
                    <Typography variant="body1" color="textPrimary">
                      ${item.price}
                    </Typography>
                    <Typography
                      variant="body2"
                      color={item.available ? "success.main" : "error.main"}
                    >
                      {item.available ? "Available" : "Not Available"}
                    </Typography>
                    {item.available && (
                      <IconButton
                        color="primary"
                        onClick={() => addItemToCart(item)}
                        sx={{ mt: 1 }}
                      >
                        <AddShoppingCartIcon />
                      </IconButton>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}

      <Modal open={warningModal} onClose={() => setWarningModal(false)}>
        <Box
          sx={{
            padding: 3,
            backgroundColor: "background.paper",
            borderRadius: 2,
            width: 400,
            mx: "auto",
            mt: 10,
            boxShadow: 3,
          }}
        >
          <Typography variant="body1" gutterBottom>
            Adding this item will replace the current items in your cart from a
            different restaurant. Do you want to proceed?
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 2,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleConfirmReplace}
            >
              Yes
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setWarningModal(false)}
            >
              No
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal open={loginPromptModal} onClose={() => setLoginPromptModal(false)}>
        <Box
          sx={{
            padding: 3,
            backgroundColor: "background.paper",
            borderRadius: 2,
            width: 400,
            mx: "auto",
            mt: 10,
            boxShadow: 3,
          }}
        >
          <Typography variant="body1" gutterBottom>
            You need to be logged in to add items to the cart. Please log in to
            continue.
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 2,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/signin")}
            >
              Sign In
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setLoginPromptModal(false)}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default RestaurantDetails;
