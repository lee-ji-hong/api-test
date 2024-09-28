import React from "react";
import styles from "./Modal.module.scss"; // SCSS 파일 import

interface ModalProps {
  message: string;
  subMessage: string;
  confirmLabel: string;
  cancelLabel: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = (props) => {
  return (
    <div className={styles["modal-overlay"]}>
      <div className={styles["modal-content"]}>
        {/* 개행을 감지하여 <br /> 태그로 변환 */}
        <p className={styles["modal-message"]}>
          {props.message.split("\n").map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>
        <div className={styles["modal-buttons"]}>
          <button className={styles["cancel-button"]} onClick={props.onCancel}>
            {props.cancelLabel}
          </button>
          <button className={styles["confirm-button"]} onClick={props.onConfirm}>
            {props.confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
