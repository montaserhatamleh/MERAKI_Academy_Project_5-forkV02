const express = require ("express")
const orderRouter = express.Router()

const { getOrders, getOrderById, createOrder } = require('../controllers/orders');
orderRouter.post("/checkout/:id", createOrder);

orderRouter.get("/:id", getOrderById);
orderRouter.get("/", getOrders);

module.exports = orderRouter