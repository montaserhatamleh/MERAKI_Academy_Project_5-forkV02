const express = require ("express")
const orderRouter = express.Router()

const { getOrders, getOrderById, createOrder } = require('../controllers/orders');


const authentication = require("../middleware/authentication")

orderRouter.post("/checkout",authentication, createOrder);

orderRouter.get("/:id", authentication,getOrderById);
orderRouter.get("/",authentication ,getOrders);

module.exports = orderRouter