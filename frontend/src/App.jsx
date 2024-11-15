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
import ChangePassword from './components/Screens/ChangePassword';
import EditProfile from './components/Screens/EditProfile';
import BookDetails from './components/Screens/ManageProducts/BookDetails';
import ManageBook from './components/Screens/ManageProducts/ManageBook';


import {Provider} from 'react-redux'
import { store } from './redux/store';




const App = () => {
  return (
    <Provider store={store}>
    <Router>
      <Navbar />
      <div className="container mx-auto mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<BrowseBooks />} />
          <Route path="/sell" element={<SellBook />} />
          <Route path="/account" element={<MyAccount />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path='/change-password' element={<ChangePassword/>}/>
          <Route path='/edit-profile' element={<EditProfile/>}/>
          <Route path="/books/:id" element={<BookDetails/>} />
          <Route path="/manage_books/:id" element={<ManageBook />} />
          
        </Routes>
      </div>
    </Router>
    </Provider>
  );
};

export default App;
