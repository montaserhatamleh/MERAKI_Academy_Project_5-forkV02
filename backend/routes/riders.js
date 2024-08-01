
const express = require ("express")
const ridersRouter = express.Router()
const {updateRider, findAllRiders  , findRiderById , acceptOrder,setOrderOnTheWay,markOrderAsDelivered,
    getAllOrderIsOnTheWay,
    getAllOrderIsDelivered,getAllOrderIsAccepted
    ,getRidersByUserId ,getAllOrderIsPending , updateStatusOrder ,deliveryOfTheOrder ,deletedRiders ,getItemsByOrderId } = require("../controllers/riders") ;

    
const authentication = require("../middleware/authentication")
const authorization = require("../middleware/authorization")


ridersRouter.put("/:id", updateRider) 
ridersRouter.get("/all", findAllRiders) 
ridersRouter.get("/:id", findRiderById) 
ridersRouter.get("/user/:id", getRidersByUserId) 
ridersRouter.get("/all/order" ,authentication,authorization("manage_orders"),getAllOrderIsPending)
ridersRouter.put("/status/order" , updateStatusOrder)
ridersRouter.put("/status/riders/:id" , deliveryOfTheOrder)
ridersRouter.put("/deleted/:id" , deletedRiders)
ridersRouter.get("/order/items/:id" , getItemsByOrderId)



ridersRouter.put("/accept/:orderId" ,authentication,authorization("manage_orders"), acceptOrder)
//ridersRouter.put("/accept/:id/:orderId" , acceptOrder)
ridersRouter.put("/onTheWay/:orderId" ,authentication,authorization("manage_orders"), setOrderOnTheWay)
 // ridersRouter.put("/onTheWay/:id/:orderId" , setOrderOnTheWay) ;
ridersRouter.put("/delivered/:orderId" , authentication,authorization("manage_orders"),markOrderAsDelivered)
//ridersRouter.put("/delivered/:id/:orderId" , markOrderAsDelivered) ;
ridersRouter.get("/all/onTheWay",authentication,authorization("manage_orders"), getAllOrderIsOnTheWay) 
// ridersRouter.get("/onTheWay/:id", getAllOrderIsOnTheWay) 
ridersRouter.get("/all/delivered",authentication,authorization("manage_orders"), getAllOrderIsDelivered) 
// ridersRouter.get("/delivered/:id", getAllOrderIsDelivered) 
ridersRouter.get("/all/accepted",authentication,authorization("manage_orders"), getAllOrderIsAccepted) 
// ridersRouter.get("/accepted/:id", getAllOrderIsAccepted) 








module.exports = ridersRouter ;
