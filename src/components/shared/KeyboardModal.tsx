import { useState, useEffect } from "react";

import BadgeList from "@/components/shared/BadgeList";
import { MONEY } from "@/constants/money";

import classNames from "classnames/bind";
import styles from "./KeyboardModal.module.scss";
const cx = classNames.bind(styles);

interface KeyboardModalProps {
  onKeyPress: (key: string) => void;
  handleBadgeClick?: (label: string) => void;
  className?: string;
  isBadge?: boolean;
}

const KeyboardModal = ({ onKeyPress, handleBadgeClick, className, isBadge = false }: KeyboardModalProps) => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "00", "0", "⌫"];

  useEffect(() => {
    const calculateKeyboardHeight = () => {
      const height = (window.innerHeight * 0.4 - 207) / 7;
      setKeyboardHeight(height);
    };

    calculateKeyboardHeight();

    // 창 크기가 변경될 때마다 높이 재계산
    window.addEventListener("resize", calculateKeyboardHeight);

    return () => {
      window.removeEventListener("resize", calculateKeyboardHeight);
    };
  }, []);

  return (
    <div className={cx(["keyboard-modal", className])} onMouseDown={(e) => e.preventDefault()}>
      {isBadge && <BadgeList className={cx("badge-list")} list={MONEY} onClick={handleBadgeClick} />}
      <div className={cx("keyboard-content")}>
        {keys.map((key) => (
          <button
            key={key}
            className={cx("key-button")}
            style={{ padding: `${keyboardHeight}px 38px` }}
            onClick={() => onKeyPress(key)}
            type="button">
            {key}
          </button>
        ))}
      </div>
    </div>
  );
};

export default KeyboardModal;
