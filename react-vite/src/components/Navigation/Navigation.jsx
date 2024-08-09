import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
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
      <ProfileButton />
    </div>
  );
}

export default Navigation;
