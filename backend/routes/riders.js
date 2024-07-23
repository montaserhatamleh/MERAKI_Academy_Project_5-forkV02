const express = require ("express")
const ridersRouter = express.Router()
const {updateRider, findAllRiders  , findRiderById , getRidersByUserId ,getAllOrderIsPending , updateStatusOrder} = require("../controllers/riders") ;


ridersRouter.put("/:id", updateRider) 
ridersRouter.get("/all", findAllRiders) 
ridersRouter.get("/:id", findRiderById) 
ridersRouter.get("/user/:id", getRidersByUserId) 
ridersRouter.get("/all/order" ,getAllOrderIsPending)
ridersRouter.put("/status/order" , updateStatusOrder)

module.exports = ridersRouter ;