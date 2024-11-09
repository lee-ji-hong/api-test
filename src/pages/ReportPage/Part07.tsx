import { useState } from "react";

import DepositList from "@/components/shared/DepositList";
import Spacing from "@/components/shared/Spacing";
import Text from "@/components/shared/Text";

import { MOCK } from "@/pages/DepositResultPage/mock";
import { LoanAdviceReport } from "@/models";

import classNames from "classnames/bind";
import styles from "./ReportPage.module.scss";
const cx = classNames.bind(styles);

interface Part07Props {
  reportData: LoanAdviceReport;
}

const Part07 = ({ reportData }: Part07Props) => {
  const [showMoreDepositList, setShowMoreDepositList] = useState(false);

  const handleDepositListToggle = () => {
    setShowMoreDepositList(!showMoreDepositList);
  };

  const notEligibleProduct = reportData?.recommendedProducts.filter(
    (item) => item?.notEligibleReasons && item?.notEligibleReasons[0] !== "",
  );

  return (
    <div className={cx("box")}>
      <Spacing size={70} />
      <Text className={cx("txt-title")} text="대출 불가 상품들의 사유를 확인해보세요!" />
      <Spacing size={8} />
      <DepositList
        list={notEligibleProduct || MOCK}
        isShow={notEligibleProduct.length > 3}
        toggle={showMoreDepositList}
        isAlert={true}
        color="white"
      />
      {notEligibleProduct.length > 3 && (
        <button className={cx("list-button")} onClick={handleDepositListToggle}>
          {showMoreDepositList ? "다른 상품 더 보기 ∧" : "다른 상품 더 보기 ∨"}
        </button>
      )}
    </div>
  );
};

export default Part07;
