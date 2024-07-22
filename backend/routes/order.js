const express = require ("express")
const orderRouter = express.Router()

const { getOrders, getOrderById, createOrder, updateOrder, deleteOrder } = require('../controllers/orderController');

orderRouter.get('/', getOrders);
orderRouter.get('/:id', getOrderById);
orderRouter.post('/', createOrder);
orderRouter.put('/:id', updateOrder);
orderRouter.delete('/:id', deleteOrder);

module.exports = orderRouter