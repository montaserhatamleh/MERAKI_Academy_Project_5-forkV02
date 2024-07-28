const express = require("express");
const restaurantRouter = express.Router();
const {
  getAllRestaurant,
  getRestaurantHigherRating,
  getRestaurantById,
  getAllRestaurantByCategory,
  updateRestaurantById,
  getRestaurantInfoById,
  getItemsByIdForRestaurant,
  deleteRestaurantById,
  getRestaurantOrders,
  changeStatusToPrepare,
  changeStatusReadyToPickup,
  getRestaurantOrdersPrepare,
  getRestaurantOrdersReady,
} = require("../controllers/restaurants");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

//Getting All Restaurant
restaurantRouter.get("/", getAllRestaurant);
//Getting Restaurant Depending on Rating
restaurantRouter.get("/getByRating", getRestaurantHigherRating);
//Getting Restaurant by id
restaurantRouter.get("/RestaurantById",authentication,authorization("manage_restaurants"),getRestaurantById);
//Find all order related restaurants
restaurantRouter.get("/find/:id", getRestaurantOrders);
//Filter by Category
restaurantRouter.get("/byCategory/:text", getAllRestaurantByCategory);
//Update Data For The Restaurant
restaurantRouter.put("/updateRestaurant", authentication,authorization("manage_restaurants"),updateRestaurantById);
//Getting items for restaurant
restaurantRouter.get("/getItemsForRestaurant/:id", getItemsByIdForRestaurant);
// soft delete Restaurant by id === THIS FUNCTION FOR ADMIN
restaurantRouter.put("/deleteRestaurant/:id", deleteRestaurantById);

//ahmad route
restaurantRouter.get("/allInfo/:id", getRestaurantInfoById);

// Mange Order
restaurantRouter.put(
  "/prepare/:id/:restaurant",
  authentication,
  authorization("manage_orders"),
  changeStatusToPrepare
);
restaurantRouter.put(
  "/read/:id/:restaurant",
  authentication,
  authorization("manage_orders"),
  changeStatusReadyToPickup
);
restaurantRouter.get(
  "/:restaurant/prepare",
  authentication,
  authorization("manage_orders"),
  getRestaurantOrdersPrepare
);
restaurantRouter.get(
  "/:restaurant/ready",
  authentication,
  authorization("manage_orders"),
  getRestaurantOrdersReady
);
//('Restaurant Owner')
//('manage_restaurants')
// authentication,authorization("manage_orders")

module.exports = restaurantRouter;
