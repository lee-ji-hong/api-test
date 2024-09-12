import Image from "@/components/shared/Image";
import Spacing from "@/components/shared/Spacing";
import { IMAGES } from "@/constants/images";
import { Typography } from "@mui/material";
import classNames from "classnames/bind";

import styles from "./LoanCard.module.scss";

interface LoanCardProps {
  onClick: () => void;
}

const LoanCard: React.FC<LoanCardProps> = (props) => {
  const cx = classNames.bind(styles);
  return (
    <div className={cx("container")} onClick={props.onClick}>
      <div className={cx("container-loaninfo")}>
        <div className={cx("container-txt-loaninfo")}>
          <Image className={cx("img-loaninfo")} imageInfo={IMAGES?.LoanBankDummyIcon} />

          <Spacing size={4} />
          <Typography className={cx("txt-loaninfo")}>신한은행 전세자금 대출전세자금 대출</Typography>
          <Typography className={cx("txt-loaninfo")}>– 전세자금대출 금리우대형</Typography>
        </div>
        <div className={cx("container-loaninfo-money")}>
          <Typography className={cx("txt-percent")}>6.8%</Typography>
          <Typography className={cx("txt-loaninfo")}>3억8천만원</Typography>
        </div>
      </div>
    </div>
  );
};

export default LoanCard;
