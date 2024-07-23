const { query } = require("express");
const { pool } = require("../models/db");

const getItemsById = (req, res) => {
  const item_id = req.params.id;
  const query = ` SELECT       
      menu_items.name,
      menu_items.description, 
      menu_items.price, 
      menu_items.available,
      menu_items.image_url
      FROM restaurants
      JOIN menu_items ON menu_items.restaurant_id = restaurants.id 
    WHERE restaurants.id = $1 AND menu_items.deleted_at = 0;
     `;
  pool
    .query(query, [item_id])
    .then((result) => {
      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: `No item found with id: ${item_id}`,
        });
      }
      res.status(200).json({
        success: true,
        message: `The item With id :${item_id} `,
        result: result.rows,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};
module.exports = { getItemsById };
