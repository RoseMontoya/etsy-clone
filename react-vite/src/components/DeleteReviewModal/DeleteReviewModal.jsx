import { IoMdClose } from "react-icons/io";
import { useModal } from "../../context/Modal";

function DeleteReview({ onDelete, onClose }) {
  const { closeModal } = useModal();

  return (
    <>
      <div className="modal-content confirm_deletion">
        <button
          className="close-modal-button"
          style={{ top: "-1em", right: "-4em" }}
          onClick={() => closeModal()}
        >
          <IoMdClose />
        </button>
        <h2>Confirm delete:</h2>
        <p>Are you sure you want to delete this review?</p>
        <div>
          <button className="delete-yes" onClick={() => onDelete()}>
            Delete Review
          </button>
          <button className="delete-no" onClick={() => onClose()}>
            Keep Review
          </button>
        </div>
      </div>
    </>
  );
}

export default DeleteReview;
