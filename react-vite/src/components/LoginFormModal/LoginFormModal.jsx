// React Imports
import { useState } from "react";
import { useDispatch } from "react-redux";

// Component/Redux Imports
import { thunkLogin } from "../../redux/session";
import { useModal } from "../../context/Modal";
import { SignupFormModal, OpenModalMenuItem } from '../'

// Design Imports
import { IoMdClose } from "react-icons/io";
import "./LoginForm.css";

function LoginFormModal({ text }) {
  const dispatch = useDispatch();

  // State for storing user input and form errors
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  // Close modal function from context
  const { closeModal } = useModal();

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Dispatch login thunk action
    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    // Handle errors if the response contains errors
    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  // Handler for demo user login
  const handleDemoLogin = async () => {
    const demoUser = {
      email: "john.doe@example.com",
      password: "password1",
    };

    // Dispatch login action with demo user credentials
    const serverResponse = await dispatch(thunkLogin(demoUser));

    // Handle errors if the response contains errors
    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <>
      <div className="form-modal">
        {text && <p id="log-in-required">{text}</p>}
        <span className="inline" style={{ width: "100%" }}>
          <h2>Sign In</h2>
          <button className="cursor">
            <OpenModalMenuItem
              itemText="Register"
              modalComponent={<SignupFormModal />}
            />
          </button>
        </span>
        <button className="close-modal-button" onClick={() => closeModal()}>
          <IoMdClose />
        </button>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={errors.email ? "error" : ""}
            />
          </div>
          {errors.email && <p className="error">{errors.email}</p>}
          <div></div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={errors.password ? "error" : ""}
            />
          </div>
          {errors.password && <p className="error">{errors.password}</p>}
          <div></div>
          <button type="submit" className="black-button cursor">
            Sign In
          </button>
        </form>
        <div className="demo-login" style={{ width: "100%" }}>
          <p>Or use the demo account:</p>
          <button
            type="button" // Changed to type="button" to avoid form submission
            className="black-button demo-button cursor"
            onClick={handleDemoLogin}
          >
            Demo User Login
          </button>
        </div>
      </div>
    </>
  );
}

export default LoginFormModal;
