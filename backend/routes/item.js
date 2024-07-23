const express = require("express");
const itemRouter = express.Router();
const { getItemsById } = require("../controllers/item");

itemRouter.get("/getItems/:id", getItemsById);
module.exports = itemRouter;
