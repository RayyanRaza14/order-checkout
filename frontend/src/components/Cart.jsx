import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, incrementQuantity, decrementQuantity } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../style.css";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate(); 

  console.log("Cart Items in Cart Component:", cartItems);

  return (
    <div className="container">
      <h1 className="title">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-list">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} className="cart-item-image" />
              <div className="cart-item-details">
                <h2 className="cart-item-title">{item.title}</h2>
                <p className="cart-item-price">${item.price}</p>
                <div className="quantity-controls">
                  <button onClick={() => dispatch(decrementQuantity(item.id))}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => dispatch(incrementQuantity(item.id))}>+</button>
                </div>
                <button className="remove-btn" onClick={() => dispatch(removeFromCart(item.id))}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      
      {cartItems.length > 0 && (
        <button className="checkout-btn" onClick={() => navigate("/order")}>
          Checkout
        </button>
      )}
    </div>
  );
};

export default Cart;
