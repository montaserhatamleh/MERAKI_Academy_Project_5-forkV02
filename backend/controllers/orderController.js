const {pool} = require("../models/db");



const getOrders = async (req, res) => {
    const query = `SELECT * FROM orders`;
    pool
      .query(query)
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
  
  const getOrderById = async (req, res) => {
    const id = req.params.id;
    const query = `SELECT * FROM orders WHERE id = $1`;
    pool
      .query(query, [id])
      .then((result) => {
        res.status(200).json({
          success: true,
          data: result.rows[0],
        });
      })
      .catch((err) => {
        res.status(404).json({
          success: false,
          message: "Order not found",
          err: err,
        });
      });
  };
  
  const updateOrder = async (req, res) => {
    const id = req.params.id;
    const { user_id, restaurant_id, rider_id, total_price, status } = req.body;
    const query = `UPDATE orders SET user_id = $1, restaurant_id = $2, rider_id = $3, total_price = $4, status = $5 WHERE id = $6 RETURNING *;`;
    const data = [user_id, restaurant_id, rider_id, total_price, status, id];
    pool
      .query(query, data)
      .then((result) => {
        res.status(200).json({
          success: true,
          message: "Order updated successfully",
          data: result.rows[0],
        });
      })
      .catch((err) => {
        res.status(404).json({
          success: false,
          message: "Order not found",
          err: err,
        });
      });
  };
  
  const deleteOrder = async (req, res) => {
    const id = req.params.id;
    const query = `DELETE FROM orders WHERE id = $1`;
    pool
      .query(query, [id])
      .then(() => {
        res.status(204).json({ success: true, message: "Order deleted successfully" });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "Server error",
          err: err,
        });
      });
  };

  const createOrder = async (req, res) => {
    const userId = req.params.id;
    const {delivery_address} = req.body
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
            [userId, cartItems[0].restaurant_id, totalPrice,'Pending',delivery_address ]
        );
        const orderId = orderResult.rows[0].id;
  
        // Move cart items to order items
        for (const item of cartItems) {
            await pool.query(
                `INSERT INTO order_items (order_id, menu_item_id, quantity) 
                 VALUES ($1, $2, $3)`,
                [orderId, item.menu_item_id, item.quantity]
            );
        }
  
        // Clear the cart
        await pool.query(
            `DELETE FROM cart_items WHERE cart_id = $1`,
            [cartItems[0].id]
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
  
  const getAllOrderIsPending = async (req, res) => {
    try {
      const query = "SELECT * FROM orders WHERE status='Prepar'";
      const result = await pool.query(query);
  
      if (result.rows.length === 0)
        res.status(200).json({
          success: false,
          message: "Not Found",
        });
  
      res.status(200).json({
        success: true,
        result: result.rows[0],
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Server error",
        error: err.message,
      });
    }
  };
  
  const changeStateOrderFromResturants = async (req , res)=>{
      const {id_order} = req.params;
      try {
        const query = `UPDATE orders SET status = Prepare WHERE id =$1 RETURNING *`;
        const result = await pool.query(query, [id_order]);
    
        if (result.rowCount === 0) {
          return res.status(200).json({
            success: false,
            message: "Error Update",
          });
        }
        res.status(200).json({
          success: true,
          message: "the order is being prepared",
          result: result.rows[0],
        });
      } catch (err) {
        res.status(500).json({
          success: false,
          message: "Server error",
          error: err.message,
        });
      }
    };
  




  module.exports = { getOrders, getOrderById, createOrder, updateOrder, deleteOrder ,changeStateOrderFromResturants ,getAllOrderIsPending };