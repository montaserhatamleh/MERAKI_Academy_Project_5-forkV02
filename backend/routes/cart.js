const express = require ("express")
const cartRouter = express.Router()

const { addItemToCart,
    getCartByUserId,
    updateCartItem,
    removeCartItem  } = require('../controllers/cartController');

    const authentication = require("../middleware/authentication")
    const authorization = require("../middleware/authorization")

// ahmad routes


cartRouter.post("/",authentication ,authorization("manage_cart"),addItemToCart);
cartRouter.get("/elements", authentication,authorization("manage_cart"),getCartByUserId);
cartRouter.put("/:id", authentication,authorization("manage_cart"),updateCartItem);
cartRouter.delete("/:id",authentication,authorization("manage_cart"), removeCartItem);



module.exports = cartRouter