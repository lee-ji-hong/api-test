import React from "react";
import Spacing from "@/components/shared/Spacing";
import Button from "@/components/shared/Button";
import Text from "@/components/shared/Text";
import styles from "./Modal.module.scss"; // SCSS 파일 import

interface CenterModalProps {
  message: string;
  subMessage: string;
  confirmLabel: string;
  cancelLabel: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export const AlertModal: React.FC<CenterModalProps> = (props) => {
  return (
    <div className={styles["modal-overlay"]}>
      <div className={styles["modal-content"]}>
        <Text className={styles["txt-title"]} text={props.message} />
        {props.subMessage && (
          <>
            <Spacing size={8} />
            <Text className={styles["txt-sub"]} text={props.subMessage} />
          </>
        )}
        <Spacing size={32} />
        <div className={styles["button-wrap-divide"]}>
          <Button
            className={styles["button"]}
            title={props.cancelLabel}
            theme="light"
            onClick={(event) => {
              console.log(event);
              event.stopPropagation(); // 클릭 이벤트 전파 중지
              props.onCancel();
            }}
          />
          <Button className={styles["button"]} title={props.confirmLabel} onClick={props.onConfirm} />
        </div>
      </div>
    </div>
  );
};
