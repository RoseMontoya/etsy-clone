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

  // Select cart from the Redux store
  const cartObj = useSelector((state) => state.cart?.cartItems);
  const cartArr = cartObj ? Object.values(cartObj) : [];

  const categories = [
    { type: "Home & Living", categoryId: 1 },
    { type: "Accessories", categoryId: 2 },
    { type: "Crafting", categoryId: 3 },
    { type: "Jewelry", categoryId: 4 },
    { type: "Clothing", categoryId: 5 },
  ];

  return (
    <nav>
      <div className="nav_container">
        <NavLink to="/">
          <img src="/images/logo.png" alt="ArtisanAlley" className="nav_icon" />
        </NavLink>
        <div className="grey-hover">
          <Link to="/products">All Products</Link>
        </div>
        {categories.map((category, index) => (
          <div key={index} className="grey-hover">
            <Link to={`/products/categories/${category.categoryId}`}>
              {category.type}
            </Link>
          </div>
        ))}
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
