const express = require("express");
const itemRouter = express.Router();
const {
  getItemsByRestaurantsId,
  updateItemsById,
  addItemsById,
  deleteItemById,
  changeAvailableFromOnToOffById,
} = require("../controllers/item");
const authentication = require("../middleware/authentication");

const authorization = require("../middleware/authorization");

itemRouter.get("/getItems/:id",authentication,authorization("manage_restaurants"), getItemsByRestaurantsId);
itemRouter.put("/updateItems/:id/:restaurant", authentication,authorization("manage_restaurants"),updateItemsById);
itemRouter.post("/addItems/:id",authentication,authorization("manage_restaurants"), addItemsById);
itemRouter.put("/deleteItem/:id",authentication,authorization("manage_restaurants"), deleteItemById);
itemRouter.put("/changeAvailable/:id",authentication,authorization("manage_restaurants"), changeAvailableFromOnToOffById);
module.exports = itemRouter;