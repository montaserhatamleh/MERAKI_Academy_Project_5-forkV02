
const express = require ("express")
const ridersRouter = express.Router()
const {updateRider, findAllRiders  , findRiderById , acceptOrder,setOrderOnTheWay,markOrderAsDelivered
    ,getRidersByUserId ,getAllOrderIsPending , updateStatusOrder ,deliveryOfTheOrder} = require("../controllers/riders") ;


ridersRouter.put("/:id", updateRider) 
ridersRouter.get("/all", findAllRiders) 
ridersRouter.get("/:id", findRiderById) 
ridersRouter.get("/user/:id", getRidersByUserId) 
ridersRouter.get("/all/order" ,getAllOrderIsPending)
ridersRouter.put("/status/order" , updateStatusOrder)
ridersRouter.put("/status/riders/:id" , deliveryOfTheOrder)
ridersRouter.put("/accept/:id" , acceptOrder)
ridersRouter.put("/onTheWay/:id" , setOrderOnTheWay
)
ridersRouter.put("/delivered/:id" , markOrderAsDelivered)





module.exports = ridersRouter ;
