const express = require ("express")
const cartRouter = express.Router()

const { addItemToCart,
    getCartByUserId,
    updateCartItem,
    removeCartItem  } = require('../controllers/cartController');


// ahmad routes


cartRouter.post("/:id", addItemToCart); //id user
cartRouter.get("/:id", getCartByUserId);  // id user
cartRouter.put("/:id", updateCartItem); 
cartRouter.delete("/:id", removeCartItem);



module.exports = cartRouter