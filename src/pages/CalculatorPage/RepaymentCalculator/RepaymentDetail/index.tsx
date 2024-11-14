import styles from "./RepaymentDetail.module.scss";
import classNames from "classnames/bind";
import Spacing from "@/components/shared/Spacing";
import { RepaymentCalculationResult } from "@/models";
import { Divider } from "@mui/material";
import { formatNumberWithUnits2 } from "@/utils/formatters";

const RepaymentCalcDetail = ({
  response,
  interestRate,
}: {
  response: RepaymentCalculationResult;
  interestRate: number;
}) => {
  const cx = classNames.bind(styles);

  function formatCurrency(value: number): string {
    return value.toLocaleString("en-US");
  }

  return (
    <div className={cx("container")}>
      <div className={cx("title")}>
        총 원금 <span className={cx("highlight")}>{formatNumberWithUnits2(response.totalPrincipal)}</span>
      </div>
      <div className={cx("title")}>
        총 이자 <span className={cx("highlight")}>{formatNumberWithUnits2(response.totalInterest)}</span>
      </div>
      <div className={cx("title")}>
        총 상환 회차 <span className={cx("highlight")}>{response.totalInstallments}회</span>
      </div>
      <Spacing size={12} />
      <div className={cx("titleDescription")}>
        {`총 ${formatNumberWithUnits2(response.totalPrincipal)}을 
  ${response.totalInstallments}개월동안 
  ${interestRate}% 
  원리금균등 상환으로 대출받았을 때 첫달에는 ${formatNumberWithUnits2(response.repaymentSchedules[0].remainingPrincipal)} 
  마지막달에는 ${formatNumberWithUnits2(response.repaymentSchedules[response.totalInstallments - 1].remainingPrincipal)}을 갚아야합니다.`}
        <br />
        {`자세한 내역은 아래 표를 참조해주세요.`}
      </div>

      <Spacing size={20} />

      <div className={cx("tableContainer")}>
        <div className={cx("tableTitle")}>
          <div className={cx("title1")}>회차</div>
          <div className={cx("title2")}>월상환금</div>
          <div className={cx("title2")}>대출 잔금</div>
        </div>
        <Divider
          sx={{
            borderBottomWidth: "1px",
            borderColor: "#ECF0FC", // 원하는 색상
            mx: 2, // 양옆 마진 10px (theme.spacing 단위 기준)
          }}
        />
        {/* {response.repaymentSchedules.slice(0, 5).map((data) => ( */}
        {response.repaymentSchedules.map((data) => (
          <div className={cx("tableRow")}>
            <div className={cx("tableIndexColumn")}>
              <div className={cx("indexNo")}>{data.installmentNumber}</div>
              <div className={cx("indexNo")} style={{ visibility: "hidden" }}>
                {data.installmentNumber}
              </div>
              <div className={cx("indexNo")} style={{ visibility: "hidden" }}>
                {data.installmentNumber}
              </div>
            </div>
            <div className={cx("tableMonthColumn")}>
              <div className={cx("textTotal")}>{formatCurrency(data.totalPayment)}원</div>
              <div className={cx("text")}>원금 {formatCurrency(data.principalPayment)}원</div>
              <div className={cx("text")}>이자 {formatCurrency(data.interestPayment)}원</div>
            </div>

            <div className={cx("tableRestPriceColumn")}>
              <div className={cx("textTotal")}>{formatCurrency(data.remainingPrincipal)}원</div>
              <div className={cx("text")} style={{ visibility: "hidden" }}>
                -
              </div>
              <div className={cx("text")} style={{ visibility: "hidden" }}>
                -
              </div>
            </div>
          </div>
        ))}
        <Spacing size={20} />
        {/* <div className={cx("tableMoreText")}>{"월별 상환 금액 자세히 보기 >"} </div> */}
        {/* <Spacing size={20} /> */}
      </div>
      <Spacing size={50} />

      {/* <BottomModal onClose={() => {}} response={response} /> */}
    </div>
  );
};

export default RepaymentCalcDetail;
