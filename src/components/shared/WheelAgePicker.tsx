import Wheel from "@/components/shared/Wheel";
import React from "react";
import styles from "./WheelTimePicker.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

interface Props {
  onChange: (time: number) => void;
  initialValue?: number;
}

const WheelAgePicker: React.FC<Props> = ({ onChange, initialValue = 20 }) => {
  return (
    <div
      className={cx("container")}
      onTouchMove={(e) => {
        e.stopPropagation();
      }}>
      <div className={cx("innerContainer")}>
        <Wheel options={range(20, 100)} initialIndex={initialValue} onChange={onChange} />
      </div>
    </div>
  );
};

const range = (start: number, end: number) => {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

export default WheelAgePicker;
