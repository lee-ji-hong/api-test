import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Collapse } from "@mui/material";

import SelectBottomSheet from "@/components/modal/SelectBottomSheet";
import Spacing from "@/components/shared/Spacing";
import Image from "@/components/shared/Image";
import Text from "@/components/shared/Text";

import { useGetSpecificLoanAdvice } from "@/hooks/queries/useGetSpecificLoanAdvice";
import { useSendSpecificLoanAdvice } from "@/hooks/queries/useSendSpecificLoanAdvice";
import { useInternalRouter } from "@/hooks/useInternalRouter";
import { formatNumberWithUnits } from "@/utils/formatters";
import { getBankImage } from "@/utils/getBankImage";
import { IMAGES } from "@/constants/images";
import { DepositLists } from "@/models";

import classNames from "classnames/bind";
import styles from "./DepositList.module.scss";
import { styled } from "@mui/system";
const cx = classNames.bind(styles);

type ColorType = "white" | "grey";
interface ListProps {
  className?: string;
  userInputInfoId?: number;
  list?: DepositLists[];
  color?: ColorType;
  isShow?: boolean;
  toggle?: boolean;
  isAlert?: boolean;
  isFetch?: boolean;
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
  isFetch,
  userInputInfoId,
}: {
  item: DepositLists;
  color?: ColorType;
  isAlert?: boolean;
  isFetch?: boolean;
  userInputInfoId?: number;
  onClick?: () => void;
  onClose?: () => void;
}) => {
  const [resultId, setResultId] = useState<number>();
  const [modalOpen, setModalOpen] = useState(false);
  const { specificLoanAdvice, error } = useGetSpecificLoanAdvice(resultId ?? 0);
  const { sendSpecificLoanData } = useSendSpecificLoanAdvice();
  const router = useInternalRouter();
  const location = useLocation();

  useEffect(() => {
    if (specificLoanAdvice) {
      router.push(`/report/${resultId}`, { reportData: specificLoanAdvice, isRecent: true });
    }
    if (error) {
      console.error("조회 실패:", error);
    }
  }, [specificLoanAdvice, error]);

  const handleAdviceReport = (id: number, code: string) => {
    if (userInputInfoId) {
      // console.log("리포트 출력", userInputInfoId);
      sendSpecificLoanData({
        userInputInfoId: userInputInfoId,
        productCode: code,
      });
    } else {
      // console.log("보증금 입력", id);
      setResultId(id);
    }
  };

  const handleRowClick = () => {
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleModalClose = () => {
    setModalOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <div
        className={cx(["container-loaninfo", color, { "hover-enabled": isFetch }])}
        onClick={() => isFetch && handleAdviceReport(item.loanAdviceResultId ?? 0, item.loanProductCode)}>
        <div className={cx(["container-loaninfo-top"])}>
          <div className={cx("container-txt-loaninfo")}>
            <div>
              <Image className={cx("img-loaninfo")} imageInfo={getBankImage(item.loanProductCode)} />
            </div>
            <Spacing size={4} />
            <Text className={cx("txt-loaninfo")} text={item.loanProductName} />
          </div>
          <div className={cx("container-loaninfo-money")}>
            {location.pathname.includes("/report") ? (
              <>
                <div>
                  <span className={cx("txt-percent-limit")}>최소</span>
                  <span className={cx("txt-percent")}>{item.expectedLoanRate}%</span>
                </div>
                <div>
                  <span className={cx("txt-loaninfo")}>최대&nbsp;&nbsp;</span>
                  <span
                    className={cx("txt-loaninfo")}>{`${formatNumberWithUnits(item.possibleLoanLimit / 10000)}`}</span>
                </div>
              </>
            ) : (
              <>
                <span className={cx("txt-percent")}>{item.expectedLoanRate}%</span>
                <span className={cx("txt-loaninfo")}>{`${formatNumberWithUnits(item.possibleLoanLimit / 10000)}`}</span>
              </>
            )}
          </div>
        </div>
        <Spacing size={10} />
        {isAlert && Array.isArray(item?.notEligibleReasons) && item?.notEligibleReasons[0] !== "" && (
          <div className={cx("container-loaninfo-bottom")} onClick={handleRowClick}>
            <Image className={cx("img-info")} imageInfo={IMAGES.Information} />
            <Text className={cx("txt-loaninfo-alert", "alert")} text={`${item.notEligibleReasons[0]}`} />
            <Image className={cx("img-arrow")} imageInfo={IMAGES.Red_right_btn} />
          </div>
        )}
      </div>
      {modalOpen && (
        <SelectBottomSheet
          modalTitle={`${item.loanProductName}에 대한/n대출 불가 사유는 아래와 같습니다.`}
          // alignItems="right"
          onClose={handleModalClose}>
          {item?.notEligibleReasons?.map((ment) => (
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

export const DepositList = ({
  userInputInfoId,
  list,
  className,
  color,
  isShow = false,
  isAlert = false,
  toggle = false,
  isFetch = false,
}: ListProps) => {
  const renderLoanInfoItems = (items: DepositLists[], start: number, end?: number) => {
    return items
      .slice(start, end || items.length)
      .map((item, index) => (
        <LoanInfoItem
          key={index}
          item={item}
          userInputInfoId={userInputInfoId}
          color={color}
          isAlert={isAlert}
          isFetch={isFetch}
        />
      ));
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
