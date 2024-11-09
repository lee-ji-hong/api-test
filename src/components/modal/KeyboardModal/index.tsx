import BadgeList from "@/components/shared/BadgeList";
import { useState, useEffect } from "react";

import Image from "@/components/shared/Image";
import { IMAGES } from "@/constants/images";
import { MONEY } from "@/constants/money";

import classNames from "classnames/bind";
import styles from "./KeyboardModal.module.scss";
const cx = classNames.bind(styles);

interface KeyboardModalProps {
  onKeyPress: (key: string) => void;
  handleBadgeClick?: (label: string) => void;
  keyboardHeight: number;
  className?: string;
  isBadge?: boolean;
}

const KeyboardModal = ({
  onKeyPress,
  handleBadgeClick,
  className,
  isBadge = false,
  keyboardHeight,
}: KeyboardModalProps) => {
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "00", "0", "⌫"];
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={cx(["keyboard-modal", className, { show: isVisible }])} onMouseDown={(e) => e.preventDefault()}>
      {isBadge && <BadgeList className={cx("badge-list")} list={MONEY} onClick={handleBadgeClick} />}
      <div className={cx("keyboard-content")}>
        {keys.map((key) => (
          <button
            key={key}
            className={cx("key-button")}
            style={{ padding: `${keyboardHeight}px 38px` }}
            onClick={() => onKeyPress(key)}
            type="button">
            {key === "⌫" ? <Image className={cx("back")} imageInfo={IMAGES?.Back_space} /> : key}
          </button>
        ))}
      </div>
    </div>
  );
};

export default KeyboardModal;
