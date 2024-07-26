const express = require("express");
const itemRouter = express.Router();
const {
  getItemsByRestaurantsId,
  updateItemsById,
  addItemsById,
  deleteItemById,
  changeAvailableFromOnToOffById,
} = require("../controllers/item");

itemRouter.get("/getItems/:id", getItemsByRestaurantsId);
itemRouter.put("/updateItems/:id/:restaurant", updateItemsById);
itemRouter.post("/addItems/:id", addItemsById);
itemRouter.put("/deleteItem/:id", deleteItemById);
itemRouter.put("/changeAvailable/:id", changeAvailableFromOnToOffById);
module.exports = itemRouter;