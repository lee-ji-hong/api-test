import classNames from "classnames/bind";
import styles from "./Text.module.scss";

const cx = classNames.bind(styles);

interface ImageProps {
  text?: string;
  className?: string;
}

const Text = ({ text, className }: ImageProps) => {
  const titleParts = text ? text.split("/n") : [];

  return (
    <div className={cx(["container", className])}>
      {titleParts.map((part, index) => (
        <span key={index}>{part}</span>
      ))}
    </div>
  );
};

export default Text;
