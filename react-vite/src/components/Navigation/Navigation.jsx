import { useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import "./Navigation.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllCartItems } from "../../redux/cart";

function Navigation() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const cartObj = useSelector((state) => state.cart?.cartItems);
  const cartArr = cartObj ? Object.values(cartObj) : [];

  // Total quantity of items in the cart (optional)
  // const cartItemCount = cartArr.reduce((total, item) => total + item.quantity, 0);

  // Fetch cart items when the user logs in
  useEffect(() => {
    if (user) {
      dispatch(getAllCartItems());
    }
  }, [dispatch, user]);

  return (
    <nav>
      <div className="nav_container">
        <NavLink to="/">
          <img src="./images/etsy.png" alt="ETSYICON" className="nav_icon" />
        </NavLink>

        <ul>
          <li className="inline" style={{ gap: "1em" }}>
            <ProfileButton />
            <span className="icon-shopping">
              {user && (
                <Link to="/cart">
                  <PiShoppingCartSimpleBold />
                  {cartArr.length > 0 && (
                    <span className="cart-count-badge">{cartArr.length}</span>
                  )}
                </Link>
              )}
            </span>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
