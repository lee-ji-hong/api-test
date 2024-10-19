import React from "react";

import styles from "./CalculatorPage.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

export default function CalculatorPage() {
  return <div className={cx("container")}>계산기 페이지</div>;
}
