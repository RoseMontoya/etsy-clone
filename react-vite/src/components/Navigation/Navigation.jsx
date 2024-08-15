import { useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import "./Navigation.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllCartItems } from "../../redux/cart";
function Navigation() {
  const dispatch = useDispatch();
  const handleCartClick = () => {
    dispatch(getAllCartItems());
  };
  const user = useSelector((state) => state.session.user);
  useEffect(() => {
    if (!user) {
      dispatch(getAllCartItems());
    }
  }, [dispatch, user]);
  return (
    <nav>
      <div className="nav_container">
        <NavLink to="/">
          <img src="./images/etsy.png" alt="ETSYICON" className="nav_icon" />
        </NavLink>
        <div className="search_container">
          <input
            type="text"
            placeholder="Search for anything"
            className="search_bar"
          />
          <button className="search_button"></button>
        </div>
        <ul>
          <li className="inline" style={{ gap: "1em" }}>
            <ProfileButton />
            <span className="icon">
              <div>
                {user? 
                <Link to="/cart" onClick={handleCartClick}>
                  <PiShoppingCartSimpleBold />
                </Link> : null
                }
              </div>
            </span>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
