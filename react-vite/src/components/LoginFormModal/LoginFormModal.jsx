import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import SignupFormModal from "../SignupFormModal/SignupFormModal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <>
      <div className="form-modal">
        <span className="inline" style={{ width: "100%" }}>
          <h2>Sign In</h2>
          <button>
            <OpenModalMenuItem
              itemText="Register"
              // onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </button>
        </span>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {errors.email && <p>{errors.email}</p>}
          <div></div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errors.password && <p>{errors.password}</p>}
          <div></div>
          <button type="submit"className="black-button">Log In</button>
        </form>
      </div>
    </>
  );
}

export default LoginFormModal;
