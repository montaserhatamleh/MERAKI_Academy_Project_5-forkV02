const { pool } = require("../models/db");

const cloudinary = require('../cloud'); 


const getItemsByRestaurantOwner = (req, res) => {
  const userId = req.token.userId;
  const query = `
    SELECT menu_items.id, menu_items.name, menu_items.description, 
           menu_items.price, menu_items.available, menu_items.image_url
    FROM menu_items
    JOIN restaurants ON menu_items.restaurant_id = restaurants.id
    WHERE restaurants.user_id = $1 AND menu_items.deleted_at = false;
  `;
  pool.query(query, [userId])
    .then(result => {
      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'No menu items found for this restaurant.',
        });
      }
      res.status(200).json({
        success: true,
        result: result.rows,
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        success: false,
        message: 'Server error',
        err: err.message,
      });
    });
};

const updateItemById = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, sub_category, available } = req.body;
  const query = `
    UPDATE menu_items 
    SET name = COALESCE($1, name), 
        description = COALESCE($2, description), 
        price = COALESCE($3, price),
        sub_category = COALESCE($4, sub_category), 
        image_url = COALESCE($5, image_url),
        available = COALESCE($6, available)
  WHERE id =$7
    RETURNING *
  `;

  let image_url = null;
  if (req.files && req.files.image) {
    const result = await cloudinary.uploader.upload(req.files.image.path, {
      folder: 'items-images',
    });
    image_url = result.secure_url;
  }

  const data = [name, description, price, sub_category, image_url, available, id];
  pool.query(query, data)
    .then(result => {
      if (result.rowCount === 0) {
        return res.status(404).json({
          success: false,
          message: `No menu item found with id: ${id}`,
        });
      }
      res.status(200).json({
        success: true,
        message: "Menu item updated successfully",
        result: result.rows[0],
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: err.message,
      });
    });
};

const addItem = async (req, res) => {
  const userId = req.token.userId;

  let image_url = null;
  if (req.files && req.files.image) {
    const result = await cloudinary.uploader.upload(req.files.image.path, {
      folder: 'items-images',
    });
    image_url = result.secure_url;
  }

  const { name, description, price, sub_category } = req.body;

  console.log(req.body);
  const query = `
    INSERT INTO menu_items (restaurant_id, name, description, price, image_url, sub_category) 
    VALUES ((SELECT id FROM restaurants WHERE user_id = $1), $2, $3, $4, $5, $6) 
    RETURNING *
  `;
  pool.query(query, [userId, name, description, price, image_url, sub_category])
    .then(result => {
      res.status(201).json({
        success: true,
        message: 'Item added successfully',
        result: result.rows[0],
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: err.message,
      });
    });
};

// function can do soft delete
const deleteItemById = (req, res) => {
  const userId = req.token.userId;
  const { id } = req.params;
  const query = `
    UPDATE menu_items 
    SET deleted_at = true 
    FROM restaurants 
    WHERE menu_items.restaurant_id = restaurants.id AND restaurants.user_id = $1 AND menu_items.id = $2 
    RETURNING *
  `;
  pool.query(query, [userId, id])
    .then(result => {
      res.status(200).json({
        success: true,
        message: 'Item deleted successfully',
        result: result.rows[0],
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: err.message,
      });
    });
};
//this function make value available "from true To false"
const changeAvailability = (req, res) => {
  const userId = req.token.userId;
  const { id } = req.params;
  const query = `
    UPDATE menu_items 
    SET available = NOT available 
    FROM restaurants 
    WHERE menu_items.restaurant_id = restaurants.id AND restaurants.user_id = $1 AND menu_items.id = $2 
    RETURNING *
  `;
  pool.query(query, [userId, id])
    .then(result => {
      res.status(200).json({
        success: true,
        message: 'Item availability updated successfully',
        result: result.rows[0],
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: err.message,
      });
    });
};

const getItemById = async (req,res) => {
const {id} = req.params


try {
const item = await pool.query(`SELECT * FROM menu_items WHERE id =$1`,[id])

res.status(200).json({
  success:true,
  result:item.rows[0]
})
}
catch(error){
res.status(500).json({
  success:false,
  err:error.message
})
}
}


module.exports = {
  getItemsByRestaurantOwner,
  updateItemById,
  addItem,
  deleteItemById,
  changeAvailability,
  getItemById

};
