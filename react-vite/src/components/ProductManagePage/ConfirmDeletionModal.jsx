import { IoMdClose } from "react-icons/io";

const ConfirmDeleteModal = ({ onDelete, onClose }) => (
  <div className="confirm_deletion">
    <button
      className="close-modal-button"
      style={{ top: "-1em", right: "-4em" }}
      onClick={onClose}
    >
      <IoMdClose />
    </button>
    <h2>You are about to delete 1 listing</h2>
    <p>
      Keep in mind that deleted listings can&apos;t be retrieved. If you&apos;d
      like to keep a listing from being viewed publicly without deleting it
      permanently, please deactivate the listing instead.
    </p>
    <button className="delete-yes" onClick={onDelete}>
      Yes, delete
    </button>
    <button className="delete-no" onClick={onClose}>
      No, deactivate
    </button>
  </div>
);

export default ConfirmDeleteModal;
