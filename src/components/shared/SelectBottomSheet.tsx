import React, { forwardRef, InputHTMLAttributes } from "react";

import Spacing from "@/components/shared/Spacing";
import Text from "@/components/shared/Text";
import { MaritalStatus } from "@/models";

import classNames from "classnames/bind";
import styles from "./SelectBottomSheet.module.scss";
const cx = classNames.bind(styles);

interface SelectBottomSheetProps extends InputHTMLAttributes<HTMLInputElement> {
  modalTitle?: string;
  modalSubTitle?: string;
  onClose: () => void;
  children: React.ReactNode;
  onChange: (status: MaritalStatus) => void;
}

export const SelectBottomSheet = forwardRef<HTMLInputElement, SelectBottomSheetProps>(
  ({ modalTitle, modalSubTitle, children }, ref) => {
    return (
      <div className={cx("back-drop")}>
        <div className={cx("container")} aria-label="alert-modal">
          <Spacing size={30} />
          <Text className={cx("txt-title")} text={modalTitle} />
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
          <Spacing size={20} />
        </div>
      </div>
    );
  },
);

export default SelectBottomSheet;
