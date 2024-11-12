import { useState } from "react";

import SelectBottomSheet from "@/components/modal/SelectBottomSheet";
import Text from "@/components/shared/Text";

import styles from "../CalculatorPage.module.scss";
import classNames from "classnames/bind";
import { LoanTypeInput } from "./UIComponent/LoanTypeInput";
import YearIncomeInput from "./UIComponent/YearIncomeInput";
const cx = classNames.bind(styles);

const DSRCalculator = () => {
  const [toggle, setToggle] = useState(false);
  const content =
    "대출을 받으려는 사람의 소득 대비 전체 금융부채의 원리금 상환액 비율을 말하는 것으로, 연간 총부채 원리금 상환액을 연간 소득으로 나눠 산출한다. 모든 신용대출 원리...더 보기";
  return (
    <div>
      <div className={cx("reason-box")}>
        <Text className={cx("txt-title")} text="DSR이란?" />
        <div>
          <span className={cx("txt-sub")}>{content.substring(0, 100)}...</span>
          <button onClick={() => setToggle(!toggle)}>
            <Text className={cx("txt-sub")} text={"\u00A0\u00A0\u00A0\u00A0더보기"} highlight="더보기" />
          </button>
        </div>
      </div>

      {/* 연소득 입력 컴포넌트 */}
      <YearIncomeInput />
      <div className={cx("hr")}></div>
      {/* 대출유형 컴포넌트 */}
      <LoanTypeInput />

      {toggle && (
        <SelectBottomSheet modalTitle="DSR이란?" titleAlign="flex-start" onClose={() => setToggle(false)}>
          <span className={cx("txt-sub")}> {content} </span>
        </SelectBottomSheet>
      )}
    </div>
  );
};

export default DSRCalculator;
