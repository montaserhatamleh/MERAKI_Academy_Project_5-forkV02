import React from 'react'
import "./App.css";
import "@fontsource/roboto";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


import { RouterProvider } from 'react-router-dom';
import { router } from './router';
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const App = () => {
  return (
   <div className="App">
            <Elements stripe={stripePromise}>

    <RouterProvider router={router}>

    </RouterProvider>
    </Elements>

    </div>
  )
}





export default App
