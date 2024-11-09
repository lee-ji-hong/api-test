import ExpandableCard from "@/components/shared/ExpandableCard";
import Spacing from "@/components/shared/Spacing";
import Text from "@/components/shared/Text";
import { LoanAdviceReport } from "@/models";

import classNames from "classnames/bind";
import styles from "./ReportPage.module.scss";
const cx = classNames.bind(styles);

interface Part05Props {
  reportData: LoanAdviceReport;
}

const Part05 = ({ reportData }: Part05Props) => {
  return (
    <div className={cx("box")}>
      <Spacing size={70} />
      <Text
        className={cx("txt-title")}
        text="이 대출을 추천한 이유는/n#20대 인기상품 #초저금리 #최대한도"
        highlight="#20대 인기상품 #초저금리 #최대한도"
      />
      <Spacing size={16} />
      <ExpandableCard content={reportData?.recommendationReason} />
    </div>
  );
};

export default Part05;
