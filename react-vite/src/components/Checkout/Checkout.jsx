// React Imports
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, Navigate } from "react-router-dom";

// Redux Imports
import {
  clearCart,
  getAllCartItems,
  updateInventory,
  thunkAllProducts,
} from "../../redux";

// Design Imports
import "./Checkout.css";

// Helper Imports
import { Loading } from "../SubComponents";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Select cart items and products from the Redux store
  const user = useSelector((state) => state.session.user);
  const cartObj = useSelector((state) => state.cart?.cartItems);
  const allProducts = useSelector((state) => state.products?.allProducts);
  const cartArr = cartObj ? Object.values(cartObj) : [];

  // State variables for handling form input and errors
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiration, setCardExpiration] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Fetch cart items and products if they are not already loaded
    if (!cartObj) {
      dispatch(getAllCartItems());
    }
    if (!allProducts) {
      dispatch(thunkAllProducts());
    }
  }, [dispatch, cartObj, allProducts]);

  // Function to validate form input fields
  const validateForm = () => {
    const errorObj = {};

    if (!cardName) errorObj.cardName = "Name is required.";

    const cardNumberRegex = /^\d{13,19}$/;
    if (!cardNumber) {
      errorObj.cardNumber = "Card number is required.";
    } else if (!cardNumberRegex.test(cardNumber.replace(/\s+/g, ""))) {
      errorObj.cardNumber = "Invalid card number.";
    }

    const expDateRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!cardExpiration) {
      errorObj.cardExpiration = "Card expiration date is required.";
    } else if (!expDateRegex.test(cardExpiration)) {
      errorObj.cardExpiration = "Invalid expiration date.";
    } else {
      const [month, year] = cardExpiration.split("/");
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;
      if (
        Number(year) < currentYear ||
        (Number(year) === currentYear && Number(month) < currentMonth)
      ) {
        errorObj.cardExpiration = "Expiration date cannot be in the past.";
      }
    }

    const cvvRegex = /^[0-9]{3,4}$/;
    if (!cardCvv) {
      errorObj.cardCvv = "CVV is required.";
    } else if (!cvvRegex.test(cardCvv)) {
      errorObj.cardCvv = "Invalid CVV.";
    }

    if (!billingAddress)
      errorObj.billingAddress = "Billing address is required.";
    return errorObj;
  };

  // Handler to complete the transaction
  const handleCompleteTransaction = async (e) => {
    e.preventDefault();
    // Validate the form fields
    const formErrors = validateForm();
    if (Object.values(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    // Update inventory and clear the cart on successful transaction
    dispatch(updateInventory())
      .then(() => {
        dispatch(clearCart());
        navigate("/successful-transaction");
      })
      .catch(async (res) => {
        const errs = await res.json();
        setErrors(errs.errors);
      });
  };

  // Show loading indicator if cart items or products are not loaded
  if (!user) return <Navigate to="/" replace={true} />;

  if (!cartObj || !allProducts) return <Loading />;

  // Function to calculate the total price of all items in the cart
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

  // Function to format the expiration date input
  const expDateFormatter = (expdate) =>
    expdate.replace(/\//g, "").substring(0, 2) +
    (expdate.length > 2 ? "/" : "") +
    expdate.replace(/\//g, "").substring(2, 4);

  return (
    <main>
      <div className="cart-container">
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
                    <p className="cart-item-price">
                      ${product.price.toFixed(2)}
                    </p>
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
          <h3 id="cart-total">Total: ${cartTotal(cartArr)}</h3>
        </div>
        {/* Payment Form */}
        <div className="payment-container">
          <div className="payment-form">
            <div className="form-group">
              <label htmlFor="cardName">Name on Card</label>
              <input
                type="text"
                id="cardName"
                placeholder="Enter name on card"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              />
              {errors.cardName && <p className="error">{errors.cardName}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="cardNumber">Card Number</label>
              <input
                type="tel"
                inputMode="numeric"
                pattern="[0-9\s]{13,19}"
                autoComplete="cc-number"
                maxLength="19"
                placeholder="xxxx xxxx xxxx xxxx"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
              {errors.cardNumber && (
                <p className="error">{errors.cardNumber}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="cardExpiration">Expiration Date</label>
              <input
                type="text"
                id="cardExpiration"
                placeholder="MM/YY"
                value={cardExpiration}
                onChange={(e) => setCardExpiration(e.target.value)}
                onBlur={(e) => {
                  const formated = expDateFormatter(e.target.value);
                  setCardExpiration(formated);
                }}
              />
              {errors.cardExpiration && (
                <p className="error">{errors.cardExpiration}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="cardCvv">CVV</label>
              <input
                type="number"
                id="cardCvv"
                placeholder="xxx"
                maxLength="4"
                value={cardCvv}
                onChange={(e) => setCardCvv(e.target.value)}
              />
              {errors.cardCvv && <p className="error">{errors.cardCvv}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="billingAddress">Billing Address</label>
              <input
                type="text"
                id="billingAddress"
                value={billingAddress}
                onChange={(e) => setBillingAddress(e.target.value)}
              />
              {errors.billingAddress && (
                <p className="error">{errors.billingAddress}</p>
              )}
            </div>

            <div>
              <p>
                This is a learning purpose project, please do not fill out your
                real credit card info.
              </p>
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
          </div>
        </div>
      </div>
    </main>
  );
}

export default Checkout;
