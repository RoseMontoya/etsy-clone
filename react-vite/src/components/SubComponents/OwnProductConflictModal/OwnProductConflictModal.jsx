
import { useState } from "react";
import { useModal } from "../../../context/Modal";
import "./OwnProductConflictModal.css"; // Assuming you have modal CSS
import { IoMdClose } from "react-icons/io";

const OwnProductConflictModal = () => {
  const { closeModal } = useModal(); // Use context to handle modal closing
  const [isLoading] = useState(false); // Example for async handling
  // const navigate = useNavigate();

  const handleClose = () => {
    console.log("Close button clicked");
    closeModal(); // Close modal using context
  };

  // const handleRedirect = () => {
  //   console.log("Redirect to product page");
  //   setIsLoading(true);
  //   // Simulate an async operation, like an API call, before navigating
  //   setTimeout(() => {
  //     setIsLoading(false);
  //     navigate("/products"); // Redirect to products page
  //     closeModal(); // Close the modal after redirecting
  //   }, 500); // Simulate a short delay
  // };

  return (
    <div className="modal-backdrop">
      <div className="confirm_deletion">
      <button
        className="close-modal-button"
        style={{top: '-1em', right: '-4em'}}
        onClick={() => closeModal()}
        ><IoMdClose /></button>
        <h2>Action Restricted</h2>
        <p>
        Unfortunately, you cannot add your own product.
        </p>
        <div className="modal-actions">
          <button onClick={handleClose} disabled={isLoading} className="delete-yes">
            {/* {isLoading ? "Processing..." : "Close"} */}
            Close
          </button>
          {/* <button onClick={handleRedirect} disabled={isLoading} className="delete-no">
            {isLoading ? "Redirecting..." : "Go to Products"}
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default OwnProductConflictModal;
