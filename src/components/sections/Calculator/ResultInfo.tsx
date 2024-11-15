import Spacing from "@/components/shared/Spacing";
import SpacingWidth from "@/components/shared/SpacingWidth";
import Text from "@/components/shared/Text";
import { periodState } from "@/recoil/atoms";
import { formatNumber, formatNumberWithUnits2 } from "@/utils/formatters";
import { Divider } from "@mui/material";

import classNames from "classnames/bind";
import { useRecoilValue } from "recoil";
import styles from "./ResultInfo.module.scss";
const cx = classNames.bind(styles);

interface Contents {
  title: string;
  ment: string;
  description: string;
  details: Record<string, string | number>;
}

const ResultInfo = ({
  ltvRatio,
  availableLoanAmount,
  contents,
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
  ltvRatio: number;
  availableLoanAmount: number;
  contents: Contents;
}) => {
  const periodUnit = useRecoilValue(periodState);
  const getLabelForKey = (key: string) => {
    switch (key) {
      case "loanPurpose":
        return "대출 목적";
      case "houseOwnershipType":
        return "보유주택 수";
      case "regionType":
        return "지역";
      case "collateralValue":
        return "담보대출금액";
      case "annualIncome":
        return "연소득";
      case "loanAmount":
        return "대출 금액";
      case "interestRate":
        return "대출 금리";
      case "loanTerm":
        return "대출 기간";
      case "repaymentType":
        return "상환방법";
      case "yearlyLoanInterestRepayment":
        return "보유대출 연이자 상환액";
      default:
        return key;
    }
  };

  const formatValue = (key: string, value: string | number) => {
    if (getLabelForKey(key) === "담보대출금액" && typeof value === "number") {
      return formatNumber(value) + "원"; // 숫자를 천 단위로 포맷팅
    } else if (
      typeof value === "number" &&
      (key === "annualIncome" || key === "loanAmount" || key === "yearlyLoanInterestRepayment")
    ) {
      return formatNumber(value) + "원";
    } else if (getLabelForKey(key) === "대출 기간") {
      const unit = periodUnit === "년" ? "년" : "개월";
      return value + unit;
    } else if (typeof value === "number") {
      return formatNumber(value); // 숫자를 천 단위로 포맷팅
    }
    return String(value); // 기본적으로 문자열로 반환
  };

  return (
    <section className={cx(["container", className])}>
      <div className={cx("textContainer")}>
        <Text className={cx("text")} text={contents.title} />
        <SpacingWidth size={4} />
        <Text className={cx("textValue")} text={ltvRatio + "%"} />
      </div>
      <div className={cx("textContainer")}>
        <Text className={cx("text")} text={contents.ment} />
        <SpacingWidth size={4} />
        <Text className={cx("textValue")} text={formatNumberWithUnits2(availableLoanAmount)} />
      </div>

      <Spacing size={10} />
      <Text className={cx("text-sub")} text={contents.description} />
      <Spacing size={20} />

      <div className={cx("box")}>
        {Object.entries(contents?.details).map(([key, value]) => (
          <div className={cx("box-txt-container")} key={key}>
            <Text className={cx("box-txt-left")} text={getLabelForKey(key)} />
            <Text
              className={cx("box-txt-right")}
              text={formatValue(key, value)} // 포맷팅 적용
            />
          </div>
        ))}
        <Divider sx={{ height: "1px", backgroundColor: "#ECF0FC" }} />
        <Spacing size={20} />
        {children}
      </div>
    </section>
  );
};

export default ResultInfo;
