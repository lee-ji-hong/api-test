import Spacing from "@/components/shared/Spacing";
import { LoanStatus } from "@/models";
import classNames from "classnames/bind";
import style from "./LoanItem.module.scss";

export const LoanItem = (data: LoanStatus) => {
  const cx = classNames.bind(style);

  console.log("data", data.gracePeriod);
  return (
    <div className={cx("container")}>
      <div className={cx("title")}>신용대출</div>
      <Spacing size={24} />
      <div className={cx("itemContainer")}>
        <div className={cx("text1")}>주택담보대출 상환방법</div>
        <div className={cx("text2")}>{data.repaymentType}</div>
      </div>
      <Spacing size={14} />
      <div className={cx("itemContainer")}>
        <div className={cx("text1")}>대출 금액</div>
        <div className={cx("text2")}>{data.principal}원</div>
      </div>
      <Spacing size={14} />
      <div className={cx("itemContainer")}>
        <div className={cx("text1")}>만기상환금</div>
        <div className={cx("text2")}>{data.maturityPaymentAmount}</div>
      </div>
      <Spacing size={14} />
      <div className={cx("itemContainer")}>
        <div className={cx("text1")}>대출기간</div>
        <div className={cx("text2")}>{data.term}</div>
      </div>
      <Spacing size={14} />
      <div className={cx("itemContainer")}>
        <div className={cx("text1")}>대출거치기간</div>
        <div className={cx("text2")}>{data.gracePeriod}</div>
      </div>
      <Spacing size={14} />
      <div className={cx("itemContainer")}>
        <div className={cx("text1")}>대출이자율</div>
        <div className={cx("text2")}>{data.interestRatePercentage}</div>
      </div>
      <Spacing size={14} />
      <div className={cx("itemContainer")}>
        <div className={cx("text1")}>대상주택수도권여부</div>
        <div className={cx("text2")}>{data.isMetroArea ? "Y" : "N"}</div>
      </div>
      <Spacing size={14} />
      <div className={cx("itemContainer")}>
        <div className={cx("text1")}>스트레스 DSR 2단계 적용</div>
        <div className={cx("text2")}>{data.interestRateType ? "Y" : "N"}</div>
      </div>
      <Spacing size={14} />
    </div>
  );
};
