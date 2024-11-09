import { useState } from "react";

import DepositList from "@/components/shared/DepositList";
import Spacing from "@/components/shared/Spacing";
import Text from "@/components/shared/Text";

import { MOCK } from "@/pages/DepositResultPage/mock";
import { LoanAdviceReport } from "@/models";

import classNames from "classnames/bind";
import styles from "./ReportPage.module.scss";
const cx = classNames.bind(styles);

interface Part06Props {
  reportData: LoanAdviceReport;
}

const Part06 = ({ reportData }: Part06Props) => {
  const [showMoreDepositList, setShowMoreDepositList] = useState(false);

  const handleDepositListToggle = () => {
    setShowMoreDepositList(!showMoreDepositList);
  };
  return (
    <div className={cx("box")}>
      <Spacing size={70} />
      <Text className={cx("txt-title")} text="다른 가능한 대출 상품도 확인해보세요!" />
      <Spacing size={8} />
      <DepositList
        list={reportData?.recommendedProducts || MOCK}
        isShow={reportData?.recommendedProducts.length > 3}
        toggle={showMoreDepositList}
        isFetch={true}
        color="white"
      />
      {reportData?.recommendedProducts.length > 3 && (
        <button className={cx("list-button")} onClick={handleDepositListToggle}>
          {showMoreDepositList ? "다른 상품 더 보기 ∧" : "다른 상품 더 보기 ∨"}
        </button>
      )}
    </div>
  );
};

export default Part06;
