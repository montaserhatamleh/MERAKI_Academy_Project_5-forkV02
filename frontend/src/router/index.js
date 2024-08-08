import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import BecomePartner from "../pages/BecomePartner";
import BecomeRider from "../pages/BecomeRider";

//Admin
import GetAllRiderRigertions from "../pages/Admin/getAllRegister";
import GetAllRegistrationOwner from "../pages/Admin/getAllOwner";
import GetAllUsers from "../pages/Admin/getAllUsers";
import GetAllRiders from "../pages/Admin/getAllRiders";
import GetAllRestaurants from "../pages/Admin/getAllRestaurants";
import GetAllRider from "../pages/Admin/getAllRegister";
import GetAllOwner from "../pages/Admin/getAllOwner";
import Admin from "../pages/Admin/Admin";

// rider
import AllCompletedOrders from "../pages/Riders/AllCompletedOrders";
import AllOrdersDelivered from "../pages/Riders/AllOrdersDelivered";
import AllOrdersOnWay from "../pages/Riders/AllOrdersOnWay";
import AllOrdersReady from "../pages/Riders/AllOrdersReady";
import Rider from "../pages/Riders/Rider";
import Profile from "../pages/Riders/Profile";

//res owner
import Owner from "../pages/Owner/Owner";
import ViewRestaurantInfo from "../pages/Owner/ViewRestaurantInfo";
import UpdateRestaurantInfo from "../pages/Owner/UpdateRestaurantInfo";
import ViewItems from "../pages/Owner/ViewItems";
import AddItem from "../pages/Owner/AddItem";
import UpdateItem from "../pages/Owner/UpdateItem";
import PendingOrders from "../pages/Owner/PendingOrders";
import PreparedOrders from "../pages/Owner/PreparedOrders";
import DeliveredOrders from "../pages/Owner/DeliveredOrders";

//pages
import Restaurants from "../pages/Restaurants";
import Mycart from "../pages/Mycart";
// import Cart from "../pages/Cart";
import UserOrders from "../pages/UserOrders";
import OneRest from "../pages/OneRest";

import ProfileUser from "../pages/ProfileUser";
import OrderItems from "../pages/OrderItems";


import Socket from "../components/socket"


import Contact from "../pages/Contact";
import Faq from "../components/Faq";
import Terms from "../components/Terms";
import Privacy from "../components/Privacy";
import AboutUs from "../components/Aboutus";
import Services from "../components/Services";

//route
import PrivateRoute from '../components/PrivateRoute'; 

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "become-partner",
        element: <BecomePartner />,
      },
      {
        path: "become-rider",
        element: <BecomeRider />,
      },
      {
        path: "userOrders",
        element: <PrivateRoute requiredRole={['Customer']}><UserOrders /></PrivateRoute>,
      },
      {
        path: "admin",
        element: <PrivateRoute requiredRole={['Admin']}><Admin /></PrivateRoute>,
        children: [
          {
            path: "get_All_Rider_registretion",
            element: <GetAllRiderRigertions />,
          },
          { path: "", element: <GetAllUsers /> },
          {
            path: "get_All_registration_Owner",
            element: <GetAllRegistrationOwner />,
          },
          { path: "get_all_riders", element: <GetAllRiders /> },
          { path: "get_all_restaurants", element: <GetAllRestaurants /> },
        ],
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "get_All_Rider",
        element: <PrivateRoute requiredRole={['Admin']}><GetAllRider /></PrivateRoute>,
      },
      {
        path: "get_All_Owner",
        element: <PrivateRoute requiredRole={['Admin']}><GetAllOwner /></PrivateRoute>,
      },
      {
        path: "restaurants",
        element: <Restaurants />,
      },
      {
        path: "one/:id",
        element: <OneRest />,
      },
      {
        path: "socket",
        element: <Socket />,
      },
      {
        path: "restaurant_owner",
        element: <PrivateRoute requiredRole={['Restaurant Owner']}><Owner /></PrivateRoute>,
        children: [
          { path: "/restaurant_owner", element: <ViewRestaurantInfo /> },
          { path: "update-info", element: <UpdateRestaurantInfo /> },
          { path: "view-item", element: <ViewItems /> },
          { path: "add-item", element: <AddItem /> },
          { path: "update-item/:id", element: <UpdateItem /> },
          { path: "pending-orders", element: <PendingOrders /> },
          { path: "prepared-orders", element: <PreparedOrders /> },
          { path: "delivered-orders", element: <DeliveredOrders /> },
        ],
      },
      {
        path: "rider",
        element: <PrivateRoute requiredRole={['Rider']}><Rider /></PrivateRoute>,
        children: [
          { path: "All_complete_order", element: <AllCompletedOrders /> },
          { path: "All_delivered_order", element: <AllOrdersDelivered /> },
          { path: "All__order_on_way", element: <AllOrdersOnWay /> },
          { path: "", element: <AllOrdersReady /> },
          { path: "profile", element: <Profile /> },
        ],
      },

      {
        path: "profile_user",
        element: <PrivateRoute requiredRole={['Customer']}><ProfileUser /></PrivateRoute>,
      },
      {
        path: "my_cart",
        element: <PrivateRoute requiredRole={['Customer']}><Mycart /></PrivateRoute>,
      },
      {
        path: "order_item/:id",
        element: <PrivateRoute requiredRole={['Customer']}><OrderItems /></PrivateRoute>,
      },
      {
        path: "faq",
        element: <Faq />,
      },
      {
        path: "terms",
        element: <Terms />,
      },
      {
        path: "privacy",
        element: <Privacy />,
      },
      {
        path: "about",
        element: <AboutUs />,
      },
      {
        path: "services",
        element: <Services />,
      },

    ],
  },
]);