import React, { forwardRef, InputHTMLAttributes } from "react";

import Spacing from "@/components/shared/Spacing";
import Button from "@/components/shared/Button";
import Text from "@/components/shared/Text";

import classNames from "classnames/bind";
import styles from "./BottomSheet.module.scss";
const cx = classNames.bind(styles);

interface BottomSheetProps extends InputHTMLAttributes<HTMLInputElement> {
  modalTitle: string;
  buttonText?: string;
  children: React.ReactNode;
  onClose: () => void;
}

export const BottomSheet = forwardRef<HTMLInputElement, BottomSheetProps>(
  ({ modalTitle, buttonText, onClose, children }) => {
    return (
      <div className={cx("back-drop")}>
        <div className={cx("container")} aria-label="alert-modal">
          <Spacing size={30} />
          <Text className={cx("txt-title")} text={modalTitle} />
          <Spacing size={30} />
          {children}
          <Spacing size={30} />
          <Button className={cx("close-button")} title={buttonText} onClick={onClose} />
        </div>
      </div>
    );
  },
);

export default BottomSheet;
