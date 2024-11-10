import { useState } from "react";

import DepositList from "@/components/shared/DepositList";
import Spacing from "@/components/shared/Spacing";
import Image from "@/components/shared/Image";
import Text from "@/components/shared/Text";
import { IMAGES } from "@/constants/images";

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

  const eligibleProduct = reportData?.recommendedProducts.filter(
    (item) => !item?.notEligibleReasons || item?.notEligibleReasons[0] === "",
  );

  return (
    <div className={cx("box")}>
      <Spacing size={70} />
      <Text className={cx("txt-title")} text="다른 가능한 대출 상품도 확인해보세요!" />
      <DepositList
        className={cx("card-container")}
        list={eligibleProduct?.slice().sort((a, b) => a.expectedLoanRate - b.expectedLoanRate) || MOCK}
        isShow={eligibleProduct.length > 3}
        toggle={showMoreDepositList}
        isFetch={true}
        color="white"
      />
      {eligibleProduct.length > 3 && (
        <button
          className={cx("list-button")}
          style={{ marginTop: showMoreDepositList ? "10px" : "0px" }}
          onClick={handleDepositListToggle}>
          {showMoreDepositList ? (
            <>
              <Text className={cx("txt-title")} text="다른 상품 더 보기" />
              <Image className={cx("arrow")} imageInfo={IMAGES.Down} />
            </>
          ) : (
            <>
              <Text className={cx("txt-title")} text="다른 상품 더 보기" />
              <Image className={cx("arrow")} imageInfo={IMAGES.Up} />
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default Part06;
