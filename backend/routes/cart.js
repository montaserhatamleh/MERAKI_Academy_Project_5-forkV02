const express = require ("express")
const cartRouter = express.Router()

const { getCartItems, getCartItemById, createCartItem, updateCartItemQuantity } = require('../controllers/cartController');

cartRouter.get('/carts', getCartItems);
cartRouter.get('/carts/:id', getCartItemById);
cartRouter.post('/carts', createCartItem);
cartRouter.put('/carts/:id/quantity', updateCartItemQuantity);

module.exports = cartRouter