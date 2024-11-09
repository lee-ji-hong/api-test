import Spacing from "@/components/shared/Spacing";
import Image from "@/components/shared/Image";
import Text from "@/components/shared/Text";
import { IMAGES } from "@/constants/images";

import { LoanAdviceReport } from "@/models";

import classNames from "classnames/bind";
import styles from "./ReportPage.module.scss";
const cx = classNames.bind(styles);

interface Part04Props {
  reportData: LoanAdviceReport;
}

const Part04 = ({ reportData }: Part04Props) => {
  console.log(reportData);
  return (
    <div className={cx("box")}>
      <Spacing size={70} />
      <Text className={cx("txt-title")} text="전세 대출을 하게 되면/n한달에 외식을 10번을 더 줄여야해요!" />
      <Spacing size={8} />
      <Text className={cx("txt-sub")} text="보증금 중 자기자금 1억원에 대해서는/n월 50만원의 기회비용이 발생해요 " />
      <Spacing size={8} />
      <Image className={cx("img")} imageInfo={IMAGES?.Report_1} />
    </div>
  );
};

export default Part04;
