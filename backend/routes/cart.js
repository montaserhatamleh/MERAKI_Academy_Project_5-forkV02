const express = require ("express")
const cartRouter = express.Router()

const { getCartItems, getCartItemById, createCartItem, updateCartItemQuantity, addItemToCart } = require('../controllers/cartController');

cartRouter.get('/carts', getCartItems);
cartRouter.get('/carts/:id', getCartItemById);
cartRouter.post('/carts', createCartItem);
cartRouter.put('/carts/:id/quantity', updateCartItemQuantity);
cartRouter.post('/carts/:id', addItemToCart);



// ahmad routes

/*
cartRouter.post("/", addItemToCart);
cartRouter.get("/", getCartByUserId);
cartRouter.put("/:cartItem_id", updateCartItem);
cartRouter.delete("/:cartItem_id", removeCartItem);
//after clicking process to checkout , create an order 
cartRouter.post("/checkout", createOrder);
getOrderById
cartRouter.get("/order_id", getOrderById);

*/

module.exports = cartRouter