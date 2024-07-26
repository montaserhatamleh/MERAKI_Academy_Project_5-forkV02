import React from 'react'
import "./App.css";
import "@fontsource/roboto";

import { RouterProvider } from 'react-router-dom';
import { router } from './router';
const App = () => {
  return (
   <div className="App">
    <RouterProvider router={router}>

    </RouterProvider>
    </div>
  )
}

export default App
