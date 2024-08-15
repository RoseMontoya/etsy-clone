import { NavLink, Link } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import "./Navigation.css";
import {  useSelector } from "react-redux";

function Navigation() {
  const user = useSelector((state) => state.session.user);

  const cartObj = useSelector((state) => state.cart?.cartItems);
  const cartArr = cartObj ? Object.values(cartObj) : [];

  // Total quantity of items in the cart (optional)
  // const cartItemCount = cartArr.reduce((total, item) => total + item.quantity, 0);


  return (
    <nav>
      <div className="nav_container">
        <NavLink to="/">
          <img src="./images/etsy.png" alt="ETSYICON" className="nav_icon" />
        </NavLink>
        <div className="inline grey-hover" style={{ gap: "1em" }}>
          <Link to="/products">All Product</Link>
        </div>
        <div className="inline grey-hover" style={{ gap: "1em" }}>
          <Link to="/products/homeliving">Home & Living</Link>
        </div>
        <div className="inline grey-hover" style={{ gap: "1em" }}>
          <Link to="/products/accessories">Accessories</Link>
        </div>
        <div className="inline grey-hover" style={{ gap: "1em" }}>
          <Link to="/products/crafting">Crafting</Link>
        </div>
        <div className="inline grey-hover" style={{ gap: "1em" }}>
          <Link to="/products/jewelry">Jewelry</Link>
        </div>
        <div className="inline grey-hover" style={{ gap: "1em" }}>
          <Link to="/products/clothing">Clothing</Link>
        </div>
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
