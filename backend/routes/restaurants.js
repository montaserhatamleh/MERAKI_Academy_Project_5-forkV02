const express = require("express");
const restaurantRouter = express.Router();
const {
  getAllRestaurant,
  getRestaurantHigherRating,
  getRestaurantById,
  getAllRestaurantByCategory,
  updateRestaurantById,
  getItemsByIdForRestaurant,
  deleteRestaurantById,
} = require("../controllers/restaurants");

//Getting All Restaurant
restaurantRouter.get("/", getAllRestaurant);
//Getting Restaurant Depending on Rating
restaurantRouter.get("/getByRating", getRestaurantHigherRating);
//Getting Restaurant by id
restaurantRouter.get("/RestaurantById/:id", getRestaurantById);
//Filter by Category
restaurantRouter.get("/byCategory", getAllRestaurantByCategory);
//Update Data For The Restaurant
restaurantRouter.put("/updateRestaurant/:id", updateRestaurantById);
//Getting items for restaurant
restaurantRouter.get("/getItemsForRestaurant/:id", getItemsByIdForRestaurant);
// soft delete Restaurant by id === THIS FUNCTION FOR ADMIN
restaurantRouter.put("/deleteRestaurant/:id", deleteRestaurantById);

module.exports = restaurantRouter;
