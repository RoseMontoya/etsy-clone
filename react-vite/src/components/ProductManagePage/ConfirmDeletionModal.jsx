const ConfirmDeleteModal = ({ onDelete, onClose }) => (
    <div className="confirm_deletion">
      <h2>You are about to delete 1 listing</h2>
      <p>Keep in mind that deleted listings can&apos;t be retrieved. If you&apos;d like to keep a listing from being viewed publicly without deleting it permanently, please deactivate the listing instead. This will allow you to edit or reactivate it at any time.</p>
      <button id="red_button" onClick={onDelete}>Yes, delete product</button>
      <button className="dark_grey_button" onClick={onClose}>No, deactivate product</button>
    </div>
);
  
export default ConfirmDeleteModal;