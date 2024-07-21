const express = require("express");
const userRouter = express.Router();
const {
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
} = require("../controllers/users");

// User login and Information
userRouter.post("/login", login);
userRouter.post("/signup", signupCustomer);
userRouter.get("/:id", getUserInfo);
userRouter.get("/all", getAllUsers); // Get all users (admin only)
userRouter.put("/:id", updateUserInfo);
userRouter.delete("/:id", deleteUser);

// Registration Requests
userRouter.post("/riderRegistration", sendRiderRegistrationToAdmin);
userRouter.post("/restaurantOwnerRegistration", sendResOwnerRegistrationToAdmin);

// Admin: Get All Requests
userRouter.get("/riderRegistration", getAllRiderReqForTheAdmin); // Get all rider registration requests
userRouter.get("/restaurantOwnerRegistration", getAllResReqForTheAdmin); // Get all restaurant owner registration requests

// Admin: Manage Requests
userRouter.delete("/riderRegistration/:id", rejectReqRider); // Reject rider registration request
userRouter.delete("/restaurantOwnerRegistration/:id", rejectReqRes); // Reject restaurant owner registration request
userRouter.post("/riderRegistration/:id", acceptReqRider); // Accept rider registration request
userRouter.post("/restaurantOwnerRegistration/:id", acceptReqRes); // Accept restaurant owner registration request

module.exports = userRouter;
