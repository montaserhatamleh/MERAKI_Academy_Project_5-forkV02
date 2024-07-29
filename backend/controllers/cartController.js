const {pool} = require("../models/db");


const addItemToCart = async (req, res) => {

  const userId = req.token.userId;

  const { menu_item_id, quantity, restaurant_id } = req.body;

  try {
      const cartCheck = await pool.query(
          `SELECT id, restaurant_id FROM carts WHERE user_id = $1`,
          [userId]
      );

      let cart_id;

      if (cartCheck.rows.length > 0) {
          if (cartCheck.rows[0].restaurant_id !== restaurant_id) {
              await pool.query(
                  `UPDATE carts SET restaurant_id = $1 WHERE user_id = $2`,
                  [restaurant_id, userId]
              );

              await pool.query(
                  `DELETE FROM cart_items WHERE cart_id = $1`,
                  [cartCheck.rows[0].cart_id]
              );
          }
          cart_id = cartCheck.rows[0].id;
      } else {
          const cartResult = await pool.query(
              `INSERT INTO carts (user_id, restaurant_id) 
               VALUES ($1, $2) 
               RETURNING cart_id`,
              [userId, restaurant_id]
          );
          cart_id = cartResult.rows[0].id;
      }

      const cartItemResult = await pool.query(
          `INSERT INTO cart_items (cart_id, menu_item_id, quantity) 
           VALUES ($1, $2, $3) 
           ON CONFLICT (cart_id, menu_item_id)
           DO UPDATE SET quantity = cart_items.quantity + EXCLUDED.quantity
           RETURNING *`,
          [cart_id, menu_item_id, quantity]
      );

      res.status(201).json({
          success: true,
          cart_item: cartItemResult.rows[0]
      });
  } catch (err) {
      res.status(500).json({
          success: false,
          message: 'Server error',
          error: err.stack
      });
  }
};

const getCartByUserId = async (req, res) => {
    const userId = req.token.userId;


  try {
      const cartResult = await pool.query(
          `SELECT carts.id, carts.restaurant_id, cart_items.id, cart_items.menu_item_id, cart_items.quantity, menu_items.name, menu_items.price, menu_items.description, menu_items.image_url
           FROM carts
           INNER JOIN cart_items ON carts.id = cart_items.cart_id
           INNER JOIN menu_items ON menu_items.id = cart_items.menu_item_id
           WHERE carts.user_id = $1`,
          [userId]
      );

      if (cartResult.rows.length === 0) {
          return res.status(404).json({
              success: false,
              message: 'Cart is empty'
          });
      }

      res.status(200).json({
          success: true,
          cart: cartResult.rows
      });
  } catch (err) {
      res.status(500).json({
          success: false,
          message: 'Server error',
          error: err.stack
      });
  }
};



const updateCartItem = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  try {
      const result = await pool.query(
          `UPDATE cart_items 
           SET quantity = $1 
           WHERE id = $2 
           RETURNING *`,
          [quantity, id]
      );

      if (result.rows.length === 0) {
          return res.status(404).json({
              success: false,
              message: 'Cart item not found'
          });
      }

      res.status(200).json({
          success: true,
          cart_item: result.rows[0]
      });
  } catch (err) {
      res.status(500).json({
          success: false,
          message: 'Server error',
          error: err.stack
      });
  }
};

const removeCartItem = async (req, res) => {
  const { id } = req.params;

  try {
      const result = await pool.query(
          `DELETE FROM cart_items 
           WHERE id = $1 
           RETURNING *`,
          [id]
      );

      if (result.rows.length === 0) {
          return res.status(404).json({
              success: false,
              message: 'Cart item not found'
          });
      }

      res.status(200).json({
          success: true,
          message: 'Cart item removed'
      });
  } catch (err) {
      res.status(500).json({
          success: false,
          message: 'Server error',
          error: err.stack
      });
  }
};
  
  module.exports = { addItemToCart,
    getCartByUserId,
    updateCartItem,
    removeCartItem };