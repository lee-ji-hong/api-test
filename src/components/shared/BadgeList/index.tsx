import Badge from "@/components/shared/Badge";
import classNames from "classnames/bind";
import styles from "./BadgeList.module.scss";

const cx = classNames.bind(styles);

interface BadgeItem {
  label: string;
  value: number;
}

interface BadgeProps {
  className?: string;
  list: BadgeItem[];
  onClick?: (value: string) => void;
  theme?: "primary" | "dark" | "grey" | "white";
}

const BadgeList = ({ list, className, theme = "primary", onClick }: BadgeProps) => {
  const handleClick = (value: string) => {
    if (onClick) {
      onClick(value);
    }
  };
  return (
    <div className={cx(["container", className])}>
      {list.map((item, index) => (
        <Badge key={index} title={item?.label} onClick={() => handleClick(item?.label)} theme={theme} />
      ))}
    </div>
  );
};
export default BadgeList;
