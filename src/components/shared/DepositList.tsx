import Image from "@/components/shared/Image";
import { IMAGES } from "@/constants/images";
import Spacing from "@/components/shared/Spacing";
import Text from "@/components/shared/Text";

import classNames from "classnames/bind";
import styles from "./DepositList.module.scss";
const cx = classNames.bind(styles);

type ColorType = "white" | "grey";
interface Item {
  name: string;
  rate: number;
  money: string;
}
interface ListProps {
  className?: string;
  list?: Item[];
  color?: ColorType;
}

export const DepositList = ({ list, className, color }: ListProps) => {
  return (
    <div className={cx(["container", className])}>
      {list?.map((item, index) => (
        <div key={index} className={cx(["container-loaninfo", color])}>
          <div className={cx("container-txt-loaninfo")}>
            <Image className={cx("img-loaninfo")} imageInfo={IMAGES?.LoanBankDummyIcon} />
            <Spacing size={4} />
            <Text className={cx("txt-loaninfo")} text={item.name} />
          </div>
          <div className={cx("container-loaninfo-money")}>
            <span className={cx("txt-percent")}>{item.rate}%</span>
            <span className={cx("txt-loaninfo")}>{item.money}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
export default DepositList;
