import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/cartSlice";
import "../style.css";

const Order = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

const API_URL = import.meta.env.VITE_API_URL;

  const handleConfirmOrder = async () => {
    try {
      const response = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cartItems, totalAmount }),
      });

      if (response.ok) {
        alert("Order confirmed and saved!");
        dispatch(clearCart()); 
        navigate("/");
      } else {
        alert("Failed to save order");
      }
    } catch (error) {
      console.error("Error saving order:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="order-container">
      <h1 className="title">Your Order</h1>

      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <div className="order-list">
          {cartItems.map((item) => (
            <div key={item.id} className="order-item">
              <img
                src={item.image}
                alt={item.title}
                className="order-item-image"
              />
              <div className="order-item-details">
                <h2 className="order-item-title">{item.title}</h2>
                <p className="order-item-price">
                  ${item.price} x {item.quantity}
                </p>
                <p className="order-item-total">
                  Total: ${item.price * item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="order-summary">
          <h2>Total Bill: ${totalAmount.toFixed(2)}</h2>
          <button className="confirm-btn" onClick={handleConfirmOrder}>
            Confirm Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Order;
