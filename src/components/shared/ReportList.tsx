import { Collapse } from "@mui/material";

import Text from "@/components/shared/Text";
import classNames from "classnames/bind";
import styles from "./ReportList.module.scss";

const cx = classNames.bind(styles);

interface ListItem {
  label: string;
  amount: string;
}

interface ListProps {
  className?: string;
  list: ListItem[];
  show?: boolean;
}

const ReportList = ({ list, className, show }: ListProps) => {
  return (
    <div className={cx(["container", className])}>
      {list.slice(0, 3).map((item, index) => (
        <div className={cx("list-item")} key={index}>
          <Text className={cx("list-txt-left")} text={item.label} />
          <Text className={cx("list-txt-right")} text={item.amount} />
        </div>
      ))}
      <Collapse in={show}>
        {list.slice(3).map((item, index) => (
          <div className={cx("list-item")} key={index}>
            <Text className={cx("list-txt-left")} text={item.label} />
            <Text className={cx("list-txt-right")} text={item.amount} />
          </div>
        ))}
      </Collapse>
    </div>
  );
};
export default ReportList;
