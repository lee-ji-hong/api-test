import { Post } from "@/api/model/CommunityResponse";
import Image from "@/components/shared/Image";
import Spacing from "@/components/shared/Spacing";
import { IMAGES } from "@/constants/images";
import { Typography } from "@mui/material";
import classNames from "classnames/bind";

import styles from "./LoanCard.module.scss";

const LoanCard: React.FC<Post> = (props) => {
  function convertToKoreanNumber(num: number): string {
    const units = ["", "만", "억", "조"];
    let result = "";
    let unitIndex = 0;

    // 숫자를 4자리씩 나눠서 처리
    while (num > 0) {
      const chunk = num % 10000; // 4자리씩 끊음
      if (chunk > 0) {
        const chunkStr = convertChunkToKorean(chunk);
        result = chunkStr + units[unitIndex] + result;
      }
      num = Math.floor(num / 10000);
      unitIndex++;
    }

    // "만만" 또는 "천만" 같은 중복 표현 방지
    return result.replace(/(만)(천|백|십)/g, "$1") || "0";
  }
  function convertChunkToKorean(chunk: number): string {
    const units = ["", "십", "백", "천"];
    let chunkResult = "";
    let unitIndex = 0;

    // 1의 자리부터 4의 자리까지 반복해서 처리
    while (chunk > 0) {
      const digit = chunk % 10;
      if (digit > 0) {
        chunkResult = digit + units[unitIndex] + chunkResult;
      }
      chunk = Math.floor(chunk / 10);
      unitIndex++;
    }

    return chunkResult;
  }
  const cx = classNames.bind(styles);
  return (
    <div className={cx("container")}>
      <div className={cx("container-loaninfo")}>
        <div className={cx("container-txt-loaninfo")}>
          <Image className={cx("img-loaninfo")} imageInfo={IMAGES?.LoanBankDummyIcon} />

          <Spacing size={4} />
          <Typography className={cx("txt-loaninfo")}>{props.loanAdviceSummaryReport.loanProductName}</Typography>
          <Typography className={cx("txt-loaninfo")}>{props.loanAdviceSummaryReport.loanProductCode} </Typography>
        </div>
        <div className={cx("container-loaninfo-money")}>
          <Typography className={cx("txt-percent")}>
            {props.loanAdviceSummaryReport.expectedLoanRate.toFixed(1)}%
          </Typography>
          <Typography className={cx("txt-loaninfo")}>
            {convertToKoreanNumber(props.loanAdviceSummaryReport.possibleLoanLimit)}원
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default LoanCard;
