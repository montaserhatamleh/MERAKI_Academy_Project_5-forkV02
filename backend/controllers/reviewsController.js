const { pool } = require("../models/db");

const getReviewsForRestaurant = async (req, res) => {
  //AVG group by restaurant_id
  const restaurant_id = req.params.id;
  const query = `SELECT * FROM reviews WHERE restaurant_id=$1`;
  pool
    .query(query, [restaurant_id])
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
        err,
        err,
      });
    });
};

const getReviewById = async (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM reviews WHERE id =$1`;
  pool
    .query(query, [id])
    .then((result) => {
      if (result.rows.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "Review not found" });
      }
      return res.status(200).json({ success: true, data: result.rows[0] });
    })
    .catch((err) => {
      return res
        .status(500)
        .json({ success: false, message: "Server error", err });
    });
};

const createReview = async (req, res) => {
  // from 1 star to 5 stars
  // we can use two params
  const { rating, user_id, id,comment } = req.body;
  const restaurant_id = req.params.id;

  try {
    const query1 = `UPDATE orders SET deleted_at = true WHERE id = $1;`;
    const result1 = await pool.query(query1, [id]);

    const query = `
        INSERT INTO reviews (rating, user_id, restaurant_id,order_id,comment)
        VALUES ($1, $2, $3,$4,$5)
        RETURNING *
      `;
    const values = [rating, user_id, restaurant_id, id,comment];
    const result = await pool.query(query, values);
    await updateRestaurantAverageRating();

    return res
      .status(201)
      .json({ success: true, message: "Review created successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Server error", err: err.message });
  }
};

const updateRestaurantAverageRating = async () => {
  try {
    const query = `
        UPDATE restaurants
        SET rating = (
       SELECT AVG(reviews.rating) FROM reviews WHERE reviews.restaurant_id = restaurants.id

        )
        WHERE id IN (
          SELECT restaurant_id FROM reviews
        )
      `;
    await pool.query(query);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getReviewsForRestaurant,
  getReviewById,
  createReview,
  updateRestaurantAverageRating,
};
