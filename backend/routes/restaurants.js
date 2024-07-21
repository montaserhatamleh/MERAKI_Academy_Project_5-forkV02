const express = require("express");
const restaurantRouter = express.Router();
const {
  getAllRestaurant,
  getRestaurantHigherRating,
  getRestaurantById,
} = require("../controllers/restaurants");
restaurantRouter.get("/", getAllRestaurant);
restaurantRouter.get("/getByRating", getRestaurantHigherRating);
restaurantRouter.get("/:id", getRestaurantById);

module.exports = restaurantRouter;
