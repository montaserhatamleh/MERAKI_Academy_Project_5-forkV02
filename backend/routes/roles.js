const express = require ("express")
const roleRouter = express.Router()
const {createRole,createPermission,createRolePermission} = require("../controllers/roles")

roleRouter.post("/role",createRole)
roleRouter.post("/permission",createPermission)
roleRouter.post("/rolePermission",createRolePermission)

/*('Admin'),
('Customer'),
('Rider'),
('Restaurant Owner');*/

/*('view_users'),
('edit_users'),
('delete_users'),
('manage_restaurants'),
('view_orders'),
('manage_orders');*/



module.exports = roleRouter