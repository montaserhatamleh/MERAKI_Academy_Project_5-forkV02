import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import "./main.css"
const Main = () => {
  return (
    <div className='App'>
      <Header />
      <main className='content'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Main;
