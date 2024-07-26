const { pool } = require("../models/db");

//function to get all restaurant
const getAllRestaurant = (req, res) => {
  pool
    .query(
      `SELECT * 
FROM restaurants 
WHERE deleted_at = 0 
ORDER BY created_at DESC;`
    ) // t5leh order by creation time: change DONE
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
// i think no need for this function anymore 
const getItemsByIdForRestaurant = (req, res) => {
  const restaurant_id = req.params.id;
  pool
    .query(
      `SELECT name, price, image_url FROM menu_items WHERE id = $1 AND deleted_at = 0`,
      [restaurant_id]
    )
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `All items`,
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

//function to get restaurant by id
const getRestaurantById = (req, res) => {
  const restaurant_id = req.params.id;
  pool
    .query(`SELECT * FROM restaurants WHERE id = $1 AND deleted_at = 0;`, [
      restaurant_id,
    ])

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
const getAllRestaurantByCategory = (req, res) => {
  const category_id = req.query.category;
  pool
    .query("SELECT * FROM restaurants WHERE category = $1", [category_id])
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `All restaurants in the category: ${category_id}`,
        result: result.rows,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Server error",
        error: err.message,
      });
    });
};

//function get higher rating : change DONE
//for user
const getRestaurantHigherRating = (req, res) => {
  pool
    .query(
      `SELECT * FROM restaurants WHERE deleted_at = 0 
ORDER BY rating DESC LIMIT 5;`
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
const updateRestaurantById = (req, res) => {

  const {id} = req.params;
  const { name, address, category, phone_number, rating } = req.body;
  pool
    .query(
      `UPDATE restaurants SET name = COALESCE($1, name), 
                                     address = COALESCE($2, address), 
                                     category = COALESCE($3, category), 
                                     phone_number = COALESCE($4, phone_number), 
                                      rating = COALESCE($5, rating), 
                                     updated_at = CURRENT_TIMESTAMP
            WHERE restaurant_id = $6 RETURNING *`,
      [name, address, category, phone_number, rating, id]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: `No restaurant found with id: ${id}`,
        });
      }
      res.status(200).json({
        success: true,
        message: "Restaurant updated successfully",
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
// soft delete Restaurant by id === THIS FUNCTION FOR ADMIN
const deleteRestaurantById = (req, res) => {
  const restaurant_id = req.params.id;
  pool
    .query(`UPDATE restaurants SET deleted_at = 1 WHERE id = $1 RETURNING *`, [
      restaurant_id,
    ])
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Restaurant Deleted",
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

const getRestaurantInfoById = async (req, res) => {
  const { id } = req.params;  
  try {
      const restaurantResult = await pool.query(
          `SELECT 
              r.restaurant_id,
              r.name,
              r.user_id,
              r.image_url,
              r.address,
              r.category,
              r.phone_number,
              r.created_at,
              r.updated_at,
              COALESCE(avg_reviews.average_rating, 0.00) AS average_rating,
              COALESCE(avg_reviews.rating_count, 0) AS rating_count
           FROM 
              restaurants r
           LEFT JOIN 
              (SELECT 
                  restaurant_id, 
                  AVG(rating) AS average_rating,
                  COUNT(rating) AS rating_count
               FROM 
                  reviews
               GROUP BY 
                  restaurant_id) AS avg_reviews
           ON 
              r.restaurant_id = avg_reviews.restaurant_id
           WHERE 
              r.restaurant_id = $1`,
          [id]
      );

      if (restaurantResult.rows.length === 0) {
          return res.status(404).json({
              success: false,
              message: 'Restaurant not found'
          });
      }

      const menuItemsResult = await pool.query(
          `SELECT 
              menu_item_id,
              name,
              description,
              price,
              sub_category,
              image_url,
              available,
              created_at,
              updated_at
           FROM 
              menu_items
           WHERE 
              restaurant_id = $1
           ORDER BY 
              created_at DESC`,
          [id]
      );

      // hon 3mlna include lal items b object wa7ad
      const restaurant = restaurantResult.rows[0];
      restaurant.menu_items = menuItemsResult.rows;

      res.status(200).json({
          success: true,
          restaurant: restaurant
      });
  } catch (err) {
      res.status(500).json({
          success: false,
          message: 'Server error',
          error: err.stack
      });
  }
}



module.exports = {
  getRestaurantInfoById,//ahmad route
  getAllRestaurant,
  getRestaurantHigherRating,
  getRestaurantById,
  getAllRestaurantByCategory,
  updateRestaurantById,
  getItemsByIdForRestaurant,
  deleteRestaurantById,
};
