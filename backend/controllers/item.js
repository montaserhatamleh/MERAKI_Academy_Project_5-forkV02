const { query } = require("express");
const { pool } = require("../models/db");

const getItemsByRestaurantsId = (req, res) => {
  const item_id = req.params.id;
  // join for user_id
  const query = ` SELECT       
      menu_items.name,
      menu_items.description, 
      menu_items.price, 
      menu_items.available,
      menu_items.image_url
      FROM restaurants
      JOIN menu_items ON menu_items.restaurant_id = restaurants.id 
    WHERE restaurants.id = $1 AND menu_items.deleted_at = false;
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
// function that update any items
const updateItemsById = (req, res) => {
  //:id/:restaurant
  const id = req.params.id;
  const restaurant = req.params.restaurant;
  const { name, description, price, sub_category, image_url, available } =
    req.body;
  const query = `UPDATE menu_items 
  SET  name = COALESCE($1, name),
       description = COALESCE($2, description),
       price = COALESCE($3, price),
       sub_category_id = COALESCE($4, sub_category_id),
       image_url = COALESCE($5, image_url),
       available = COALESCE($6, available)
        WHERE restaurant_id = $7 AND id=$8 
        RETURNING *
  `;
  const data = [
    name,
    description,
    price,
    sub_category,
    image_url,
    available,
    restaurant,
    id
    
  ];
  pool
    .query(query, data)
    .then((result) => {
      if (result.rowCount === 0) {
        return res.status(404).json({
          success: false,
          message: `No menu item found with id: ${id}`,
        });
      }
      res.status(200).json({
        success: true,
        message: `Menu item with id: ${id} updated successfully`,
        result: result.rows[0],
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err.message,
      });
    });
};
// function can create post
// should be userId 
const addItemsById = (req, res) => {
  const restaurant_id = req.params.id;
  const { name, description, price, image_url, sub_category } = req.body;
  const query = `INSERT INTO menu_items (restaurant_id, name, description, price, image_url, sub_category_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
  pool
    .query(query, [
      restaurant_id,
      name,
      description,
      price,
      image_url,
      sub_category,
    ])
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Item added successfully",
        result: result.rows[0],
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "Server error",
        error: err.message,
      });
    });
};
// function can do soft delete
const deleteItemById = (req, res) => {
  const item_id = req.params.id;
  const query = `UPDATE menu_items SET deleted_at = 1 WHERE id = $1 RETURNING *`;
  pool
    .query(query, [item_id])
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Item Deleted",
        result: result.rows[0],
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "Server error",
        error: err.message,
      });
    });
};
//this function make value available "from true To false"
const changeAvailableFromOnToOffById = (req, res) => {
  const item_id = req.params.id;
  const query = `UPDATE menu_items SET available = false WHERE id = $1 RETURNING *`;
  pool
    .query(query, [item_id])
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Item Not available ",
        result: result.rows[0],
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "Server error",
        error: err.message,
      });
    });
};




module.exports = {
  getItemsByRestaurantsId,
  updateItemsById,
  addItemsById,
  deleteItemById,
  changeAvailableFromOnToOffById,

};
