const { pool } = require("../models/db");
//customer side
const createOrder = async (req, res) => {
  console.log(req.token);
  const { userId } = req.token;

  const delivery_address = req.token.address; // mn el token a7san

  const { payment_method, total_price } = req.body;
  try {
    //hon get all carrt items from user id cart
    const cartResult = await pool.query(
      //kman inner join to get res table where user id = and take delivery fees
      `SELECT * FROM cart_items 
             INNER JOIN carts ON cart_items.cart_id = carts.id 
             WHERE carts.user_id = $1`,
      [userId]
    );

    if (cartResult.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty",
      });
    }

    const cartItems = cartResult.rows;

    // Calculate total price of the order
    // const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0); // momken to add delivery fees hon

    // Create a new order
    // momken to add paymentMethod hon

    const orderResult = await pool.query(
      `INSERT INTO orders (user_id, restaurant_id, total_price, status, delivery_address,payment_method) 
             VALUES ($1, $2, $3, $4, $5,$6) RETURNING *`,
      [
        userId,
        cartItems[0].restaurant_id,
        total_price,
        "Pending",
        delivery_address,
        payment_method,
      ] // delivery fees column mn res fixed
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
    await pool.query(`DELETE FROM cart_items WHERE cart_id = $1`, [
      cartItems[0].cart_id,
    ]);

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: orderResult.rows[0],
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.stack,
    });
  }
};

// after having res from the above fun navigate to

const getOrderById = async (req, res) => {
  const { id } = req.params;
  let ridersResult;
  try {
    const orderResult = await pool.query(`SELECT * FROM orders WHERE id = $1`, [
      id,
    ]);

    if (orderResult.rows[0].status == "Accepted by Rider"||orderResult.rows[0].status == "On the Way") {
      try {
        ridersResult = await pool.query(
          `SELECT users.first_name,users.last_name, users.phone_number,restaurants.name,riders.vehicle_details FROM orders 
            INNER JOIN riders ON orders.rider_id = riders.id 
            INNER JOIN users ON riders.user_id = users.id 
            INNER JOIN restaurants ON orders.restaurant_id = restaurants.id 

            WHERE orders.id = $1`,
          [id]
        );
        console.log(ridersResult);
      } catch (err) {
        console.log(err);
      }
    }

    if (orderResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order = orderResult.rows[0];

    const orderItemsResult = await pool.query(
      `SELECT order_items.*, menu_items.name, menu_items.description, menu_items.price, menu_items.image_url ,    restaurants.name AS res_name
             FROM order_items 
             INNER JOIN menu_items ON order_items.menu_item_id = menu_items.id 
                 INNER JOIN restaurants ON menu_items.restaurant_id = restaurants.id 

             WHERE order_items.order_id = $1`,
      [id]
    );

    order.items = orderItemsResult.rows;
    order.rider = ridersResult?.rows[0];
    res.status(200).json({
      success: true,
      order: order,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.stack,
    });
  }
};

const getOrders = async (req, res) => {
  const userId = req.token.userId;

  const query = `SELECT * FROM orders WHERE user_id = $1`;
  pool
    .query(query, [userId])
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
