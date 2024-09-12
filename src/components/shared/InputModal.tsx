import { forwardRef, InputHTMLAttributes } from "react";

import Button from "@/components/shared/Button";
import Text from "@/components/shared/Text";

import classNames from "classnames/bind";
import styles from "./InputModal.module.scss";
const cx = classNames.bind(styles);

interface InputModalProps extends InputHTMLAttributes<HTMLInputElement> {
  modalTitle: string;
  buttonText?: string;
  onClose: () => void;
}

export const InputModal = forwardRef<HTMLInputElement, InputModalProps>(
  ({ modalTitle, buttonText, onClose, ...props }, ref) => {
    return (
      <div className={cx("back-drop")}>
        <div className={cx("container")} aria-label="alert-modal">
          <Text className={cx("txt-title")} text={modalTitle} />
          <input className={cx("input")} ref={ref} maxLength={30} {...props} />
          <Button className={cx("close-button")} title={buttonText} onClick={onClose} />
        </div>
      </div>
    );
  },
);

export default InputModal;
