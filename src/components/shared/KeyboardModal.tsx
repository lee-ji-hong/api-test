import BadgeList from "@/components/shared/BadgeList";
import { MONEY } from "@/constants/money";

import classNames from "classnames/bind";
import styles from "./KeyboardModal.module.scss";
const cx = classNames.bind(styles);

interface KeyboardModalProps {
  onKeyPress: (key: string) => void;
  handleBadgeClick?: (label: string) => void;
  isBadge?: boolean;
}

const KeyboardModal = ({ onKeyPress, handleBadgeClick, isBadge = false }: KeyboardModalProps) => {
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "00", "0", "⌫"];

  return (
    <div className={cx("keyboard-modal")} onMouseDown={(e) => e.preventDefault()}>
      {isBadge && <BadgeList className={cx("badge-list")} list={MONEY} onClick={handleBadgeClick} />}
      <div className={cx("keyboard-content")}>
        {keys.map((key) => (
          <button key={key} className={cx("key-button")} onClick={() => onKeyPress(key)} type="button">
            {key}
          </button>
        ))}
      </div>
    </div>
  );
};

export default KeyboardModal;
