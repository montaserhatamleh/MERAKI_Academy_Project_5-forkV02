import { createBrowserRouter } from 'react-router-dom';
import Main from '../layouts/Main';
import Home from "../pages/Home/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import BecomePartner from "../pages/BecomePartner";
import BecomeRider from "../pages/BecomeRider";
import Cart from '../pages/Cart';

import GetAllRiderRigertions from "../pages/Admin/getAllRegister"
import GetAllRegistrationOwner from "../pages/Admin/getAllOwner"
import GetAllUsers from '../pages/Admin/getAllUsers';
import GetAllRiders from '../pages/Admin/getAllRiders'
import GetAllRestaurants from '../pages/Admin/getAllRestaurants'
import Restaurants from "../pages/Restaurants"

import Owner from '../pages/Owner/Owner';

import Mycart from '../pages/Mycart';
import ViewRestaurantInfo from '../pages/Owner/ViewRestaurantInfo';
import UpdateRestaurantInfo from '../pages/Owner/UpdateRestaurantInfo';
import ViewItems from '../pages/Owner/ViewItems';
import AddItem from '../pages/Owner/AddItem';
import UpdateItem from '../pages/Owner/UpdateItem';
import Admin from '../pages/Admin/Admin';

import Profile from '../pages/Riders/Profile'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'signin',
        element: <SignIn />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
      {
        path: 'become-partner',
        element: <BecomePartner />,
      },
      {
        path: 'become-rider',
        element: <BecomeRider />,
      },{
        path: 'restaurants',
        element: <Restaurants />,
      },{    
      path:'admin',
      element:<Admin/>,
      children: [
        {path: 'get_All_Rider_registretion',element: <GetAllRiderRigertions />,},
        {path: '/admin',element: <GetAllUsers />,},
        {path: 'get_All_registration_Owner', element: <GetAllRegistrationOwner />},
        {path:'get_all_riders',element:<GetAllRiders/>},
        {path:'get_all_restaurants',element:<GetAllRestaurants/>},

      ]},
      {
        path:'restaurant_owner',
        element:<Owner/>,
        children: [
          {path: 'view-info', element: <ViewRestaurantInfo /> },
          {path: 'update-info', element: <UpdateRestaurantInfo /> },
          {path:'view-item',element:<ViewItems/>},
          {path:'add-item',element:<AddItem/>},
          {path:'update-item/:id',element:<UpdateItem/>},

        ],
      },{
        path:'my_cart',
        element:<Mycart/>
      },
  {
    path: '/cart',
    element: <Cart />,
  },{
    path:"profile",
    element:<Profile/>
    }

    ],
   
  },
]);
