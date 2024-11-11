import { forwardRef, InputHTMLAttributes, useState, useEffect } from "react";

import KeyboardModal from "@/components/modal/KeyboardModal";
import Spacing from "@/components/shared/Spacing";
import Button from "@/components/shared/Button";
import Input from "@/components/shared/Input";
import Text from "@/components/shared/Text";

import classNames from "classnames/bind";
import styles from "./InputModal.module.scss";
const cx = classNames.bind(styles);

interface InputModalProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  warningMessage: string;
  modalTitle?: string;
  buttonText?: string;
  error?: boolean;
  value: number;
  onClose: (isBackdropClick?: boolean) => void;
  onChange: (value: number) => void;
  handleKeyPress: (key: string) => void;
  handleBadgeClick: (label: string) => void;
}

export const InputModal = forwardRef<HTMLInputElement, InputModalProps>(
  (
    {
      warningMessage,
      modalTitle,
      buttonText,
      error,
      value,
      onClose,
      onChange,
      handleKeyPress,
      handleBadgeClick,
      ...props
    },
    ref,
  ) => {
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const [modalHeight, setModalHeight] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const calculateKeyboardHeight = () => {
        const height = (window.innerHeight * 0.4 - 207) / 7;
        setKeyboardHeight(height);
        if (window.innerHeight >= 767) {
          setModalHeight(window.innerHeight * 0.5);
        } else {
          setModalHeight(window.innerHeight * 0.4 + 42);
        }
      };
      calculateKeyboardHeight();
      window.addEventListener("resize", calculateKeyboardHeight);

      return () => {
        window.removeEventListener("resize", calculateKeyboardHeight);
      };
    }, []);

    useEffect(() => {
      setIsVisible(true);
    }, []);

    const handleClose = (isBackdropClick: boolean) => {
      setIsVisible(false);
      setTimeout(() => onClose(isBackdropClick), 400);
    };

    return (
      <>
        <div
          className={cx("back-drop")}
          onClick={() => (error ? alert("에러 메세지를 확인해주세요🫨") : handleClose(true))}>
          <div
            className={cx("container", { show: isVisible })}
            style={{ bottom: `${modalHeight}px` }}
            aria-label="alert-modal"
            onClick={(e) => e.stopPropagation()}>
            <div className={cx("bar")}></div>
            <Spacing size={35} />
            <Text className={cx("txt-title")} text={modalTitle} />
            <Spacing size={44} />
            <Input
              error={error}
              value={value}
              onChange={onChange}
              warningMessage={warningMessage}
              ref={ref}
              {...props}
            />
            <Spacing size={30} />
            <Button
              className={cx("close-button")}
              title={buttonText}
              onClick={() => handleClose(false)}
              disabled={error}
            />
          </div>
          <div onClick={(e) => e.stopPropagation()}>
            <KeyboardModal
              onKeyPress={handleKeyPress}
              isBadge={true}
              handleBadgeClick={handleBadgeClick}
              keyboardHeight={keyboardHeight}
            />
          </div>
        </div>
      </>
    );
  },
);

export default InputModal;
