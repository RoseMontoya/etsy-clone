import "./Cart.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllCartItems } from "../../redux/cart";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.session.user);
  const cartObj = useSelector((state) => state.cart?.cartItems);

  const cartArr = cartObj ? Object.values(cartObj) : [];
  console.log("FRONT END ========>", cartObj);

  useEffect(() => {
    if (!cartObj) {
      dispatch(getAllCartItems());
    }
  }, [dispatch]);

  if (cartArr.length === 0) {
    return (
      <div>
        <p>Your cart is empty</p>
        <Link to="/products">Discover something unique to fill it up</Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      <div className="cart-summary">
        {cartArr.length === 1
          ? `${cartArr.length} item in your cart`
          : `${cartArr.length} items in your cart`}
      </div>

      <ul className="cart-list">
        {cartArr.map((item, index) => {
          const product = item.product;

          return (
            <li key={index} className="cart-item">
              <img
                src={product.preview_image}
                alt={product.title}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h4 className="cart-item-title">{product.title}</h4>
                <p className="cart-item-seller">
                  Sold by: {product.seller.first_name}{" "}
                  {product.seller.last_name}
                </p>
                <p className="cart-item-price">${product.price.toFixed(2)}</p>
                <div className="cart-item-quantity">
                  <span>Quantity:</span>
                  <span>{item.quantity}</span>
                </div>
                {item.gift && (
                  <p className="cart-item-gift">Gift wrapping included</p>
                )}
              </div>
              <div className="cart-item-actions">
                <button className="cart-item-remove">Remove</button>
                {/* Additional actions like updating quantity or saving for later can go here */}
              </div>
            </li>
          );
        })}
      </ul>

      <div className="cart-footer">
        <button className="checkout-button">Proceed to Checkout</button>
        <Link to="/products" className="continue-shopping">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default Cart;
