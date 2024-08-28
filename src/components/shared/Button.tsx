import React from "react";
import classNames from "classnames/bind";
import styles from "./Button.module.scss";

const cx = classNames.bind(styles);

interface ButtonProps {
  className?: string;
  title: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({ className, title, onClick }: ButtonProps) => {
  return (
    <button className={cx(["container", className])} onClick={onClick}>
      {title}
    </button>
  );
};
export default Button;
