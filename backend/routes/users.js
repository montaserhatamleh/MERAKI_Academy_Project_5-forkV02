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
const authentication = require("../middleware/authentication")
const authorization = require("../middleware/authorization")
const multiparty = require('connect-multiparty');
const multipartyMiddleware = multiparty();

// User login and Information
userRouter.post("/login", login);
userRouter.post("/signup", signupCustomer);
userRouter.get("/:id", authentication,getUserInfo);
userRouter.get("/all", authentication,authorization("manage_users"),getAllUsers); // Get all users (admin only)
userRouter.put("/:id", updateUserInfo);
userRouter.delete("/:id", authentication,authorization("manage_users"),deleteUser);

// Registration Requests
userRouter.post("/riderRegistration",sendRiderRegistrationToAdmin);
userRouter.post("/restaurantOwnerRegistration",multipartyMiddleware, sendResOwnerRegistrationToAdmin);

// Admin: Get All Requests
userRouter.get("/rider/Registration", authentication,authorization("manage_users"),getAllRiderReqForTheAdmin); // Get all rider registration requests
userRouter.get("/restaurantOwner/Registration",authentication,authorization("manage_users"), getAllResReqForTheAdmin); // Get all restaurant owner registration requests

// Admin: Manage Requests
userRouter.delete("/riderRegistration/:id",authentication,authorization("manage_users"), rejectReqRider); // Reject rider registration request
userRouter.delete("/restaurantOwnerRegistration/:id",authentication,authorization("manage_users"), rejectReqRes); // Reject restaurant owner registration request
userRouter.post("/riderRegistration/:id", authentication,authorization("manage_users"),acceptReqRider); // Accept rider registration request
userRouter.post("/restaurantOwnerRegistration/:id",authentication,authorization("manage_users"), acceptReqRes); // Accept restaurant owner registration request

module.exports = userRouter;
