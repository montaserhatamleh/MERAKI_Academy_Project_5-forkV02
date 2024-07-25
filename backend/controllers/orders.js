const {pool} = require("../models/db")
//customer side
const createOrder = async (req, res) => {
    const userId = req.params.id;

   const {delivery_address} = req.body // mn el token a7san 

    try {

//hon get all carrt items from user id cart 
        const cartResult = await pool.query(
            `SELECT * FROM cart_items 
             INNER JOIN carts ON cart_items.cart_id = carts.id 
             WHERE carts.user_id = $1`,
            [userId]
        );

        if (cartResult.rows.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Your cart is empty'
            });
        }

        const cartItems = cartResult.rows;

        // Calculate total price of the order 
        const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

        // Create a new order
        // momken to add paymentMethod hon 

        const orderResult = await pool.query(
            `INSERT INTO orders (user_id, restaurant_id, total_price, status, delivery_address) 
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [userId, cartItems[0].restaurant_id, totalPrice, 'Pending' , delivery_address ]
        );
        const orderId = orderResult.rows[0].id;

        // Move cart items to order items
        for (const item of cartItems) {
            await pool.query(
                `INSERT INTO order_items (order_id, menu_item_id, quantity) 
                 VALUES ($1, $2, $3)`, // no need for the price here remove it from order items table
                [orderId, item.menu_item_id, item.quantity]
            );
        }

        // Clear the cart
        await pool.query(
            `DELETE FROM cart_items WHERE cart_id = $1`,
            [cartItems[0].cart_id]
        );

        res.status(201).json({
            success: true,
            message: 'Order placed successfully',
            order: orderResult.rows[0]
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: err.stack
        });
    }
};

// after having res from the above fun navigate to 



const getOrderById = async (req, res) => {
    const { id } = req.params;

    try {
        const orderResult = await pool.query(
            `SELECT * FROM orders WHERE id = $1`,
            [id]
        );

        if (orderResult.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        const order = orderResult.rows[0];

        const orderItemsResult = await pool.query(
            `SELECT order_items.*, menu_items.name, menu_items.description, menu_items.image_url 
             FROM order_items 
             INNER JOIN menu_items ON order_items.menu_item_id = menu_items.id 
             WHERE order_items.order_id = $1`,
            [id]
        );

        order.items = orderItemsResult.rows;

        res.status(200).json({
            success: true,
            order: order
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: err.stack
        });
    }
};


const getOrders = async (req, res) => {
    const userId = req.token.id;

    const query = `SELECT * FROM orders WHERE user_id = $1`;
    pool
      .query(query,[userId])
      .then((result) => {
        res.status(200).json({
          success: true,
          data: result.rows,
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "Server error",
          err: err,
        });
      });
  };

  module.exports = { getOrders, getOrderById, createOrder };