const { pool } = require("../models/db");

//function to get all restaurant
const getAllRestaurant = (req, res) => {
  pool
    .query(
      `SELECT * 
FROM restaurants 
WHERE deleted_at = false 
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
      `SELECT name, price, image_url,description FROM menu_items WHERE restaurant_id = $1 AND deleted_at = false`,
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
  const user_id = req.token.userId;
  console.log(req.token.userId);
  pool
    .query(`SELECT * FROM restaurants WHERE user_id = $1 AND deleted_at = false;`, [
      user_id,
    ])

    .then((result) => {
      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: `No restaurant`,
        });
      }
      console.log(result.rows[0]);
      res.status(200).json({
        success: true,
        message: `The restaurant`,
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
  const category_id = req.params.text;
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
      `SELECT * FROM restaurants WHERE deleted_at = false 
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

  const id = req.token.userId;
  const { name, address, category, phone_number, delivery_fees,image_url } = req.body;
  pool
    .query(
      `UPDATE restaurants SET name = COALESCE($1, name), 
                                     address = COALESCE($2, address), 
                                     image_url = COALESCE($3, image_url),
                                     category = COALESCE($4, category), 
                                     phone_number = COALESCE($5, phone_number),
                                       delivery_fees = COALESCE($6, delivery_fees)
            WHERE user_id = $7 RETURNING *`,
      [name, address, image_url ,category, phone_number,delivery_fees, id]
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
    .query(`UPDATE restaurants SET deleted_at = true WHERE id = $1 RETURNING *`, [
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
  const { id } = req.params;  // Assuming id = 10 for this example
  try {
      // get restaurant info with average rating and rating count
      const restaurantResult = await pool.query(
          `SELECT 
              r.id,
              r.name,
              r.user_id,
              r.image_url,
              r.address,
              r.category,
              r.phone_number,
              r.delivery_fees,
              r.created_at,
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
           r.id = avg_reviews.restaurant_id
           WHERE 
           r.id = $1`,
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
              id,
              name,
              description,
              price,
              sub_category,
              image_url,
              available,
              created_at
           FROM 
              menu_items
           WHERE 
              restaurant_id = $1
           ORDER BY 
              sub_category ASC, name ASC`,
          [id]
      );

      // Organize menu items by sub_category
      const menuItemsBySubCategory = menuItemsResult.rows.reduce((acc, item) => {
          if (!acc[item.sub_category]) {
              acc[item.sub_category] = [];
          }
          acc[item.sub_category].push(item);
          return acc;
      }, {});

      const restaurant = restaurantResult.rows[0];
      restaurant.menu_items = menuItemsBySubCategory;

      res.status(200).json({
          success: true,
          restaurant: restaurant
      });
  } catch (err) {
      res.status(500).json({
          success: false,
          message: 'Server error',
          error: err.message
      });
  }
}
// example data 
/* {
  id: 10,
  name: "Example Restaurant",
  user_id: 1,
  image_url: "/images/restaurant.png",
  address: "123 Main St",
  category: "Fusion",
  phone_number: "123-456-7890",
  delivery_fees: 2.99,
  created_at: "2024-07-15T12:00:00.000Z",
  average_rating: 4.5,
  rating_count: 10,
  menu_items: {
    "Appetizers": [
      { id: 1, name: "Spring Rolls", description: "Tasty rolls", price: 5.99, sub_category: "Appetizers", image_url: "/images/sr.png", available: true, created_at: "2024-07-15T12:00:00.000Z" },
      { id: 2, name: "Garlic Bread", description: "Garlic & Butter", price: 3.99, sub_category: "Appetizers", image_url: "/images/gb.png", available: true, created_at: "2024-07-15T12:05:00.000Z" }
    ],
    "Main Course": [
      { id: 3, name: "Steak", description: "Juicy steak", price: 25.99, sub_category: "Main Course", image_url: "/images/st.png", available: true, created_at: "2024-07-15T12:10:00.000Z" },
      { id: 4, name: "Pasta", description: "Italian Pasta", price: 15.99, sub_category: "Main Course", image_url: "/images/ps.png", available: true, created_at: "2024-07-15T12:15:00.000Z" }
    ]
  }
}
*/

const getRestaurantOrders= async (req ,res)=>{
  const {id} = req.params ; 
  try{
  const query = "SELECT * FROM orders WHERE restaurant_id = $1 AND status='Pending' " ;
  const result = await pool.query(query ,[id]) 
  if(result.rows.length === 0 ){
    return res.status(404).json({
      success: false,
      message: `No item found `,
    })
  }
  res.status(200).json({
    success: true ,
    result:result.rows  
  })
  }catch(err)
  {res.status(500).json({
    success: false,
    message: `Server Erorr`,
    error:err.message
  })}
}

const changeStatusToPrepare = async (req , res)=>{
const {id} = req.params ; 
const {restaurant} = req.params ; 
try{

const query = "UPDATE orders Set status='Prepare' WHERE id = $1  AND status='Pending' AND restaurant_id=$2 RETURNING *";
const result = await pool.query(query,[id , restaurant]);
   
if (result.rowCount === 0)
return res.status(200).json({
  success: false,
  message: "Not update",
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


const changeStatusReadyToPickup = async (req , res)=>{
  const {id} = req.params ; 
  const {restaurant} = req.params ; 
  try{
  
  const query = "UPDATE orders Set status='Ready To Pick Up' WHERE id = $1  AND status='Prepare' AND restaurant_id=$2 RETURNING *";
  const result = await pool.query(query,[id , restaurant]);
     
  if (result.rowCount === 0)
  return res.status(200).json({
    success: false,
    message: "Not update",
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
  

  
const getRestaurantOrdersPrepare= async (req ,res)=>{
  const {id} = req.params ; 
  try{
  const query = "SELECT * FROM orders WHERE restaurant_id = $1 AND status='Prepare' " ;
  const result = await pool.query(query ,[id]) 
  if(result.rows.length === 0 ){
    return res.status(404).json({
      success: false,
      message: `No item found `,
    })
  }
  res.status(200).json({
    success: true ,
    result:result.rows  
  })
  }catch(err)
  {res.status(500).json({
    success: false,
    message: `Server Erorr`,
    error:err.message
  })}
}
const getRestaurantOrdersReady= async (req ,res)=>{
  const {id} = req.params ; 
  try{
  const query = "SELECT * FROM orders WHERE restaurant_id = $1 AND status='Ready To Pick Up' " ;
  const result = await pool.query(query ,[id]) 
  if(result.rows.length === 0 ){
    return res.status(404).json({
      success: false,
      message: `No item found `,
    })
  }
  res.status(200).json({
    success: true ,
    result:result.rows  
  })
  }catch(err)
  {res.status(500).json({
    success: false,
    message: `Server Erorr`,
    error:err.message
  })}
}

module.exports = {
  getRestaurantInfoById,
  getAllRestaurant,
  getRestaurantHigherRating,
  getRestaurantById,
  getAllRestaurantByCategory,
  updateRestaurantById,
  getItemsByIdForRestaurant,
  deleteRestaurantById,
  getRestaurantOrders,
  changeStatusToPrepare,
  changeStatusReadyToPickup,
  getRestaurantOrdersPrepare,
getRestaurantOrdersReady
};