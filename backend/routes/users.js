const express = require ("express")
const userRouter = express.Router()

userRouter.post("/login",)
userRouter.post("/signup",)
userRouter.get("/:id",)
userRouter.get("/all",) // all users for the admin

userRouter.put("/:id",)
userRouter.delete("/:id",)
userRouter.post("/riderRegistration",)
userRouter.post("/restaurantOwnerRegistration",)
userRouter.get("/riderRegistration",) // get all request for the admin 
userRouter.get("/restaurantOwnerRegistration",)//get all request for the admin 
userRouter.delete("/riderRegistration/:id",)// admin to delete  them 
userRouter.delete("/restaurantOwnerRegistration/:id",)// admin to delete  them 

userRouter.post("/riderRegistration/:id",)// admin to accept and add them 
userRouter.post("/restaurantOwnerRegistration/:id",)// admin to accept and add them 




module.exports = userRouter