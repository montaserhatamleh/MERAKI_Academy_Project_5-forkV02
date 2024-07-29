import { createBrowserRouter } from 'react-router-dom';
import Main from '../layouts/Main';
import Home from "../pages/Home/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import BecomePartner from "../pages/BecomePartner";
import BecomeRider from "../pages/BecomeRider";
import GetAllRider from "../pages/Admin/getAllRegister"

import GetAllOwner from "../pages/Admin/getAllOwner"

import Restaurants from "../pages/Restaurants"
import Owner from '../pages/Owner/Owner';

import Mycart from '../pages/Mycart';
import ViewRestaurantInfo from '../pages/Owner/ViewRestaurantInfo';
import UpdateRestaurantInfo from '../pages/Owner/UpdateRestaurantInfo';
import ViewItems from '../pages/Owner/ViewItems';
import AddItem from '../pages/Owner/AddItem';
import UpdateItem from '../pages/Owner/UpdateItem';


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
      },
      {
        path: 'get_All_Rider',
        element: <GetAllRider />,
      },
      {

      path: 'get_All_Owner',
      element: <GetAllOwner />,
    },{

        path: 'restaurants',
        element: <Restaurants />,
      },{
        path:'restaurant_owner',
        element:<Owner/>,
        children: [
          { path: 'view-info', element: <ViewRestaurantInfo /> },
          { path: 'update-info', element: <UpdateRestaurantInfo /> },
          {path:'view-item',element:<ViewItems/>},
          {path:'add-item',element:<AddItem/>},
          {path:'update-item/:id',element:<UpdateItem/>},

        ],
      },{
        path:'my_cart',
        element:<Mycart/>
      }

    ],
  },
]);
