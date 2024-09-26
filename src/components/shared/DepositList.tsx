import { Collapse } from "@mui/material";
import Image from "@/components/shared/Image";
import { IMAGES } from "@/constants/images";
import Spacing from "@/components/shared/Spacing";
import Text from "@/components/shared/Text";
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
}

const CollapseList = styled(Collapse)({
  "& .MuiCollapse-wrapperInner": {
    display: "grid",
    gap: "10px",
  },
});

export const DepositList = ({ list, className, color, isShow = false, toggle = false }: ListProps) => {
  console.log(toggle);
  return (
    <>
      {isShow ? (
        <div className={cx(["container", className])}>
          {list?.slice(0, 3).map((item, index) => (
            <div key={index} className={cx(["container-loaninfo", color])}>
              <div className={cx("container-txt-loaninfo")}>
                <Image className={cx("img-loaninfo")} imageInfo={IMAGES?.LoanBankDummyIcon} />
                <Spacing size={4} />
                <Text className={cx("txt-loaninfo")} text={item.loanProductName} />
              </div>
              <div className={cx("container-loaninfo-money")}>
                <span className={cx("txt-percent")}>{item.expectedLoanRate}%</span>
                <span className={cx("txt-loaninfo")}>{item.possibleLoanLimit}</span>
              </div>
            </div>
          ))}
          <CollapseList in={toggle}>
            {list?.slice(3).map((item, index) => (
              <div key={index} className={cx(["container-loaninfo", color])}>
                <div className={cx("container-txt-loaninfo")}>
                  <Image className={cx("img-loaninfo")} imageInfo={IMAGES?.LoanBankDummyIcon} />
                  <Spacing size={4} />
                  <Text className={cx("txt-loaninfo")} text={item.loanProductName} />
                </div>
                <div className={cx("container-loaninfo-money")}>
                  <span className={cx("txt-percent")}>{item.expectedLoanRate}%</span>
                  <span className={cx("txt-loaninfo")}>{item.possibleLoanLimit}</span>
                </div>
              </div>
            ))}
          </CollapseList>
        </div>
      ) : (
        <div className={cx(["container", className])}>
          {list?.map((item, index) => (
            <div key={index} className={cx(["container-loaninfo", color])}>
              <div className={cx("container-txt-loaninfo")}>
                <Image className={cx("img-loaninfo")} imageInfo={IMAGES?.LoanBankDummyIcon} />
                <Spacing size={4} />
                <Text className={cx("txt-loaninfo")} text={item.loanProductName} />
              </div>
              <div className={cx("container-loaninfo-money")}>
                <span className={cx("txt-percent")}>{item.expectedLoanRate}%</span>
                <span className={cx("txt-loaninfo")}>{item.possibleLoanLimit}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
export default DepositList;
