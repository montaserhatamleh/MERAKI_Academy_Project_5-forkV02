const express = require("express");
const restaurantRouter = express.Router();
const {
  getAllRestaurant,
  getRestaurantHigherRating,
  getRestaurantById,
  getAllRestaurantByCategory,
} = require("../controllers/restaurants");

restaurantRouter.get("/", getAllRestaurant);

restaurantRouter.get("/getByRating", getRestaurantHigherRating);

restaurantRouter.get("/RestaurantById/:id", getRestaurantById);

restaurantRouter.get("/byCategory", getAllRestaurantByCategory);

module.exports = restaurantRouter;
