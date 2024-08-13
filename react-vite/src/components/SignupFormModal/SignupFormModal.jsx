import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [first_name, setFirst_Name] = useState("");
  const [last_name, setLast_Name] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
        first_name,
        last_name,
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
          <h2>Sign Up</h2>
          <p> </p>
        </span>
        {errors.server && <p>{errors.server}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Email
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          </div>
          <div></div>
          {errors.email && <p>{errors.email}</p>}
          <div>
            <label>
              Username
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
          </div>
          <div></div>
          {errors.username && <p>{errors.username}</p>}
          <div>
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </div>
          {errors.password && <p>{errors.password}</p>}
          <div></div>
          <div>
            <label>
              Confirm Password
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>
            <label>
              First Name
              <input
                type="text"
                value={first_name}
                onChange={(e) => setFirst_Name(e.target.value)}
                required
              />
            </label>
            <label>
              First Name
              <input
                type="text"
                value={last_name}
                onChange={(e) => setLast_Name(e.target.value)}
                required
              />
            </label>
          </div>
          {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
          <div></div>
          <button type="submit" className="cursor">
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
}

export default SignupFormModal;
