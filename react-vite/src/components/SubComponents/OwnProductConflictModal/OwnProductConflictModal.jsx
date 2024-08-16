import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const OwnProductConflictModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(true); // Start with the modal visible
  const navigate = useNavigate();

  const handleClose = () => {
    console.log("Close button clicked");
    setIsModalVisible(false); // Hide the modal
  };

  const handleRedirect = () => {
    console.log("Redirect button clicked");
    setIsModalVisible(false);
    navigate("/products"); // Redirect to the products page
  };

  return (
    <>
      {isModalVisible && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h2>Conflict: Cannot Add Your Own Product</h2>
            <p>
              It looks like you're trying to add a product you own to your cart.
              Unfortunately, you cannot add your own products to your cart.
            </p>
            <button onClick={handleClose}>Close</button>
            <button onClick={handleRedirect}>Go to Products</button>
          </div>
        </div>
      )}
    </>
  );
};

export default OwnProductConflictModal;
