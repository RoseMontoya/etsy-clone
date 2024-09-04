import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import { FaUserCircle } from "react-icons/fa";
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
// import SignupFormModal from "../SignupFormModal";
import { getAllCartItems } from "../../redux/cart";
import "./ProfileButton.css";

function ProfileButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State to manage the visibility of the profile menu
  const [showMenu, setShowMenu] = useState(false);

  // Get the current user from the Redux store
  const user = useSelector((store) => store.session.user);

  // Reference to the dropdown menu to detect clicks outside of it
  const ulRef = useRef();

  // Function to toggle the profile menu's visibility
  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    // Function to close the menu if clicking outside of it
    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    // Attach the event listener to detect clicks outside the menu
    document.addEventListener("click", closeMenu);

    // Cleanup function to remove the event listener
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  useEffect(() => {
    // Fetch cart items if the user is logged in
    if (user) {
      dispatch(getAllCartItems());
    }
  }, [user, dispatch]);
  // Function to close the menu
  const closeMenu = () => setShowMenu(false);

  // Handler for logging out the user
  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
    navigate("/");
  };

  return (
    <>
      <button onClick={toggleMenu} className="hiddenButton grey-hover profile-container">
        {user ? (
          <>
            <img
              src={user.profile_url}
              alt="Profile_URL"
              className="profileIcon"
            />
            {/* <div className="tooltip">Your account</div> */}
          </>
        ) : (
          <OpenModalMenuItem
            itemText="Sign in"
            onItemClick={closeMenu}
            modalComponent={<LoginFormModal />}
          />
        )}
      </button>
      {showMenu && (
        <ul className="profile-dropdown" ref={ulRef}>
          {user ? (
            <div className="profile-dropdown-div">
              <li className="unclikable">{user.username}</li>
              <li className="unclikable">{user.email}</li>
              <li className="hover-effect">
                <Link to="/products/current" onClick={closeMenu}>Manage Products</Link>
              </li>
              <li className="hover-effect">
                <Link to="/favorites" onClick={closeMenu}>Your Favorites</Link>
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
