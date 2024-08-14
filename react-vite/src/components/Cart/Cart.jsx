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
  // console.log("FRONT END ========>", cartObj)

  useEffect(() => {
    if (!cartObj) {
      dispatch(getAllCartItems());
    }
  }, [dispatch]);

  // const cartLength = Object.values()

  return (
    <>
      <div>Cart Page</div>

      <div>
        <span>
          {cartArr.length > 0 ? (
            <div>
              {cartArr.length === 1
                ? `${cartArr.length} item in your cart`
                : `${cartArr.length} items in your cart`}
            </div>
          ) : (
            <div>
              <p>Your cart is empty</p>
              <Link to="/products">
                Discover something unique to fill it up
              </Link>
            </div>
          )}
        </span>
      </div>

      {/* <div>
                {cartArr && cartArr?.length === 0 ? (
                    <>
                        <p>Your cart is empty</p>
                        <Link to="/products">Discover something unique to fill it up</Link>
                    </>
                ) : cartArr && cartArr?.length === 1 ? (
                    `${cartArr?.length} item in your cart`
                ) : (
                    `${cartArr?.length} items in your cart`
                )}
            </div> */}
    </>
  );
}

export default Cart;
