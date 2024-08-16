// import {useModal} from '../../context/Modal';

function DeleteReview({ onDelete, onClose}) {

    return (
        <>
         <div className="modal-content confirm_deletion">
            <h2>Confirm delete:</h2>
            <p>Are you sure you want to delete this review?</p>
            <div>
                <button className='delete-yes' onClick={() => onDelete()}>Delete Review</button>
                <button className='delete-no' onClick={() => onClose()}>Keep Review</button>
            </div>
         </div>
        </>
    )
}

export default DeleteReview
