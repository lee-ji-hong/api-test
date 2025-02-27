import Spacing from "@/components/shared/Spacing";
import { DSRCalculationResult } from "@/models";
import { formatNumberWithUnits2 } from "@/utils/formatters";
import { Divider } from "@mui/material";
import classNames from "classnames/bind";
import style from "./DSRResultInfo.module.scss";

export const DSRResultInfo = (result: DSRCalculationResult) => {
  const cx = classNames.bind(style);
  console.log("result", result);
  return (
    <div className={cx("container")}>
      <div className={cx("title")}>
        DSR <span className={cx("highlight")}>{Math.floor(result.finalDsrRatio)}%</span>
      </div>
      <div className={cx("title")}>
        연원리금 <span className={cx("highlight")}>{formatNumberWithUnits2(result.totalAnnualRepayment)}</span>
      </div>
      <div className={cx("title")}></div>
      <Spacing size={12} />
      <div className={cx("subtitle")}>
        연원리금 상환액은 {formatNumberWithUnits2(result.totalAnnualRepayment)}이고, 연소득은
        {formatNumberWithUnits2(result.annualIncome)}이므로 DSR은 약{Math.floor(result.finalDsrRatio)}%로 예상됩니다.
      </div>
      <Spacing size={20} />
      <div className={cx("subContainer")}>
        <div>
          {result.dsrCalcResults.map((item, index) => (
            <div key={index}>
              <Spacing size={20} />
              <div className={cx("subContainerTitle")}>{item.loanDescription}</div>
              <div className={cx("subTitleContainer")}>
                <div className={cx("subContainerTitle2")}>대출원금</div>
                <div className={cx("subContainerPrice")}>{formatNumberWithUnits2(item.principal)}</div>
              </div>
              <div className={cx("subTitleContainer")}>
                <div className={cx("subContainerTitle2")}>연원리금</div>
                <div className={cx("subContainerPrice")}>
                  {formatNumberWithUnits2(item.annualPrincipalRepayment + item.annualInterestRepayment)}
                </div>
              </div>
              <Spacing size={20} />

              {/* 마지막 요소가 아닌 경우에만 Divider 렌더링 */}
              {index < result.dsrCalcResults.length - 1 && (
                <Divider sx={{ backgroundColor: "#ECF0FC", height: "1px" }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
