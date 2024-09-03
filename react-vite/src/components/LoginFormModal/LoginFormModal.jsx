import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import SignupFormModal from "../SignupFormModal/SignupFormModal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import { IoMdClose } from "react-icons/io";
import "./LoginForm.css";

function LoginFormModal({ text }) {
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

  //DemoUser Set up
  const handleDemoLogin = async () => {
    const demoUser = {
      email: "john.doe@example.com",
      password: "password1",
    };
    const serverResponse = await dispatch(thunkLogin(demoUser));

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
