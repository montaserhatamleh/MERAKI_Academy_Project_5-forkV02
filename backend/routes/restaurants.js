const express = require("express");
const restaurantRouter = express.Router();
const { getAllRestaurant } = require("../controllers/restaurants");
restaurantRouter.get("/", getAllRestaurant);

module.exports = restaurantRouter;
