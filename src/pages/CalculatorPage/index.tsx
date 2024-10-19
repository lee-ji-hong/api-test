import { useState } from "react";

import Header from "@/components/sections/Header";
import Spacing from "@/components/shared/Spacing";
import Badge from "@/components/shared/Badge";

import LTVCalculator from "./LTVCalculator";
import DTICalculator from "./DTICalculator";
import DSRCalculator from "./DSRCalculator";
import RepaymentCalculator from "./RepaymentCalculator";

import styles from "./CalculatorPage.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

export default function CalculatorPage() {
  const [selectedCalculator, setSelectedCalculator] = useState("LTV");
  return (
    <>
      <Header className={cx("header")} title="금융계산기" />
      <Spacing size={53} />
      <div className={cx("container")}>
        {["LTV", "DTI", "DSR", "원리금"].map((item, index) => (
          <Badge
            className={cx("badge")}
            key={index}
            title={item}
            onClick={() => setSelectedCalculator(item)}
            theme={selectedCalculator === item ? "dark" : "white"}
          />
        ))}
      </div>
      <Spacing size={20} />
      <div>{selectedCalculator === "LTV" && <LTVCalculator />}</div>
      <div>{selectedCalculator === "DTI" && <DTICalculator />}</div>
      <div>{selectedCalculator === "DSR" && <DSRCalculator />}</div>
      <div>{selectedCalculator === "원리금" && <RepaymentCalculator />}</div>
    </>
  );
}
