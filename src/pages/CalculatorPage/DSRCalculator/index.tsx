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
  const content = `
차주의 상환능력 대비 원리금상환부담을 나타내는 지표로서, 차주가 보유한 모든 대출의 연간 원리금상환액을 연간소득으로 나누어 산출된다.<br>
대출에는 마이너스통장, 신용대출, 전세자금대출, 자동차할부금융 등이 모두 포함된다.<br>
한편, 유사한 개념인 총부채상환비율(DTI)과 비교할 때, DTI는 원금상환액 중 주택담보대출 원금상환액만 포함하는 반면,<br>
DSR (Debt Service Ratio)은 주택담보대출을 포함한 모든 대출의 원금상환액을 포함한다는 점에서 차이가 있다.<br>
정부 및 감독당국은 주택시장 안정화 및 가계부채 연착륙을 위해 2017년 중 LTV, DTI 규제를 강화한 데 이어,<br>
2018년 하반기부터 차주의 부채상환능력을 더욱 포괄적으로 판단할 수 있는 DSR을 금융기관의 여신심사 과정에서 활용하도록 하는 방안을 발표한 이후<br>
DSR 규제 적용범위를 지속적으로 확대하였다.<br><br>
- 출처: 한국은행
`;

  // HTML 태그 제거 함수
  const stripHtml = (html: string) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  const plainText = stripHtml(content); // HTML 태그 제거 후 텍스트 추출

  return (
    <div>
      <div className={cx("reason-box")}>
        <Text className={cx("txt-title")} text="DSR이란?" />
        <div>
          <span className={cx("txt-sub")}>{plainText.substring(0, 100)}...</span>
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
          <span className={cx("txt-sub")} dangerouslySetInnerHTML={{ __html: content }} />
        </SelectBottomSheet>
      )}
    </div>
  );
};

export default DSRCalculator;
