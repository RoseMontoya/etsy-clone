import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import "./Navigation.css";

function Navigation() {
  return (
    <nav>

      <ul>
        <li>
          <NavLink to="/"><h1 className="orange">Esty</h1></NavLink>
        </li>

        <li className="inline" style={{gap: '1em'}}>
          <ProfileButton />
          <span className="icon">
            <PiShoppingCartSimpleBold />
          </span>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
