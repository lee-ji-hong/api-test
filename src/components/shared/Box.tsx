import classNames from "classnames/bind";
import styles from "./Box.module.scss";

const cx = classNames.bind(styles);

interface BoxProps {
  className?: string;
  children?: React.ReactNode;
}

const Box = ({ className, children }: BoxProps) => {
  return <div className={cx(["container", className])}>{children}</div>;
};

export default Box;
