const express = require ("express")
const cartRouter = express.Router()

const { addItemToCart,
    getCartByUserId,
    updateCartItem,
    removeCartItem  } = require('../controllers/cartController');


// ahmad routes


cartRouter.post("/", addItemToCart);
cartRouter.get("/", getCartByUserId);
cartRouter.put("/:cartItem_id", updateCartItem);
cartRouter.delete("/:cartItem_id", removeCartItem);



module.exports = cartRouter