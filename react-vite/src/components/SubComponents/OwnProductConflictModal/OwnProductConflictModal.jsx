import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import "./OwnProductConflictModal.css"; // Assuming you have modal CSS

const OwnProductConflictModal = () => {
  const { closeModal } = useModal(); // Use context to handle modal closing
  const [isLoading, setIsLoading] = useState(false); // Example for async handling
  const navigate = useNavigate();

  const handleClose = () => {
    console.log("Close button clicked");
    closeModal(); // Close modal using context
  };

  const handleRedirect = () => {
    console.log("Redirect button clicked");
    setIsLoading(true);
    // Simulate an async operation, like an API call, before navigating
    setTimeout(() => {
      setIsLoading(false);
      navigate("/products"); // Redirect to products page
      closeModal(); // Close the modal after redirecting
    }, 500); // Simulate a short delay
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Conflict: Cannot Add Your Own Product</h2>
        <p>
          It looks like you&apos;re trying to add a product you own to your
          cart. Unfortunately, you cannot add your own products to your cart.
        </p>
        <div className="modal-actions">
          <button onClick={handleClose} disabled={isLoading}>
            {isLoading ? "Processing..." : "Close"}
          </button>
          <button onClick={handleRedirect} disabled={isLoading}>
            {isLoading ? "Redirecting..." : "Go to Products"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OwnProductConflictModal;
