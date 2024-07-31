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
  getRestaurantOrdersDelivered
  ,
  getAllRestaurantByDeliveryFees,
 
} = require("../controllers/restaurants");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

//Getting All Restaurant
restaurantRouter.get("/", getAllRestaurant);
//Getting Restaurant Depending on Rating
restaurantRouter.get("/getByRating", getRestaurantHigherRating);
//Getting Restaurant by id
restaurantRouter.get(
  "/RestaurantById",
  authentication,
  authorization("manage_restaurants"),
  getRestaurantById
);
//Find all order related restaurants
//Filter by Category
restaurantRouter.get("/byCategory/:text", getAllRestaurantByCategory);
//Update Data For The Restaurant
restaurantRouter.put(
  "/updateRestaurant",
  authentication,
  authorization("manage_restaurants"),
  updateRestaurantById
);
//Getting items for restaurant
restaurantRouter.get("/getItemsForRestaurant/:id", getItemsByIdForRestaurant);
// soft delete Restaurant by id === THIS FUNCTION FOR ADMIN
restaurantRouter.put("/deleteRestaurant/:id", deleteRestaurantById);
// get All Restaurant By Delivery Fees
restaurantRouter.get(
  "/getAllRestaurantByDeliveryFees",
  getAllRestaurantByDeliveryFees
);


//ahmad route
restaurantRouter.get("/allInfo/:id", getRestaurantInfoById);

// Mange Order
restaurantRouter.get("/find",
  authentication,
  authorization("manage_orders"), getRestaurantOrders);

restaurantRouter.put(
  "/prepare/:restaurant",
  authentication,
  authorization("manage_orders"),
  changeStatusToPrepare
);
restaurantRouter.put(
  "/read/:restaurant",
  authentication,
  authorization("manage_orders"),
  changeStatusReadyToPickup
);
restaurantRouter.get(
  "/restaurant/prepare",
  authentication,
  authorization("manage_orders"),
  getRestaurantOrdersPrepare
);
restaurantRouter.get(
  "/restaurant/delivered",
  authentication,
  authorization("manage_orders"),
  getRestaurantOrdersDelivered
);
//('Restaurant Owner')
//('manage_restaurants')
// authentication,authorization("manage_orders")

module.exports = restaurantRouter;
