import { NavLink, Link } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import "./Navigation.css";

function Navigation() {
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
              <Link to='/cart'>
                <PiShoppingCartSimpleBold />
              </Link>
            </span>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
