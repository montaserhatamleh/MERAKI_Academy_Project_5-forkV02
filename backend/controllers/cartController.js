const {pool} = require("../models/db");

const getCartItems = async (req, res) => {
    const user_id = req.token.userId;
    const query = `SELECT * FROM cart_items WHERE user_id = $1`;
    pool
      .query(query, [user_id])
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
  
  const getCartItemById = async (req, res) => {
    const id = req.params.id;
    const user_id = req.token.userId;
    const query = `SELECT * FROM cart_items WHERE id = $1 AND user_id = $2`;
    pool
      .query(query, [id, user_id])
      .then((result) => {
        res.status(200).json({
          success: true,
          data: result.rows[0],
        });
      })
      .catch((err) => {
        res.status(404).json({
          success: false,
          message: "Cart item not found",
          err: err,
        });
      });
  };
  
  const createCartItem = async (req, res) => {
    const { menu_item_id } = req.body;
    const user_id = req.token.userId;
    const query = `INSERT INTO cart_items (menu_item_id, user_id) VALUES ($1,$2) RETURNING *;`;
    const data = [menu_item_id, user_id];
    pool
      .query(query, data)
      .then((result) => {
        res.status(201).json({
          success: true,
          message: "Cart item created successfully",
          data: result.rows[0],
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
  
  const updateCartItemQuantity = async (req, res) => {
    const id = req.params.id;
    const quantity = req.body.quantity;
    const query = `UPDATE cart_items SET quantity =$1 WHERE id =$2 RETURNING *;`;
    const data = [quantity, id];
    pool
      .query(query, data)
      .then((result) => {
        res.status(200).json({
          success: true,
          message: "Cart item quantity updated successfully",
          data: result.rows[0],
        });
      })
      .catch((err) => {
        res.status(404).json({
          success: false,
          message: "Cart item not found",
          err: err,
        });
      });
  };

  const addItemToCart = async (req, res) => {
    const id = req.params.id;
    const { menu_item_id, quantity, restaurant_id } = req.body;

    try {
        const cartCheck = await pool.query(
            `SELECT id, restaurant_id FROM carts WHERE user_id = $1`,
            [id]
        );

        let cart_id;

        if (cartCheck.rows.length > 0) {
            if (cartCheck.rows[0].restaurant_id !== restaurant_id) {
                await pool.query(
                    `UPDATE carts SET restaurant_id = $1 WHERE user_id = $2`,
                    [restaurant_id, id]
                );

                await pool.query(
                    `DELETE FROM cart_items WHERE id = $1`,
                    [cartCheck.rows[0].id]
                );
            }
            cart_id = cartCheck.rows[0].id;
        } else {
            const cartResult = await pool.query(
                `INSERT INTO carts (user_id, restaurant_id) 
                 VALUES ($1, $2) 
                 RETURNING id`,
                [id, restaurant_id]
            );
            cart_id = cartResult.rows[0].id;
            
        }
       
        const cartItemResult = await pool.query(
            `INSERT INTO cart_items (cart_id, menu_item_id, quantity) 
            VALUES ($1, $2, $3) 
            ON CONFLICT (cart_id,menu_item_id)
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

  
  module.exports = { getCartItems, getCartItemById, createCartItem, updateCartItemQuantity, addItemToCart  };