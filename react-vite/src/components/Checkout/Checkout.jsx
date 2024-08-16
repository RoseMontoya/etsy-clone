import "./Checkout.css";
import { useNavigate, Link } from "react-router-dom";
import { clearCart, getAllCartItems } from "../../redux/cart";
import { useDispatch, useSelector } from "react-redux";
import { updateInventory } from "../../redux/product";
import { useEffect } from "react";
import { thunkAllProducts } from "../../redux/product";
function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartObj = useSelector((state) => state.cart?.cartItems);
  const allProducts = useSelector((state) => state.products?.allProducts);
  const cartArr = cartObj ? Object.values(cartObj) : [];

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
