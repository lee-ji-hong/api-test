import { useState } from "react";
import { Collapse } from "@mui/material";
import SelectBottomSheet from "@/components/shared/SelectBottomSheet";
import Spacing from "@/components/shared/Spacing";
import Image from "@/components/shared/Image";
import Text from "@/components/shared/Text";

import { formatNumberWithUnits } from "@/utils/formatters";
import { getBankImage } from "@/utils/getBankImage";
import { DepositLists } from "@/models";

import classNames from "classnames/bind";
import styles from "./DepositList.module.scss";
import { styled } from "@mui/system";
const cx = classNames.bind(styles);

type ColorType = "white" | "grey";
interface ListProps {
  className?: string;
  list?: DepositLists[];
  color?: ColorType;
  isShow?: boolean;
  toggle?: boolean;
  isAlert?: boolean;
}

const CollapseList = styled(Collapse)({
  "& .MuiCollapse-wrapperInner": {
    display: "grid",
    gap: "10px",
  },
});

const LoanInfoItem = ({
  item,
  color,
  isAlert,
}: {
  item: DepositLists;
  color?: ColorType;
  isAlert?: boolean;
  onClick?: () => void;
  onClose?: () => void;
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleRowClick = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className={cx(["container-loaninfo", color])}>
        <div className={cx(["container-loaninfo-top"])}>
          <div className={cx("container-txt-loaninfo")}>
            <div>
              <Image className={cx("img-loaninfo")} imageInfo={getBankImage(item.loanProductCode)} />
            </div>
            <Spacing size={4} />
            <Text className={cx("txt-loaninfo")} text={item.loanProductName} />
          </div>
          <div className={cx("container-loaninfo-money")}>
            <span className={cx("txt-percent")}>{item.expectedLoanRate}%</span>
            <span className={cx("txt-loaninfo")}>{`${formatNumberWithUnits(item.possibleLoanLimit / 10000)}`}</span>
          </div>
        </div>
        {isAlert && (
          <div className={cx("container-loaninfo-bottom")} onClick={handleRowClick}>
            <Text className={cx("txt-loaninfo", "alert")} text={`${item.notEligibleReasons[0]}`} />
          </div>
        )}
      </div>
      {modalOpen && (
        <SelectBottomSheet
          modalTitle={`${item.loanProductName}에 대한 대출 불가 사유는 아래와 같습니다.`}
          // modalSubTitle={modalSubTitle}
          onClose={handleModalClose}>
          {item?.notEligibleReasons.map((ment) => (
            <li
              key={ment}
              className={cx("modal-list")}
              onClick={(e) => {
                e.stopPropagation();
              }}>
              {ment}
            </li>
          ))}
        </SelectBottomSheet>
      )}
    </>
  );
};

export const DepositList = ({ list, className, color, isShow = false, isAlert = false, toggle = false }: ListProps) => {
  const renderLoanInfoItems = (items: DepositLists[], start: number, end?: number) => {
    return items
      .slice(start, end || items.length)
      .map((item, index) => <LoanInfoItem key={index} item={item} color={color} isAlert={isAlert} />);
  };

  return (
    <>
      <div className={cx(["container", className])}>
        {isShow ? (
          <>
            {renderLoanInfoItems(list || [], 0, 3)}
            <CollapseList in={toggle}>{renderLoanInfoItems(list || [], 3)}</CollapseList>
          </>
        ) : (
          renderLoanInfoItems(list || [], 0)
        )}
      </div>
    </>
  );
};

export default DepositList;
