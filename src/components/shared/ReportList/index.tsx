import { Collapse } from "@mui/material";

import { formatNumber } from "@/utils/formatters";
import Text from "@/components/shared/Text";
import classNames from "classnames/bind";
import styles from "./ReportList.module.scss";
import { styled } from "@mui/system";
const cx = classNames.bind(styles);

interface ListItem {
  label: string;
  amount: number;
}

interface ListProps {
  className?: string;
  list: ListItem[];
  show?: boolean;
}

const CollapseList = styled(Collapse)({
  "& .MuiCollapse-wrapperInner": {
    display: "grid",
    gap: "10px",
  },
});

const ReportList = ({ list, className, show }: ListProps) => {
  return (
    <div className={cx(["container", className])}>
      {list.slice(0, 3).map((item, index) => (
        <div className={cx("list-item")} key={index}>
          <Text className={cx("list-txt-left")} text={item.label} />
          <Text className={cx("list-txt-right")} text={`${formatNumber(item.amount)} 원` ?? "없음"} />
        </div>
      ))}
      <CollapseList in={show}>
        {list.slice(3).map((item, index) => (
          <div className={cx("list-item")} key={index}>
            <Text className={cx("list-txt-left")} text={item.label} />
            <Text className={cx("list-txt-right")} text={`${formatNumber(item.amount)} 원` ?? "없음"} />
          </div>
        ))}
      </CollapseList>
    </div>
  );
};
export default ReportList;
