import React from "react";
import {  Routes, Route, Link } from "react-router-dom";
import Card from "./components/Card";
import Cart from "./components/Cart";
import { useSelector } from "react-redux";
import Order from "./components/Order";

const App = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  return (
    <>
      <div className="app-container">
        <nav>
          <Link to="/">Home</Link>
          {cartItems.length > 0 && <Link to="/cart" className="cart-btn">Go to Cart ({cartItems.length})</Link>}
        </nav>
        <Routes>
          <Route path="/" element={<Card />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
