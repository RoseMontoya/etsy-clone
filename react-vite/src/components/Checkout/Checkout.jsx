import "./Checkout.css";
import { useNavigate, Link } from "react-router-dom";
import { clearCart, getAllCartItems } from "../../redux/cart";
import { useDispatch, useSelector } from "react-redux";
import { updateInventory } from "../../redux/product";
import { useEffect, useState } from "react";
import { thunkAllProducts } from "../../redux/product";
function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartObj = useSelector((state) => state.cart?.cartItems);
  const allProducts = useSelector((state) => state.products?.allProducts);
  const cartArr = cartObj ? Object.values(cartObj) : [];

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiration, setCardExpiration] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [billingAddress, setBillingAddress] = useState("");

  useEffect(() => {
    if (!cartObj) {
      console.log("effect cart");
      dispatch(getAllCartItems());
    }
    if (!allProducts) {
      console.log("effect product");
      dispatch(thunkAllProducts());
    }
  }, [dispatch, cartObj, allProducts]);

  const handleCompleteTransaction = () => {
    // Ensure all fields are filled before processing the transaction
    if (
      !cardName ||
      !cardNumber ||
      !cardExpiration ||
      !cardCvv ||
      !billingAddress
    ) {
      alert("Please fill out all payment and billing information.");
      return;
    }
    // Call the backend to update the inventory
    dispatch(updateInventory()).then(() => {
      // Clear the cart after successful inventory update
      dispatch(clearCart());
      // Navigate to the success page
      navigate("/successful-transaction");
    });
  };

  if (!cartObj || !allProducts) return <h2>Loading...</h2>;

  const cartTotal = (cartArr) => {
    let total = 0;
    for (let item of cartArr) {
      if (allProducts[item.product_id]) {
        total +=
          Number(allProducts[item.product_id].price) *
          Math.min(
            Number(item.quantity),
            Number(allProducts[item.product_id].inventory)
          );
      }
    }
    return total.toFixed(2);
  };

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
          const product = allProducts[item.product_id];

          return (
            <li key={index} className="cart-item">
              <div className="cart-item-content">
                <Link to={`/products/${product.id}`}>
                  <img
                    src={product.preview_image}
                    alt={product.title}
                    className="cart-item-image"
                  />
                </Link>
                <div className="cart-item-details">
                  <Link to={`/products/${product.id}`}>
                    <h4 className="cart-item-title">{product.title}</h4>
                  </Link>
                  <p className="cart-item-seller">
                    Sold by: {product.seller.first_name}{" "}
                    {product.seller.last_name}
                  </p>
                  <p className="cart-item-price">${product.price.toFixed(2)}</p>
                  <div className="cart-item-quantity">
                    <span>Quantity:</span>
                    <p>{item.quantity}</p>
                  </div>
                  {item.gift && (
                    <p className="cart-item-gift">Gift wrapping included</p>
                  )}
                </div>
              </div>

              <div>
                <div>
                  $
                  {(
                    Number(product.price) *
                    Math.min(
                      Number(item.quantity),
                      Number(allProducts[item.product_id].inventory)
                    )
                  ).toFixed(2)}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <div>
        <span>Total: ${cartTotal(cartArr)}</span>
      </div>
      {/* Payment Form */}
      <h2>Payment Information</h2>
      <div className="payment-form">
        <div className="form-group">
          <label htmlFor="cardName">Name on Card</label>
          <input
            type="text"
            id="cardName"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="cardNumber">Card Number</label>
          <input
            type="text"
            id="cardNumber"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="cardExpiration">Expiration Date (MM/YY)</label>
          <input
            type="text"
            id="cardExpiration"
            value={cardExpiration}
            onChange={(e) => setCardExpiration(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="cardCvv">CVV</label>
          <input
            type="text"
            id="cardCvv"
            value={cardCvv}
            onChange={(e) => setCardCvv(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="billingAddress">Billing Address</label>
          <input
            type="text"
            id="billingAddress"
            value={billingAddress}
            onChange={(e) => setBillingAddress(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="cart-footer">
        <>
          {cartArr.length > 0 ? (
            <button onClick={handleCompleteTransaction}>
              Complete Transaction
            </button>
          ) : null}
        </>

        <Link to="/products" className="continue-shopping">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default Checkout;
