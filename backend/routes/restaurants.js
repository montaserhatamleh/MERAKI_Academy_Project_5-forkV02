const express = require("express");
const restaurantRouter = express.Router();
const { getAllRestaurant , getRestaurantHigherRating} = require("../controllers/restaurants");
restaurantRouter.get("/", getAllRestaurant);
restaurantRouter.get("/getByRating", getRestaurantHigherRating)

module.exports = restaurantRouter;
