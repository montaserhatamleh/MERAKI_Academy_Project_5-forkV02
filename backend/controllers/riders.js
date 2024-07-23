const { pool } = require("../models/db");

const updateRider = async (req, res) => {
  const { id } = req.params;
  const { vehicle_details } = req.body;
  try {
    const query =
      "UPDATE riders SET vehicle_details = COALESCE($1,vehicle_details) WHERE id = $2 RETURNING *";
    const result = await pool.query(query, [vehicle_details, id]);
    if (result.rowCount === 0) {
      res.status(200).json({
        success: false,
        message: "Erorr Update",
      });
    }
    res.status(200).json({
      success: true,
      message: "updated successfully",
      result: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

const findAllRiders = async (req, res) => {
  try {
    const query = "SELECT * FROM riders";
    const result = await pool.query(query);

    if (result.rows.length === 0)
      res.status(200).json({
        success: false,
        message: "Not Found",
      });

    res.status(200).json({
      success: true,
      result: result.rows,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

const findRiderById = async (req, res) => {
  const { id } = req.params;
  try {
    const query = "SELECT * FROM riders WHERE id = $1";
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0)
      res.status(200).json({
        success: false,
        message: "Not Found",
      });

    res.status(200).json({
      success: true,
      result: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

const getRidersByUserId = async (req, res) => {
  const { id } = req.params;
  try {
    const query = "SELECT * FROM riders where user_id = $1";
    const result = await pool.query(query, [id]);
    if (result.rows.length === 0)
      res.status(200).json({
        success: false,
        message: "Not Found",
      });

    res.status(200).json({
      success: true,
      result: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message 
    });
  }
};

const getAllOrderIsPending = async (req, res) => {
  try {
    const query = "SELECT * FROM orders WHERE status='Prepar'";
    const result = await pool.query(query);

    if (result.rows.length === 0)
      res.status(200).json({
        success: false,
        message: "Not Found",
      });

    res.status(200).json({
      success: true,
      result: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};


const updateStatusOrder = async (req, res) => {

  const { id_rider, id_order, status } = req.body;

  try {
    const query = `UPDATE orders SET status = COALESCE($1,status),
                  rider_id=COALESCE($2,rider_id) WHERE id =$3 RETURNING *`;
    const result = await pool.query(query, [status, id_rider, id_order]);

    if (result.rowCount === 0) {
      return res.status(200).json({
        success: false,
        message: "Error Update",
      });
    }
    res.status(200).json({
      success: true,
      message: "Successfully update",
      result: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};




module.exports = {
  updateRider,
  findAllRiders,
  findRiderById,
  getRidersByUserId,
  getAllOrderIsPending,
  updateStatusOrder
};
