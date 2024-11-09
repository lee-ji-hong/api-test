import { useState } from "react";

import ReportList from "@/components/shared/ReportList";
import Spacing from "@/components/shared/Spacing";
import Text from "@/components/shared/Text";

import { formatNumber, formatNumberWithUnits } from "@/utils/formatters";
import { LoanAdviceReport } from "@/models";

import classNames from "classnames/bind";
import styles from "./ReportPage.module.scss";
const cx = classNames.bind(styles);

interface Part03Props {
  reportData: LoanAdviceReport;
}

interface ListItem {
  label: string;
  amount: number;
}

const Part03 = ({ reportData }: Part03Props) => {
  const [showMoreExtraCost, setShowMoreExtraCost] = useState(false);
  const feeData: ListItem[] = [
    { label: "보증보험료", amount: reportData?.guaranteeInsuranceFee },
    { label: "인지세", amount: reportData?.stampDuty },
  ];

  const handleExtraCostListToggle = () => {
    setShowMoreExtraCost(!showMoreExtraCost);
  };

  return (
    <div className={cx("box")}>
      <Spacing size={70} />
      <Text
        className={cx("txt-title")}
        text={`${formatNumberWithUnits(reportData?.loanAmount / 10000)} 대출시 약 ${formatNumber(reportData?.guaranteeInsuranceFee + reportData?.stampDuty)}원의/n부수비용이 들어가요!`}
        highlight={`${formatNumber(reportData?.guaranteeInsuranceFee + reportData?.stampDuty)}원`}
      />
      <ReportList list={feeData} show={showMoreExtraCost} />
      {feeData.length > 3 && (
        <button className={cx("list-button")} onClick={handleExtraCostListToggle}>
          {showMoreExtraCost ? "부수 비용 더 보기 ∧" : "부수 비용 더 보기 ∨"}
        </button>
      )}
    </div>
  );
};

export default Part03;
