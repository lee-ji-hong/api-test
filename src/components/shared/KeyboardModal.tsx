import React from "react";
import classNames from "classnames/bind";
import styles from "./KeyboardModal.module.scss";
const cx = classNames.bind(styles);

const KeyboardModal = ({ onKeyPress }) => {
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "00", "0", "⌫"];

  return (
    <div className={cx("keyboard-modal")}>
      <div className={cx("keyboard-content")}>
        {keys.map((key) => (
          <button key={key} className={cx("key-button")} onClick={() => onKeyPress(key)}>
            {key}
          </button>
        ))}
      </div>
    </div>
  );
};

export default KeyboardModal;
