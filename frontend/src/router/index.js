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
      }

      
    ],
  },
]);
