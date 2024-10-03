import { forwardRef, InputHTMLAttributes } from "react";

import KeyboardModal from "@/components/shared/KeyboardModal";
import Spacing from "@/components/shared/Spacing";
import Button from "@/components/shared/Button";
import Text from "@/components/shared/Text";

import { formatNumber, formatNumberWithUnits } from "@/utils/formatters";

import classNames from "classnames/bind";
import styles from "./InputModal.module.scss";
const cx = classNames.bind(styles);

interface InputModalProps extends InputHTMLAttributes<HTMLInputElement> {
  warningMessage: string;
  modalTitle?: string;
  buttonText?: string;
  error?: boolean;
  value: number;
  onClose: () => void;
  handleKeyPress: (key: string) => void;
}

export const InputModal = forwardRef<HTMLInputElement, InputModalProps>(
  ({ warningMessage, modalTitle, buttonText, error, value, onClose, handleKeyPress, ...props }, ref) => {
    return (
      <>
        <div className={cx("back-drop")}>
          <div className={cx("container")} aria-label="alert-modal">
            <Spacing size={30} />
            <Text className={cx("txt-title")} text={modalTitle} />
            <Spacing size={30} />
            <input
              className={cx("input", { shake: error })}
              ref={ref}
              maxLength={30}
              value={formatNumber(value)}
              {...props}
              readOnly={true}
            />
            <Text
              className={cx("txt-sub", { "text-alert": error })}
              text={value === 0 ? "" : error ? warningMessage : formatNumberWithUnits(value)}
            />
            <Spacing size={30} />
            <Button className={cx("close-button")} title={buttonText} onClick={onClose} disabled={!value || error} />
          </div>
          <KeyboardModal onKeyPress={handleKeyPress} />
        </div>
      </>
    );
  },
);

export default InputModal;
