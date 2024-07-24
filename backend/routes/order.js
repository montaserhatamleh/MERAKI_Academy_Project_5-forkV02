const express = require ("express")
const orderRouter = express.Router()

const { getOrders, getOrderById, createOrder, updateOrder, deleteOrder ,changeStateOrderFromResturants } = require('../controllers/orderController');

orderRouter.get('/', getOrders);
orderRouter.get('/:id', getOrderById);
orderRouter.post('/:id', createOrder);
orderRouter.put('/:id', updateOrder);
orderRouter.delete('/:id', deleteOrder);
orderRouter.put('/:id', changeStateOrderFromResturants);

module.exports = orderRouter