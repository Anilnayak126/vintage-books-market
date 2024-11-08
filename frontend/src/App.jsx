// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Screens/Home';
import BrowseBooks from './components/Screens/BrowseBooks';
import SellBook from './components/Screens/SellBook';
import MyAccount from './components/Screens/MyAccount';
import Cart from './components/Screens/Cart';




const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<BrowseBooks />} />
          <Route path="/sell" element={<SellBook />} />
          <Route path="/account" element={<MyAccount />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
