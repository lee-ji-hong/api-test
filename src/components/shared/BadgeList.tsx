import Badge from "@/components/shared/Badge";
import classNames from "classnames/bind";
import styles from "./BadgeList.module.scss";

const cx = classNames.bind(styles);

interface BadgeProps {
  className?: string;
  list: string[];
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const BadgeList = ({ list, className }: BadgeProps) => {
  // string[]로 수정
  return (
    <div className={cx(["container", className])}>
      {list.map((item, index) => (
        <Badge key={index} title={item} />
      ))}
    </div>
  );
};
export default BadgeList;
