const express = require("express");
const itemRouter = express.Router();
const {
  getItemsById,
  updateItemsById,
  addItemsById,
} = require("../controllers/item");

itemRouter.get("/getItems/:id", getItemsById);
itemRouter.put("/updateItems/:id", updateItemsById);
itemRouter.post("/addItems/:id", addItemsById);
module.exports = itemRouter;
