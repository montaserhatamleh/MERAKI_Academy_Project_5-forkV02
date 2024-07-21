const {pool} = require("../models/db")

const createRole =async (req, res) => {

    const {role} = req.body 
    try {
      const result = await pool.query (
        `INSERT INTO roles (role) VALUES ($1) RETURNING *` , [role]
      )
      res.status(201).json({
        success:true,
        message: "Created",
        role: result.rows[0]
      })
    }
    catch(err){
      res.status(500).json({
        success: false,
        message:"server err",
        err:err.stack
      })
    }
  };
  
  // This function creates new permission
  const createPermission = async(req, res) => {

    const {permission} = req.body 
    try {
      const result = await pool.query (
        `INSERT INTO permissions (permission) VALUES ($1) RETURNING *` , [permission]
      )
      res.status(201).json({
        success:true,
        message: "Created",
        permission: result.rows[0]
      })
    }
    catch(err){
      res.status(500).json({
        success: false,
        message:"server err",
        err:err.stack
      })
    }  };
  
  // This function creates new role permission role_permissions
  const createRolePermission =async (req, res) => {

    const {role_id,permission_id} = req.body 
    try {
      const result = await pool.query (
        `INSERT INTO role_permissions (role_id,permission_id) VALUES ($1) RETURNING *` , [role_id,permission_id]
      )
      res.status(201).json({
        success:true,
        message: "Created",
        role_permissions: result.rows[0]
      })
    }
    catch(err){
      res.status(500).json({
        success: false,
        message:"server err",
        err:err.stack
      })
    }   };



module.exports = {createRole,createPermission,createRolePermission}