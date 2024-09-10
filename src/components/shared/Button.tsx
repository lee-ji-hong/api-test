import React from "react";
import { GlobalPortal } from "@/components/shared/GlobalPortal";

import classNames from "classnames/bind";
import styles from "./Button.module.scss";

const cx = classNames.bind(styles);

interface ButtonProps {
  className?: string;
  title: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  bottom?: number;
}

const Button = ({ className, title, onClick, disabled, bottom = 0 }: ButtonProps) => {
  return (
    <GlobalPortal.Consumer>
      <div className={cx(["button-wrap", className])} style={{ bottom: `${bottom}px` }}>
        <button className={cx("container")} onClick={onClick} disabled={disabled}>
          {title}
        </button>
      </div>
    </GlobalPortal.Consumer>
  );
};
export default Button;
