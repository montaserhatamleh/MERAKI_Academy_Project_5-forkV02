const {pool} = require("../models/db")

const bcryptjs = require("bcryptjs")
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET

const signupCustomer = async (req, res) => {
    const {
        first_name,
        last_name,
        username,
        phone_number,
        email,
        password,
        address,
        role_id // customer
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
        `INSERT INTO users (first_name,last_name,phone_number,username,email,password,address,role_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *` , [first_name,last_name,phone_number,username,email,password_hash,address,role_id]
       )

       const cart = await pool.query(
        `INSERT INTO carts (user_id) VALUES($1) RETURNING *`,[user.rows[0].user_id]
       )
       res.status(201).json({
        success: true,
        message: " email created" ,new_user:user.rows[0],
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
    const {email,password,role} = req.body
    try {
    const emailCheck = await pool.query(`SELECT users.*,roles.role_name from users INNER JOIN roles ON users.role_id = roles.role_id WHERE email = ($1)`,[email])
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
    if (user.role_name !== role) {
        return res.status(403).json({
            success: false,
            message: `Access denied.`
        });
    }
    
    console.log(emailCheck.rows[0]);
    const payload = {
      userId : emailCheck.rows[0].user_id,
      username: emailCheck.rows[0].username,
      role: emailCheck.rows[0].role_id
    }
    console.log(payload);
    const options =  { expiresIn: "60m" }
    const token = jwt.sign(payload,SECRET,options)
    res.status(200).json({
      success:true,
      message:"Valid login credentials",
      token:token,
      userId: emailCheck.rows[0].user_id
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

const getUserInfo = async (req, res) => {
    const { id } = req.params;
    try {
        const userResult = await pool.query('SELECT * FROM users WHERE user_id = $1', [id]);
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
            error: err.stack
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
            error: err.stack
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
                address = COALESCE($6, address), 
                updated_at = CURRENT_TIMESTAMP 
            WHERE user_id = $7 
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

    try {
        const deletedUser = await pool.query('DELETE FROM users WHERE user_id = $1 RETURNING *', [id]);

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
        role_id,
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
            role_id,
            vehicle_details]
        )
        res.status(201).json({
success:true,
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
        role_id,
        category,
        restaurant_name,
        restaurant_address,
        restaurant_phone_number } = req.body
try {
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
restaurant_phone_number) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *`,[username,
            email,
            password,
            first_name,
            last_name,
            address,
            phone_number,
            role_id,
            category,restaurant_name,restaurant_address,restaurant_phone_number]
        )
        res.status(201).json({
success:true,
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

        const password_hash = await bcryptjs.hash(rider.password, 8);

        const newUser = await pool.query(
            `INSERT INTO users (username, email, password_hash, first_name, last_name, address, phone_number, role_id) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [rider.username, rider.email, password_hash, rider.first_name, rider.last_name, rider.address, rider.phone_number, rider.role_id]
        );

        const userId = newUser.rows[0].user_id;

        const newRider = await pool.query(
            `INSERT INTO riders (user_id, vehicle_details, status) 
            VALUES ($1, $2, $3) RETURNING *`,
            [userId, rider.vehicle_details, 'available']
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
    
            const password_hash = await bcryptjs.hash(resOwner.password, 8);
    
            const newUser = await pool.query(
                `INSERT INTO users (username, email, password_hash, first_name, last_name, address, phone_number, role_id) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
                [resOwner.username, resOwner.email, password_hash, resOwner.first_name, resOwner.last_name, resOwner.address, resOwner.phone_number, resOwner.role_id] // rider role 
            );
    
            const userId = newUser.rows[0].user_id;
    
            const newRestaurant = await pool.query(
                `INSERT INTO restaurants (name, address, category, phone_number, user_id) 
                VALUES ($1, $2, $3, $4, $5) RETURNING *`,
                [resOwner.restaurant_name, resOwner.restaurant_address, resOwner.category, resOwner.restaurant_phone_number, userId]
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
