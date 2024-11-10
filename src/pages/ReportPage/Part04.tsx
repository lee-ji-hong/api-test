import Spacing from "@/components/shared/Spacing";
import Image from "@/components/shared/Image";
import Text from "@/components/shared/Text";
import { IMAGES } from "@/constants/images";

import { formatNumberWithUnits, formatNumberWithUnits2 } from "@/utils/formatters";
import { LoanAdviceReport } from "@/models";

import classNames from "classnames/bind";
import styles from "./ReportPage.module.scss";
const cx = classNames.bind(styles);

interface Part04Props {
  reportData: LoanAdviceReport;
}

// 기회비용과 대체 비유를 계산하는 함수
const calculateOpportunityCost = (ownFunds: number) => {
  let opportunityCost = 0;
  let alternativeComparison = "";
  let count = 10;

  // 기회비용 계산
  if (ownFunds <= 5000000) {
    opportunityCost = 20000;
    count = 6;
  } else if (ownFunds <= 20000000) {
    opportunityCost = 83000;
    count = 4;
  } else if (ownFunds <= 30000000) {
    opportunityCost = 120000;
    count = 6;
  } else if (ownFunds <= 40000000) {
    opportunityCost = 160000;
    count = 8;
  } else if (ownFunds <= 50000000) {
    opportunityCost = 200000;
    count = 10;
  } else if (ownFunds <= 60000000) {
    opportunityCost = 250000;
    count = 5;
  } else if (ownFunds <= 70000000) {
    opportunityCost = 290000;
    count = 6;
  } else if (ownFunds <= 80000000) {
    opportunityCost = 330000;
    count = 7;
  } else if (ownFunds <= 90000000) {
    opportunityCost = 375000;
    count = 8;
  } else if (ownFunds <= 100000000) {
    opportunityCost = 416000;
    count = 10;
  } else if (ownFunds <= 120000000) {
    opportunityCost = 500000;
    count = 1;
  } else if (ownFunds <= 140000000) {
    opportunityCost = 580000;
    count = 1;
  } else if (ownFunds <= 160000000) {
    opportunityCost = 660000;
    count = 2;
  } else if (ownFunds <= 180000000) {
    opportunityCost = 750000;
    count = 3;
  } else if (ownFunds <= 200000000) {
    opportunityCost = 830000;
    count = 3;
  }

  // 대체 비유 설정
  if (ownFunds <= 20000000) {
    alternativeComparison = "커피"; // 500~2천이하 = 커피
  } else if (ownFunds <= 50000000) {
    alternativeComparison = "외식"; // 2천 초과~5천이하 = 외식
  } else if (ownFunds <= 100000000) {
    alternativeComparison = "취미"; // 5천 초과 ~1억이하 = 취미
  } else {
    alternativeComparison = "여행"; // 1억 초과~ 2억이하 = 여행
  }

  return { opportunityCost, alternativeComparison, count };
};

const getImageSource = (alternativeComparison: string) => {
  switch (alternativeComparison) {
    case "커피":
      return IMAGES?.Report_2;
    case "외식":
      return IMAGES?.Report_4;
    case "취미":
      return IMAGES?.Report_3;
    case "여행":
      return IMAGES?.Report_1;
    default:
      return IMAGES?.Report_2;
  }
};

const Part04 = ({ reportData }: Part04Props) => {
  const { opportunityCost, alternativeComparison, count } = calculateOpportunityCost(reportData.ownFunds);

  return (
    <div className={cx("box")}>
      <Spacing size={70} />
      <Text
        className={cx("txt-title")}
        text={`전세 대출을 하게 되면/n한달에 ${alternativeComparison}을 ${count}번을 더 줄여야해요!`}
      />
      <Spacing size={8} />
      <Text
        className={cx("txt-sub")}
        text={`보증금 중 자기자금 ${formatNumberWithUnits(reportData?.ownFunds / 10000)}에 대해서는/n월 ${formatNumberWithUnits2(opportunityCost)}의 기회비용이 발생해요`}
      />
      <Spacing size={8} />
      <Image className={cx("report-img")} imageInfo={getImageSource(alternativeComparison)} />
    </div>
  );
};

export default Part04;
