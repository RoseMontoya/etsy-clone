import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
// import { FaUserCircle } from "react-icons/fa";
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
// import SignupFormModal from "../SignupFormModal";
import { productByUserId } from "../../redux/product";
import "./ProfileButton.css";

function ProfileButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  // console.log(user);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  useEffect(() => {
    if (user) {
      dispatch(productByUserId());
    }
  }, [dispatch, user]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
    navigate("/");
  };

  return (
    <>
      <button onClick={toggleMenu} className="hiddenButton grey-hover">
        {user ? (
          <img
            src={user.profile_url}
            alt="Profile_URL"
            className="profileIcon"
          />
        ) : (
          <OpenModalMenuItem
            itemText="Sign in"
            onItemClick={closeMenu}
            modalComponent={<LoginFormModal />}
          />
        )}
      </button>
      {showMenu && (
        <ul className={"profile-dropdown"} ref={ulRef}>
          {user ? (
            <div >
              <li>{user.username}</li>
              <li>{user.email}</li>
              <li>
                <Link to="/products/current">Manage Products</Link>
              </li>
              <li>
                <Link to="/favorites">Your Favorites</Link>
              </li>
              <li>
                <button onClick={logout}>Log Out</button>
              </li>
            </div>
          ) : (
            <>
              {/* <OpenModalMenuItem
                itemText="Sign in"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              /> */}
              {/* <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />} */}
              {/* /> */}
            </>
          )}
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
