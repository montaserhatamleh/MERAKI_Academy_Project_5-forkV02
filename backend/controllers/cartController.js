const pool = require("../models/db");

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
  
  module.exports = { getCartItems, getCartItemById, createCartItem, updateCartItemQuantity };