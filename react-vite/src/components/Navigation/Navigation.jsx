// React Imports
import { useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
// Component Imports
import ProfileButton from "./ProfileButton";
// Design Imports
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import "./Navigation.css";

function Navigation() {
  const user = useSelector((state) => state.session.user);

  const cartObj = useSelector((state) => state.cart?.cartItems);
  const cartArr = cartObj ? Object.values(cartObj) : [];

  return (
    <nav>
      <div className="nav_container">
        <NavLink to="/">
          <img src="/images/logo.png" alt="ArtisanAlley" className="nav_icon" />
        </NavLink>
        <div className="grey-hover">
          <Link to="/products">All Products</Link>
        </div>
        <div className="grey-hover">
          <Link to="/products/homeliving">Home & Living</Link>
        </div>
        <div className="grey-hover">
          <Link to="/products/accessories">Accessories</Link>
        </div>
        <div className="grey-hover">
          <Link to="/products/crafting">Crafting</Link>
        </div>
        <div className="grey-hover">
          <Link to="/products/jewelry">Jewelry</Link>
        </div>
        <div className="grey-hover">
          <Link to="/products/clothing">Clothing</Link>
        </div>
        <ul>
          <li className="inline">
            <ProfileButton />
            {user && (
              <span className="icon-shopping">
                <Link to="/cart">
                  <PiShoppingCartSimpleBold />
                  {cartArr.length > 0 && (
                    <span className="cart-count-badge">{cartArr.length}</span>
                  )}
                </Link>
              </span>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
