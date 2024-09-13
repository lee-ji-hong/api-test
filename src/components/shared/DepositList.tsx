import classNames from "classnames/bind";
import styles from "./DepositList.module.scss";
const cx = classNames.bind(styles);

interface Item {
  name: string;
  rate: number;
  money: string;
}

interface ListProps {
  className?: string;
  list?: Item[];
}

export const DepositList = ({ list, className }: ListProps) => {
  return (
    <div className={cx(["container", className])}>
      {list?.map((item, index) => (
        <div key={index} className={cx("item")}>
          <div className={cx("info")}>
            <div className={cx("logo")}>
              <img src="/path/to/logo.png" alt="logo" className={cx("logo-img")} /> {/* 로고 이미지 */}
            </div>
            <div>
              <span className={cx("name")}>{item.name}</span>
            </div>
          </div>
          <div className={cx("details")}>
            <span className={cx("rate")}>{item.rate}%</span>
            <span className={cx("money")}>{item.money}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
export default DepositList;
