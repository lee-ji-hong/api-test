import React, { useState, useEffect, forwardRef, InputHTMLAttributes } from "react";

import { GlobalPortal } from "@/components/shared/GlobalPortal";
import Spacing from "@/components/shared/Spacing";
import Text from "@/components/shared/Text";

import classNames from "classnames/bind";
import styles from "./SelectBottomSheet.module.scss";
const cx = classNames.bind(styles);

interface SelectBottomSheetProps extends InputHTMLAttributes<HTMLInputElement> {
  modalTitle?: string;
  modalSubTitle?: string;
  onClose: (isBackdropClick?: boolean) => void;
  children: React.ReactNode;
  titleAlign?: "flex-start" | "flex-end" | "center";
}

export const SelectBottomSheet = forwardRef<HTMLUListElement, SelectBottomSheetProps>(
  ({ modalTitle, modalSubTitle, children, onClose, titleAlign = "flex-start" }, ref) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      setIsVisible(true);
      document.body.style.overflow = "hidden"; // 부모 스크롤 막기

      return () => {
        document.body.style.overflow = "auto"; // 컴포넌트 언마운트 시 스크롤 다시 활성화
      };
    }, []);

    const handleClose = (isBackdropClick?: boolean) => {
      setIsVisible(false);
      setTimeout(() => onClose(isBackdropClick), 400);
    };
    return (
      <GlobalPortal.Consumer>
        <div className={cx("back-drop")} onClick={() => handleClose(true)}>
          <div
            className={cx("container", { show: isVisible })}
            aria-label="alert-modal"
            onClick={(e) => e.stopPropagation()}>
            <div className={cx("bar")}></div>
            <Spacing size={35} />
            <Text className={cx("txt-title")} style={{ alignItems: titleAlign }} text={modalTitle} />
            {modalSubTitle && (
              <>
                <Spacing size={8} />
                <Text className={cx("txt-sub-title")} text={modalSubTitle} />
              </>
            )}
            <Spacing size={30} />
            <ul className={cx("options")} ref={ref}>
              {children}
            </ul>
            <Spacing size={10} />
          </div>
        </div>
      </GlobalPortal.Consumer>
    );
  },
);

export default SelectBottomSheet;
