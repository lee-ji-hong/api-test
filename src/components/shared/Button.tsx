import React from "react";
import { GlobalPortal } from "@/components/shared/GlobalPortal";

import classNames from "classnames/bind";
import styles from "./Button.module.scss";

const cx = classNames.bind(styles);
export type ButtonType = "button" | "submit" | "reset";
interface ButtonProps {
  className?: string;
  type?: ButtonType;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  usePortal?: boolean;
  disabled?: boolean;
  title?: string;
  bottom?: number;
}

const Button = ({
  className,
  title,
  onClick,
  disabled,
  bottom = 0,
  type = "button",
  usePortal = false,
}: ButtonProps) => {
  const buttonContent = (
    <div className={cx([className])} style={{ bottom: `${bottom}px` }}>
      <button className={cx("container")} onClick={onClick} disabled={disabled} type={type}>
        {title}
      </button>
    </div>
  );

  return usePortal ? <GlobalPortal.Consumer>{buttonContent}</GlobalPortal.Consumer> : buttonContent;
};
export default Button;
