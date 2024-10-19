import React from "react";

import Header from "@/components/sections/Header";
import Spacing from "@/components/shared/Spacing";

import styles from "./CalculatorPage.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

export default function CalculatorPage() {
  return (
    <>
      <Header className={cx("header")} title="금융계산기" />
      <Spacing size={53} />
      <div className={cx("container")}>계산기 페이지</div>
    </>
  );
}
