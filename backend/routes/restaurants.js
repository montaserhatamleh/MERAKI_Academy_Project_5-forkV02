const express = require("express");
const restaurantRouter = express.Router();
const {
  getAllRestaurant,
  getRestaurantHigherRating,
  getRestaurantById,
  getAllRestaurantByCategory,
  updateRestaurantById,
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

// restaurantRouter.get("/", getAllRestaurant);

// restaurantRouter.get("/getByRating", getRestaurantHigherRating);

// restaurantRouter.get("/RestaurantById/:id", getRestaurantById);

// restaurantRouter.get("/byCategory", getAllRestaurantByCategory);

module.exports = restaurantRouter;
