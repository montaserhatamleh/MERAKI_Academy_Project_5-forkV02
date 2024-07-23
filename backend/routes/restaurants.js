const express = require("express");
const restaurantRouter = express.Router();
const {
  getAllRestaurant,
  getRestaurantHigherRating,
  getRestaurantById,
  getAllRestaurantByCategory,
  updateRestaurantById,
  getRestaurantInfoById
} = require("../controllers/restaurants");

restaurantRouter.get("/", getAllRestaurant);

restaurantRouter.get("/getByRating", getRestaurantHigherRating);

restaurantRouter.get("/RestaurantById/:id", getRestaurantById);

restaurantRouter.get("/byCategory", getAllRestaurantByCategory);
restaurantRouter.put("/updateRestaurant/:id", updateRestaurantById);
// restaurantRouter.get("/allInfo/:id", getRestaurantInfoById);

module.exports = restaurantRouter;
