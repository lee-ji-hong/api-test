import Spacing from "@/components/shared/Spacing";
import { LoanStatus } from "@/models";
// import { periodState } from "@/recoil/atoms";
import { formatNumberWithUnits2 } from "@/utils/formatters";
import classNames from "classnames/bind";
// import { useRecoilValue } from "recoil";
import style from "./LoanItem.module.scss";

export const LoanItem = (data: LoanStatus) => {
  const cx = classNames.bind(style);

  const loanTypeMapping = {
    MORTGAGE: "주택담보대출",
    INTERIM_PAYMENT_AND_MOVING: "중도금 및 이주비",
    OFFICETEL_MORTGAGE_LOAN: "오피스텔담보대출",
    JEONSE_LOAN: "전세대출",
    JEONSE_DEPOSIT_COLLATERAL_LOAN: "전세보증금담보대출",
    PERSONAL_LOAN: "신용대출",
    NON_HOUSING_REAL_ESTATE_COLLATERAL_LOAN: "비주택 부동산 담보 대출",
    OTHER_COLLATERAL_LOAN: "기타담보 대출",
    DEPOSIT_AND_INSURANCE_COLLATERAL_LOAN: "예적금 담보 및 보험계약 대출",
    SECURITIES_COLLATERAL_LOAN: "유가증권 담보대출",
    LONG_TERM_CARD_LOAN: "장기카드대출",
    OTHER_LOAN: "기타대출",
  } as const;

  // const period = useRecoilValue(periodState);
  // const periodUnit = period === "년" ? "년" : "개월";
  const periodUnit = "개월";
  return (
    <div className={cx("container")}>
      <div className={cx("title")}> {loanTypeMapping[data.loanType as keyof typeof loanTypeMapping] || ""}</div>
      <Spacing size={24} />
      <div className={cx("itemContainer")}>
        <div className={cx("text1")}>주택담보대출 상환방법</div>
        <div className={cx("text2")}>
          {data.repaymentType === "BULLET"
            ? "일시상환"
            : data.repaymentType === "AMORTIZING"
              ? "원리금균등분할상환"
              : data.repaymentType === "EQUAL_PRINCIPAL"
                ? "원금균등분할상환"
                : ""}
        </div>
      </div>
      <Spacing size={14} />
      <div className={cx("itemContainer")}>
        <div className={cx("text1")}>대출 금액</div>
        <div className={cx("text2")}>{formatNumberWithUnits2(data.principal)}</div>
      </div>
      <Spacing size={14} />
      <div className={cx("itemContainer")}>
        <div className={cx("text1")}>만기상환금</div>
        <div className={cx("text2")}>{formatNumberWithUnits2(data.maturityPaymentAmount)}</div>
      </div>
      <Spacing size={14} />
      <div className={cx("itemContainer")}>
        <div className={cx("text1")}>대출기간</div>
        <div className={cx("text2")}>{data.term + periodUnit}</div>
      </div>
      <Spacing size={14} />
      <div className={cx("itemContainer")}>
        <div className={cx("text1")}>대출거치기간</div>
        <div className={cx("text2")}>{data.gracePeriod + periodUnit}</div>
      </div>
      <Spacing size={14} />
      <div className={cx("itemContainer")}>
        <div className={cx("text1")}>대출이자율</div>
        <div className={cx("text2")}>{data.interestRatePercentage}%</div>
      </div>
      <Spacing size={14} />
      <div className={cx("itemContainer")}>
        <div className={cx("text1")}>대상주택수도권여부</div>
        <div className={cx("text2")}>{data.isMetroArea ? "수도권" : "비수도권"}</div>
      </div>
      <Spacing size={14} />
      <div className={cx("itemContainer")}>
        <div className={cx("text1")}>스트레스 DSR 2단계 적용</div>
        <div className={cx("text2")}>
          {data.interestRateType === "VARIABLE"
            ? "변동형"
            : data.interestRateType === "MIXED"
              ? "혼합형"
              : data.interestRateType === "PERIODIC"
                ? "주기형"
                : ""}
        </div>
      </div>
      <Spacing size={14} />
    </div>
  );
};
