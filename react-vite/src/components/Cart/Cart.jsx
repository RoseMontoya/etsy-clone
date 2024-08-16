import "./Cart.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  getAllCartItems,
  deleteCartItem,
  clearCart,
  updateCartItemQuantity,
} from "../../redux/cart";
import { thunkAllProducts } from "../../redux/product";

function Cart() {
  const dispatch = useDispatch();
  // const [number, setNumber] = useState(1);
  const cartObj = useSelector((state) => state.cart?.cartItems);
  const allProducts = useSelector((state) => state.products?.allProducts);

  const cartArr = cartObj ? Object.values(cartObj) : [];


  useEffect(() => {
    if (!cartObj) {
      dispatch(getAllCartItems());
    }
    if (!allProducts) {
      dispatch(thunkAllProducts())
    }
  }, [dispatch, cartObj, allProducts]);

  const handleDelete = async (cartItemId, e) => {
    e.stopPropagation(); // Prevent click from propagating to the Link
    await dispatch(deleteCartItem(cartItemId));
    // dispatch(getAllCartItems());
  };

  const handleClearCart = async () => {
    await dispatch(clearCart());
  };

  const handleQuantityChange = async (cartItemId, newQuantity) => {
    try {
      await dispatch(updateCartItemQuantity(cartItemId, newQuantity));
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  if (!cartObj || !allProducts) return <h2>Loading...</h2>;

  if (cartArr.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <Link to="/products">Discover something unique to fill it up</Link>
      </div>
    );
  }

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
                    <select
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.id, Number(e.target.value))
                      }
                    >
                      {[...Array(product.inventory).keys()].map((num) => (
                        <option key={num + 1} value={num + 1}>
                          {num + 1}
                        </option>
                      ))}
                    </select>
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
                <div className="cart-item-actions">
                  <button
                    onClick={(e) => handleDelete(item.id, e)}
                    className="cart-item-remove"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <div>
        <button onClick={handleClearCart} className="clear-cart-button">
          Clear Cart
        </button>

        <span>Total: ${cartTotal(cartArr)}</span>
      </div>
      <div className="cart-footer">
        <Link to="/checkout">
          <button className="checkout-button">Proceed to Checkout</button>
        </Link>
        <Link to="/products" className="continue-shopping">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default Cart;
