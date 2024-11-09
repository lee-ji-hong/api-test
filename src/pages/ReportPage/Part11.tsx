import SelectBottomSheet from "@/components/modal/SelectBottomSheet";
import Text from "@/components/shared/Text";

import { formatNumberWithUnits } from "@/utils/formatters";
import { ChildStatusLabels } from "@/utils/loanAdviceValues";
import { UserInputInfo } from "@/models";

import classNames from "classnames/bind";
import styles from "./ReportPage.module.scss";
const cx = classNames.bind(styles);

interface Part11Props {
  Info: UserInputInfo;
  handleClose: () => void;
}

const Part11 = ({ Info, handleClose }: Part11Props) => {
  return (
    <SelectBottomSheet modalTitle="대출에 적용한 조건을 확인하세요" titleAlign="flex-start" onClose={handleClose}>
      <div className={cx("result-box")}>
        <div className={cx("box-txt-container")}>
          <Text className={cx("box-txt-left")} text="임차보증금" />
          <Text className={cx("box-txt-right")} text={formatNumberWithUnits(Info?.rentalDeposit / 10000)} />
        </div>
        <div className={cx("box-txt-container")}>
          <Text className={cx("box-txt-left")} text="월세" />
          <Text className={cx("box-txt-right")} text={formatNumberWithUnits(Info?.monthlyRent / 10000)} />
        </div>
        <div className={cx("box-txt-container")}>
          <Text className={cx("box-txt-left")} text="보유현금" />
          <Text className={cx("box-txt-right")} text={formatNumberWithUnits(Info?.cashOnHand / 10000)} />
        </div>
        <div className={cx("box-txt-container")}>
          <Text className={cx("box-txt-left")} text="만 나이" />
          <Text className={cx("box-txt-right")} text={`만 ${Info?.age}세`} />
        </div>
        <div className={cx("box-txt-container")}>
          <Text className={cx("box-txt-left")} text="혼인상태" />
          <Text className={cx("box-txt-right")} text="5억원" />
        </div>
        <div className={cx("box-txt-container")}>
          <Text className={cx("box-txt-left")} text="연소득" />
          <Text className={cx("box-txt-right")} text={formatNumberWithUnits(Info?.annualIncome / 10000)} />
        </div>
        <div className={cx("box-txt-container")}>
          <Text className={cx("box-txt-left")} text="배우자 연소득" />
          <Text className={cx("box-txt-right")} text={formatNumberWithUnits(Info?.spouseAnnualIncome / 10000)} />
        </div>
        <div className={cx("box-txt-container")}>
          <Text className={cx("box-txt-left")} text="자녀상태" />
          <Text className={cx("box-txt-right")} text={ChildStatusLabels[Info?.childStatus]} />
        </div>
        <div className={cx("box-txt-container")}>
          <Text className={cx("box-txt-left")} text="중소기업재직여부" />
          <Text className={cx("box-txt-right")} text={Info?.isSMEEmployee ? "네" : "아니요"} />
        </div>
        <div className={cx("box-txt-container")}>
          <Text className={cx("box-txt-left")} text="순자산3.45억초과여부" />
          <Text className={cx("box-txt-right")} text={Info?.isNetAssetOver345M ? "네" : "아니요"} />
        </div>
        <div className={cx("box-txt-container")}>
          <Text className={cx("box-txt-left")} text="주택정보" />
          <Text className={cx("box-txt-right")} text={`${Info?.dongName} ${Info?.jibun} ${Info?.buildingName}`} />
        </div>
      </div>
    </SelectBottomSheet>
  );
};

export default Part11;
