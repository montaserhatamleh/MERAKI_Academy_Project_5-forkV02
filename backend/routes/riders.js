
const express = require ("express")
const ridersRouter = express.Router()
const {updateRider, findAllRiders  , findRiderById , acceptOrder,setOrderOnTheWay,markOrderAsDelivered,
    getAllOrderIsOnTheWay,
    getAllOrderIsDelivered,getAllOrderIsAccepted
    ,getRidersByUserId ,getAllOrderIsPending , updateStatusOrder ,deliveryOfTheOrder} = require("../controllers/riders") ;

    
const authentication = require("../middleware/authentication")
const authorization = require("../middleware/authorization")


ridersRouter.put("/:id", updateRider) 
ridersRouter.get("/all", findAllRiders) 
ridersRouter.get("/:id", findRiderById) 
ridersRouter.get("/user/:id", getRidersByUserId) 
ridersRouter.get("/all/order" ,authentication,authorization("manage_orders"),getAllOrderIsPending)
ridersRouter.put("/status/order" , updateStatusOrder)
ridersRouter.put("/status/riders/:id" , deliveryOfTheOrder)




ridersRouter.put("/accept/:id" ,authentication,authorization("manage_orders"), acceptOrder)
ridersRouter.put("/onTheWay/:id" ,authentication,authorization("manage_orders"), setOrderOnTheWay)
ridersRouter.put("/delivered/:id" , authentication,authorization("manage_orders"),markOrderAsDelivered)
ridersRouter.get("/onTheWay",authentication,authorization("manage_orders"), getAllOrderIsOnTheWay) 
ridersRouter.get("/delivered",authentication,authorization("manage_orders"), getAllOrderIsDelivered) 
ridersRouter.get("/accepted",authentication,authorization("manage_orders"), getAllOrderIsAccepted) 








module.exports = ridersRouter ;
