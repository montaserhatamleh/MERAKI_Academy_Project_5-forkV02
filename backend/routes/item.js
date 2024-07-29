const express = require("express");
const itemRouter = express.Router();
const {
  getItemsByRestaurantOwner,
  updateItemById,
  addItem,
  deleteItemById,
  changeAvailability,
  getItemById
} = require("../controllers/item");
const authentication = require("../middleware/authentication");

const authorization = require("../middleware/authorization");
const multiparty = require('connect-multiparty');

const multipartyMiddleware = multiparty();

itemRouter.get("/getItems/",authentication,authorization("manage_restaurants"), getItemsByRestaurantOwner);
itemRouter.put("/updateItems/:id/", authentication,authorization("manage_restaurants"),multipartyMiddleware,updateItemById);
itemRouter.post("/addItems/",authentication,authorization("manage_restaurants"), multipartyMiddleware,addItem);
itemRouter.delete("/deleteItem/:id",authentication,authorization("manage_restaurants"), deleteItemById);
itemRouter.put("/changeAvailable/:id",authentication,authorization("manage_restaurants"), changeAvailability);
itemRouter.get("/getItemById/:id",authentication,authorization("manage_restaurants"), getItemById);


module.exports = itemRouter;

