import React from "react";
import classNames from "classnames/bind";
import styles from "./Badge.module.scss";
const cx = classNames.bind(styles);

interface BadgeProps {
  className?: string;
  title: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  theme?: "primary" | "dark" | "grey" | "white";
}

const Badge = ({ className, title, onClick, theme = "primary" }: BadgeProps) => {
  return (
    <button className={cx(["container", theme, className])} onClick={onClick} type="button">
      {title}
    </button>
  );
};
export default Badge;
