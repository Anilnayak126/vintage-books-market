// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Screens/Home';
import BrowseBooks from './components/Screens/BrowseBooks';
import SellBook from './components/Screens/SellBook';
import MyAccount from './components/Screens/MyAccount';
import Cart from './components/Screens/Cart';
import Login from './components/Screens/Login';
import RegisterPage from './components/Screens/Register';


import {Provider} from 'react-redux'
import { store } from './redux/store';




const App = () => {
  return (
    <Provider store={store}>
    <Router>
      <Navbar />
      <div className="container mx-auto mt-4">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/browse" element={<BrowseBooks />} />
          <Route path="/sell" element={<SellBook />} />
          <Route path="/account" element={<MyAccount />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </Router>
    </Provider>
  );
};

export default App;
