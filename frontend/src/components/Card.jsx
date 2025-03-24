import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";
import { addToCart } from "../redux/cartSlice";
import "../style.css";

const Card = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);
  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === "loading") return <p className="loading">Loading products...</p>;
  if (status === "failed") return <p className="error">Error: {error}</p>;

  return (
    <div className="container">
      <h1 className="title">Product List</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} className="product-image" />
            <h2 className="product-title">{product.title}</h2>
            <p className="product-price">${product.price}</p>
            <button className="add-to-cart" onClick={() =>{
                 console.log("Adding to cart:", product); 
                 dispatch(addToCart(product))
                 }}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {cartItems.length > 0 && (
        <div className="footer">
          <button className="go-to-cart" onClick={() => window.location.href = "/cart"}>
            Go to Cart ({cartItems.length})
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
