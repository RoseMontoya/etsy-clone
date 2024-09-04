import { useState } from "react";
import { useModal } from "../../../context/Modal";
import { IoMdClose } from "react-icons/io";
import "./OwnProductConflictModal.css";

const OwnProductConflictModal = () => {
  const { closeModal } = useModal(); // Use context to handle modal closing
  const [isLoading] = useState(false); // Example for async handling

  const handleClose = () => {
    closeModal(); // Close modal using context
  };

  return (
    <div className="modal-backdrop">
      <div className="confirm_deletion">
        <button
          className="close-modal-button"
          style={{ top: "-1em", right: "-4em" }}
          onClick={() => closeModal()}
        >
          <IoMdClose />
        </button>
        <h2>Action Restricted</h2>
        <p>Unfortunately, you cannot add your own product.</p>
        <div className="modal-actions">
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="delete-yes"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OwnProductConflictModal;
