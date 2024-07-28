const {pool} = require("../models/db")

const bcryptjs = require("bcryptjs")
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET
const cloudinary = require('../cloud'); 

const signupCustomer = async (req, res) => {
    const {
        first_name,
        last_name,
        username,
        phone_number,
        email,
        password,
        address,
     // customer
      } = req.body
      
      try {
        const emailCheck = await pool.query(
      `SELECT email FROM users WHERE email = ($1)` , [email]
        )
        if (emailCheck.rows.length > 0){
      return res.status(409).json({
        success:false,
        message:"email already exists"
      })
        }
       const password_hash = await bcryptjs.hash(password,8)
       const user = await pool.query(
        `INSERT INTO users (first_name,last_name,phone_number,username,email,password,address,role_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *` , [first_name,last_name,phone_number,username,email,password_hash,address,2]
       )

       const cart = await pool.query(
        `INSERT INTO carts (user_id) VALUES($1) RETURNING *`,[user.rows[0].id]
       )
       res.status(201).json({
        success: true,
        message: "email created with cart" ,
        new_user:user.rows[0],
        new_cart:cart.rows[0]
       })
      }
      catch(err){
        res.status(500).json({
          success:false,
          message: " server error",
          err:err.stack
        })
      
      }

};



const login = async (req, res) => {
    const {email,password} = req.body
    try {
    const emailCheck = await pool.query(`SELECT users.*,roles.role_name from users INNER JOIN roles ON users.role_id = roles.id WHERE email =$1 AND deleted_at = false`,[email])
    console.log(emailCheck.rows)
    if(!emailCheck.rows.length>0){
     return res.status(403).json({
        success:false,
        message:"The Email doesn’t exist or the password you’ve entered is incorrect"
      })
    
    }

   const passwordCheck = await bcryptjs.compare(password,emailCheck.rows[0].password)
   if (!passwordCheck){
     return res.status(403).json({
       success:false,
       message:"The email doesn’t exist or the Password you’ve entered is incorrect"
     })
    }

   
    const payload = {
      userId : emailCheck.rows[0].id,
      username: emailCheck.rows[0].username,
      role: emailCheck.rows[0].role_id,
      address:emailCheck.rows[0].address
    }
    console.log(payload);
    const options =  { expiresIn: "60m" }
    const token = jwt.sign(payload,SECRET,options)
    res.status(200).json({
      success:true,
      message:"Valid login credentials",
      token:token,
      role: emailCheck.rows[0].role_name,
      user:emailCheck.rows[0].id
      
    })
    
}
    catch(err){
      res.status(500).json({
        success:false,
        message: " server error",
        err:err.stack
      })
    
    }
}
    


const getUserInfo = async (req, res) => {
    const { id } = req.params;
    try {
        const userResult = await pool.query('SELECT * FROM users WHERE id = $1 AND deleted_at=false', [id]);
        if (userResult.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        res.status(200).json({
            success: true,
            user: userResult.rows[0]
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: err.message
        });
    }
};


const getAllUsers = async (req, res) => {
    try {
        const usersResult = await pool.query('SELECT * FROM users');
        res.status(200).json({
            success: true,
            users: usersResult.rows
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: err.message
        });
    }
};

const updateUserInfo = async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, username, phone_number, email, address } = req.body;

    try {
        const updatedUser = await pool.query(
            `UPDATE users SET 
                first_name = COALESCE($1, first_name), 
                last_name = COALESCE($2, last_name), 
                username = COALESCE($3, username), 
                phone_number = COALESCE($4, phone_number), 
                email = COALESCE($5, email), 
                address = COALESCE($6, address)    
            WHERE id = $7 AND deleted_at =false
            RETURNING *`,
            [first_name, last_name, username, phone_number, email, address, id]
        );

        if (updatedUser.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            user: updatedUser.rows[0]
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: err.stack
        });
    }
};


const deleteUser = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    try {
        const deletedUser = await pool.query("UPDATE users SET deleted_at ='1' WHERE id= $1 RETURNING *", [id]);

        if (deletedUser.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: err.stack
        });
    }
};


const sendRiderRegistrationToAdmin = async (req, res) => {

    const {username,
        email,
        password,
        first_name,
        last_name,
        address,
        phone_number,
        vehicle_details} = req.body
try {
        const newRider = await pool.query(
            `INSERT INTO pending_registrations_rider (username,
        email,
        password,
        first_name,
        last_name,
        address,
        phone_number,
        role_id,
        vehicle_details) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,[username,
            email,
            password,
            first_name,
            last_name,
            address,
            phone_number,
            3,
            vehicle_details]
        )
        res.status(201).json({
success:true,
message:"request added successfully, Wait a response from us!",
result:newRider.rows[0]
        })
    }
        catch (err) {
            res.status(500).json({
                success: false,
                message: 'Server error',
                error: err.stack
            });
        }

};

const sendResOwnerRegistrationToAdmin = async (req, res) => {
    const {username,
        email,
        password,
        first_name,
        last_name,
        address,
        phone_number,
        category,
        restaurant_name,
        restaurant_address,
        restaurant_phone_number,
        delivery_fees } = req.body
try {

    let image_url = null;
    if (req.files && req.files.image) {
      const result = await cloudinary.uploader.upload(req.files.image.path, {
        folder: 'res_images',
      });
      image_url = result.secure_url;
    }

        const newRes = await pool.query(
            `INSERT INTO pending_registrations_ownerRes (username,
        email,
        password,
        first_name,
        last_name,
        address,
        phone_number,
        role_id,
        category,
restaurant_name,
restaurant_address,
restaurant_phone_number,

delivery_fees,
image_url) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING *`,[username,
            email,
            password,
            first_name,
            last_name,
            address,
            phone_number,
            4,
            category,restaurant_name,restaurant_address,restaurant_phone_number,delivery_fees,
            image_url]
        )
        res.status(201).json({
success:true,
message:"request added successfully, Wait a response from us!",
result:newRes.rows[0]
        })
    }
        catch (err) {
            res.status(500).json({
                success: false,
                message: 'Server error',
                error: err.stack
            });
        }

};

const getAllRiderReqForTheAdmin = async (req, res) => {
    try {
        const ridersResult = await pool.query('SELECT * FROM pending_registrations_rider');
        res.status(200).json({
            success: true,
            riders: ridersResult.rows
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: err.stack
        });
    }

};

const getAllResReqForTheAdmin = async (req, res) => {
    try {
        const resResult = await pool.query('SELECT * FROM pending_registrations_ownerRes');
        res.status(200).json({
            success: true,
            result: resResult.rows
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: err.stack
        });
    }
};

const rejectReqRider = async (req, res) => {
        const { id } = req.params;
    
        try {
            const result = await pool.query('DELETE FROM pending_registrations_rider WHERE id = $1 RETURNING *', [id]);
    
            if (result.rows.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Rider registration request not found'
                });
            }
    
            res.status(200).json({
                success: true,
                message: 'Rider registration request rejected',
                result: result.rows[0]
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: 'Server error',
                error: err.stack
            });
        }
    
}


const rejectReqRes = async (req, res) => {
        const { id } = req.params;
    
        try {
            const result = await pool.query('DELETE FROM pending_registrations_ownerRes WHERE id = $1 RETURNING *', [id]);
    
            if (result.rows.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Restaurant owner registration request not found'
                });
            }
    
            res.status(200).json({
                success: true,
                message: 'Restaurant owner registration request rejected',
                result: result.rows[0]
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: 'Server error',
                error: err.stack
            });
        }
    
}



const acceptReqRider = async (req, res) => {


    const { id } = req.params;

    try {
        const pendingRider = await pool.query('SELECT * FROM pending_registrations_rider WHERE id = $1', [id]);

        if (pendingRider.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Rider registration request not found'
            });
        }

        const rider = pendingRider.rows[0];

        const password = await bcryptjs.hash(rider.password, 8);

            const newUser = await pool.query(
                `INSERT INTO users (username, email, password, first_name, last_name, address, phone_number, role_id) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
                [rider.username, rider.email, password, rider.first_name, rider.last_name, rider.address, rider.phone_number, rider.role_id]
            );

        const userId = newUser.rows[0].id;

        const newRider = await pool.query(
            `INSERT INTO riders (user_id, vehicle_details) 
            VALUES ($1, $2) RETURNING *`,
            [userId, rider.vehicle_details]
        );

        await pool.query('DELETE FROM pending_registrations_rider WHERE id = $1', [id]);

        res.status(201).json({
            success: true,
            message: 'Rider registration request accepted',
            user: newUser.rows[0],
            rider: newRider.rows[0]
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: err.stack
        });
    }


};

const acceptReqRes = async (req, res) => 
    
    {

        const { id } = req.params;

        try {
            const pendingRes = await pool.query('SELECT * FROM pending_registrations_ownerRes WHERE id = $1', [id]);
    
            if (pendingRes.rows.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Restaurant owner registration request not found'
                });
            }
    
            const resOwner = pendingRes.rows[0];
            console.log(resOwner)
            const password_hash = await bcryptjs.hash(resOwner.password, 8);
    
            const newUser = await pool.query(
                `INSERT INTO users (username, email, password, first_name, last_name, address, phone_number, role_id) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
                [resOwner.username, resOwner.email, password_hash, resOwner.first_name, resOwner.last_name, resOwner.address, resOwner.phone_number, resOwner.role_id] // res role 
            );
    
            const userId = newUser.rows[0].id;
    
            const newRestaurant = await pool.query(


                `INSERT INTO restaurants (name, address, category, phone_number, user_id,delivery_fees,image_url) 
                VALUES ($1, $2, $3, $4, $5,$6,$7) RETURNING *`,
                [resOwner.restaurant_name, resOwner.restaurant_address, resOwner.category, resOwner.restaurant_phone_number, userId,resOwner.delivery_fees,resOwner.image_url]

            );
    
            await pool.query('DELETE FROM pending_registrations_ownerRes WHERE id = $1', [id]);
    
            res.status(201).json({
                success: true,
                message: 'Restaurant owner registration request accepted',
                user: newUser.rows[0],
                restaurant: newRestaurant.rows[0]
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
    login,
    signupCustomer,
    getUserInfo,
    getAllUsers,
    updateUserInfo,
    deleteUser,
    sendRiderRegistrationToAdmin,
    sendResOwnerRegistrationToAdmin,
    getAllRiderReqForTheAdmin,
    getAllResReqForTheAdmin,
    rejectReqRider,
    rejectReqRes,
    acceptReqRider,
    acceptReqRes
};
