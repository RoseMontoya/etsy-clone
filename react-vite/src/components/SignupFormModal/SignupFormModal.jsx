import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";
import { IoMdClose } from "react-icons/io";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [first_name, setFirst_Name] = useState("");
  const [last_name, setLast_Name] = useState("");
  const [errors, setErrors] = useState({});
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);
  const { closeModal } = useModal();

  useEffect(() => {
    // Check if all fields are filled out
    if (
      email &&
      username &&
      password &&
      confirmPassword &&
      first_name &&
      last_name
    ) {
      setAllFieldsFilled(true);
    } else {
      setAllFieldsFilled(false);
    }
  }, [email, username, password, confirmPassword, first_name, last_name]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    // Frontend validation
    if (username.length < 4) {
      newErrors.username = "Username must be at least 4 characters.";
    }

    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword =
        "Confirm Password field must be the same as the Password field.";
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (Object.keys(newErrors).length > 0) {
      return setErrors(newErrors);
    }

    // Backend validation
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
          <h2>Create your account</h2>
        </span>
        <button className="close-modal-button" onClick={() => closeModal()}>
          <IoMdClose />
        </button>
        <span className="inline" style={{ width: "100%" }}>
          <h3>Registration is easy.</h3>
        </span>
        {errors.server && <p>{errors.server}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              <div>
                <span>First Name</span> <span className="required">*</span>
              </div>
              <input
                type="text"
                value={first_name}
                onChange={(e) => setFirst_Name(e.target.value)}
                required
                className={errors.firstName ? "error" : ""}
              />
            </label>
            {errors.firstName && <p className="error">{errors.firstName}</p>}
            <label>
              <div>
                <span>Last Name</span> <span className="required">*</span>
              </div>
              <input
                type="text"
                value={last_name}
                onChange={(e) => setLast_Name(e.target.value)}
                required
                className={errors.lastName ? "error" : ""}
              />
            </label>
            {errors.lastName && <p className="error">{errors.lastName}</p>}
            <label>
              <div>
                <span>Email</span> <span className="required">*</span>
              </div>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={errors.email ? "error" : ""}
              />
            </label>
          </div>
          <div></div>
          {errors.email && <p className="error">{errors.email}</p>}
          <div>
            <label>
              <div>
                <span>Username</span> <span className="required">*</span>
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className={errors.username ? "error" : ""}
              />
            </label>
          </div>
          <div></div>
          {errors.username && <p className="error">{errors.username}</p>}
          <div>
            <label>
              <div>
                <span>Password</span> <span className="required">*</span>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={errors.password ? "error" : ""}
              />
            </label>
          </div>
          {errors.password && <p className="error">{errors.password}</p>}
          <div></div>
          <div>
            <label>
              <div>
                <span>Confirm Password</span>{" "}
                <span className="required">*</span>
              </div>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className={errors.password ? "error" : ""}
              />
            </label>
          </div>
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword}</p>
          )}
          <div></div>
          <button
            type="submit"
            className={`cursor ${
              allFieldsFilled ? "black-button" : "disabled-button"
            }`}
            disabled={!allFieldsFilled}
          >
            Register
          </button>
        </form>
      </div>
    </>
  );
}

export default SignupFormModal;
