import Badge from "@/components/shared/Badge";
import classNames from "classnames/bind";
import styles from "./BadgeList.module.scss";

const cx = classNames.bind(styles);

interface BadgeProps {
  className?: string;
  list: string[];
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const BadgeList = ({ list, className, onClick }: BadgeProps) => {
  const handleClick = (value: string) => {
    onClick(value);
  };
  return (
    <div className={cx(["container", className])}>
      {list.map((item, index) => (
        <Badge key={index} title={item} onClick={() => handleClick(item)} />
      ))}
    </div>
  );
};
export default BadgeList;
