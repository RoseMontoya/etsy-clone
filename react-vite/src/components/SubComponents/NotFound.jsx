import { useNavigate } from "react-router-dom";
import "./NotFound.css"

function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="not-found-container">
      <img
        src="/images/not-found.jpg"
        alt="404 Not Found"
        className="not-found-image"
      />
      <div>
        <button className="black-button" onClick={() => navigate("/products")}>Return Home</button>
      </div>
    </div>
  );
}

export default NotFoundPage;
