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


/*('manage_users'),
(manage_cart)
('manage_restaurants'),
('manage_orders');*/



module.exports = roleRouter