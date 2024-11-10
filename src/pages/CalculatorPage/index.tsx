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
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
const cx = classNames.bind(styles);

export default function CalculatorPage() {
  const [selectedCalculator, setSelectedCalculator] = useState("LTV");
  const location = useLocation();

  useEffect(() => {
    // navigate로 전달된 state에서 초기값 설정
    const calculator = location.state?.calculator;
    if (calculator && ["LTV", "DTI", "DSR", "원리금"].includes(calculator)) {
      setSelectedCalculator(calculator);
    } else {
      setSelectedCalculator("LTV"); // 기본값 설정
    }
  }, [location.state]);

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
