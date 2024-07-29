const express = require("express");
const itemRouter = express.Router();
const {
  getItemsByRestaurantOwner,
  updateItemById,
  addItem,
  deleteItemById,
  changeAvailability,
} = require("../controllers/item");
const authentication = require("../middleware/authentication");

const authorization = require("../middleware/authorization");
const multiparty = require('connect-multiparty');

const multipartyMiddleware = multiparty();

itemRouter.get("/getItems/",authentication,authorization("manage_restaurants"), getItemsByRestaurantOwner);
itemRouter.put("/updateItems/:id/", authentication,authorization("manage_restaurants"),updateItemById);
itemRouter.post("/addItems/",authentication,authorization("manage_restaurants"), multipartyMiddleware,addItem);
itemRouter.put("/deleteItem/:id",authentication,authorization("manage_restaurants"), deleteItemById);
itemRouter.put("/changeAvailable/:id",authentication,authorization("manage_restaurants"), changeAvailability);
module.exports = itemRouter;

