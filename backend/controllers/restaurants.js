const { pool } = require("../models/db");

//function to get all restaurant
const getAllRestaurant = (req, res) => {
  pool
    .query(`SELECT * FROM restaurants`)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `All the restaurants`,
        result: result.rows,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: `Server error`,
        err: err,
      });
    });
};
//get menu item by id for Restaurant
const getItemsByIdForRestaurant = (req, res) => {};

//function to get restaurant by id
const getRestaurantById = (req, res) => {
  const restaurant_id = req.params.id;
  pool
    .query(`SELECT * FROM restaurants WHERE id = $1`, [restaurant_id])
    .then((result) => {
      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: `No restaurant found with id: ${restaurant_id}`,
        });
      }
      res.status(200).json({
        success: true,
        message: `The restaurants With id :${restaurant_id} `,
        result: result.rows[0],
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

//function get Restaurant by category for
const getAllRestaurantByCategory = (req, res) => {};

//function get higher rating
const getRestaurantHigherRating = (req, res) => {
  pool
    .query(
      `SELECT * FROM restaurants
ORDER BY  rating DESC;`
    )
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `All the restaurants By rating`,
        result: result.rows,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: `Server error`,
        err: err,
      });
    });
};

//function to update restaurant by id
const updateRestaurantById = (req, res) => {};

module.exports = {
  getAllRestaurant,
  getRestaurantHigherRating,
  getRestaurantById,
};
