import "./CompleteTransaction.css";
import { Link, Navigate } from "react-router-dom";
import "./CompleteTransaction.css";
import { useSelector } from "react-redux";

function CompleteTransaction() {
  const user = useSelector((state) => state.session.user);
  if (!user) return <Navigate to="/" replace={true} />;

  const now = new Date();

  // Get the current year, month, day, hour, minute, second, and millisecond
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(now.getDate()).padStart(2, "0");
  const hour = String(now.getHours()).padStart(2, "0");
  const minute = String(now.getMinutes()).padStart(2, "0");
  const second = String(now.getSeconds()).padStart(2, "0");
  const millisecond = String(now.getMilliseconds()).padStart(3, "0");

  // You can add a random element to ensure uniqueness
  const randomPart = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");

  // Combine them to create an order number
  const orderNumber = `${year}${month}${day}${hour}${minute}${second}${millisecond}${randomPart}`;

  return (
    <main>
      <div className="transaction-complete">
        <div>Success! Here is your order number: {orderNumber}</div>
        <Link to="/">
          <button>Return to Homepage</button>
        </Link>
      </div>
    </main>
  );
}

export default CompleteTransaction;
