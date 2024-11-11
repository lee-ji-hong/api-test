import React, { forwardRef, useState, useEffect, InputHTMLAttributes } from "react";
import { GlobalPortal } from "@/components/shared/GlobalPortal";
import Button from "@/components/shared/Button";
import Text from "@/components/shared/Text";

import classNames from "classnames/bind";
import styles from "./BottomSheet.module.scss";
const cx = classNames.bind(styles);

interface BottomSheetProps extends InputHTMLAttributes<HTMLInputElement> {
  modalTitle?: string;
  buttonText: string;
  children: React.ReactNode;
  onClose: (isBackdropClick?: boolean) => void;
}

export const BottomSheet = forwardRef<HTMLInputElement, BottomSheetProps>(
  ({ modalTitle, buttonText, onClose, children }, ref) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      setIsVisible(true);
    }, []);

    const handleClose = (isBackdropClick: boolean) => {
      setIsVisible(false);
      setTimeout(() => onClose(isBackdropClick), 400);
    };

    return (
      <GlobalPortal.Consumer>
        <div ref={ref} className={cx("back-drop")} onClick={() => handleClose(true)}>
          <div
            className={cx("container", { show: isVisible })}
            aria-label="alert-modal"
            onClick={(e) => e.stopPropagation()}>
            <div className={cx("bar")}></div>
            {modalTitle && <Text className={cx("txt-title")} text={modalTitle} />}

            {children}
            <Button className={cx("close-button")} title={buttonText} onClick={() => handleClose(false)} />
          </div>
        </div>
      </GlobalPortal.Consumer>
    );
  },
);

export default BottomSheet;
