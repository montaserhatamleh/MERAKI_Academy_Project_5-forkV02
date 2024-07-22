const pool = require("../models/db");



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
  
  const createOrder = async (req, res) => {
    const { user_id, restaurant_id, rider_id, total_price, status } = req.body;
    const query = `INSERT INTO orders (user_id, restaurant_id, rider_id, total_price, status) VALUES ($1,$2,$3,$4,$5) RETURNING *;`;
    const data = [user_id, restaurant_id, rider_id, total_price, status];
    pool
      .query(query, data)
      .then((result) => {
        res.status(201).json({
          success: true,
          message: "Order created successfully",
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
  
  module.exports = { getOrders, getOrderById, createOrder, updateOrder, deleteOrder };