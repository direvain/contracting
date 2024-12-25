import React from "react";
import styles from "./ConfirmationModal.module.css";

function ConfirmationModal({ message, onConfirm, onCancel }) {
    return (
        <div className={styles.modalBackdrop}>
            <div className={styles.modal}>
                <p>{message}</p>
                <div className={styles.modalButtons}>
                    <button onClick={onConfirm} className={styles.confirmButton}>
                        Confirm
                    </button>
                    <button onClick={onCancel} className={styles.cancelButton}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationModal;
