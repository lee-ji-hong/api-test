import { LoanAdviceSummaryReport } from "@/api/model/LoanAdviceReport";
import Image from "@/components/shared/Image";
import Spacing from "@/components/shared/Spacing";
import { IMAGES } from "@/constants/images";
import { Typography } from "@mui/material";
import classNames from "classnames/bind";
import styles from "./LoanCard.module.scss";

const LoanCard: React.FC<LoanAdviceSummaryReport> = (loanAdviceSummaryReport) => {
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

  // loanProductCode와 대출 상품 이름을 매핑하는 객체 타입 정의
  // type LoanProductMap = {
  //   [key: string]: string;
  // };

  // loanProductCode와 대출 상품 이름을 매핑하는 객체
  // const loanProductMap: LoanProductMap = {
  //   "HF-01": "서울시신혼부부임차보증금대출",
  //   "HF-02": "서울시청년임차보증금대출",
  //   "HF-03": "주택신보전세자금대출",
  //   "HF-04": "청년전세론",
  //   "HF-05": "(특례)무주택청년",
  //   "HF-06": "(특례)다자녀가구",
  //   "HF-07": "고정금리 협약전세자금보증",
  //   "NHUF-01": "신생아특례버팀목전세자금대출",
  //   "NHUF-02": "청년전용버팀목전세자금대출",
  //   "NHUF-03": "중소기업취업청년전월세대출",
  //   "NHUF-04": "신혼부부전용전세자금대출",
  //   "NHUF-05": "버팀목전세자금",
  //   "SGI-01": "우량주택전세론",
  //   "HUG-01": "전세안심대출",
  // };
  // loanProductCode에 따라 대출 이름을 반환하는 함수
  // function getLoanProductName(loanProductCode: string): string {
  //   return loanProductMap[loanProductCode] || "알 수 없는 대출 상품";
  // }

  // loanProductCode를 받아 은행 코드를 추출하고, 그에 맞는 이미지를 반환하는 함수
  type ImageInfo = {
    src: string;
    alt: string;
  };
  function getBankImage(loanProductCode: string): ImageInfo {
    const bankCode = loanProductCode.split("-")[0]; // 'HF-01'에서 'HF' 추출

    switch (bankCode) {
      case "HF":
        return IMAGES?.LoanBankHFIcon;
      case "NHUF":
        return IMAGES?.LoanBankNHUFIcon;
      case "SGI":
        return IMAGES?.LoanBankSGIIcon;
      case "HUG":
        return IMAGES?.LoanBankHUGIcon;
      default:
        return IMAGES?.LoanBankDummyIcon;
    }
  }

  const cx = classNames.bind(styles);
  return (
    <div className={cx("container")}>
      <div className={cx("container-loaninfo")}>
        <div className={cx("container-txt-loaninfo")}>
          <Image className={cx("imgLoaninfo")} imageInfo={getBankImage(loanAdviceSummaryReport.loanProductCode)} />

          <Spacing size={4} />
          <Typography className={cx("txtLoaninfo")}>{loanAdviceSummaryReport.loanProductName}</Typography>
          {/* <Typography className={cx("txt-loaninfo")}>
            {getLoanProductName(loanAdviceSummaryReport.loanProductCode)}{" "}
          </Typography> */}
        </div>
        <div className={cx("container-loaninfo-money")}>
          <Typography className={cx("txt-percent")}>{loanAdviceSummaryReport.expectedLoanRate.toFixed(1)}%</Typography>
          <Typography className={cx("txtLoaninfo")}>
            {convertToKoreanNumber(loanAdviceSummaryReport.possibleLoanLimit)}원
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default LoanCard;
