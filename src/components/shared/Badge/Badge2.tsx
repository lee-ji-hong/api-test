import React from "react";
import classNames from "classnames/bind";
import styles from "./Badge2.module.scss";

const cx = classNames.bind(styles);

interface BadgeProps {
  className?: string;
  title: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Badge2 = ({ className, title, onClick }: BadgeProps) => {
  return (
    <button className={cx(["container", className])} onClick={onClick}>
      {title}
    </button>
  );
};
export default Badge2;
