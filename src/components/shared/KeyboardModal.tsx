import BadgeList from "@/components/shared/BadgeList";
import { MONEY } from "@/constants/money";

import classNames from "classnames/bind";
import styles from "./KeyboardModal.module.scss";
const cx = classNames.bind(styles);

interface KeyboardModalProps {
  onKeyPress: (key: string) => void; // onKeyPress의 타입을 정의
  isBadge?: boolean;
}

const KeyboardModal = ({ onKeyPress, isBadge = false }: KeyboardModalProps) => {
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "00", "0", "⌫"];

  const handleChangeValue = (label: string) => {
    const item = MONEY.find((item) => item.label === label)!;
    if (item) {
      onKeyPress(String(item.value)); // 선택된 아이템의 값을 `onKeyPress`로 전달
    }
    // setInputValue((prevValue) => Math.min(prevValue + item.value, 210000));
  };

  return (
    <div className={cx("keyboard-modal")} onMouseDown={(e) => e.preventDefault()}>
      {isBadge && <BadgeList className={cx("badge-list")} list={MONEY} onClick={handleChangeValue} />}
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
