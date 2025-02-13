import React from "react";
import "../../adminCss/admindeleteproduct.css";
const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <p>Are you sure you want to delete this Item?</p>
        <div className="delete_modal-buttons">
          <div onClick={onConfirm}>Yes</div>
          <div onClick={onClose}>No</div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
