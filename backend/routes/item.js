const express = require("express");
const itemRouter = express.Router();
const {
  getItemsById,
  updateItemsById,
  addItemsById,
  deleteItemById,
} = require("../controllers/item");

itemRouter.get("/getItems/:id", getItemsById);
itemRouter.put("/updateItems/:id", updateItemsById);
itemRouter.post("/addItems/:id", addItemsById);
itemRouter.put("/deleteItem/:id", deleteItemById);
module.exports = itemRouter;
