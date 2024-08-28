import classNames from "classnames/bind";
import styles from "./Text.module.scss";

const cx = classNames.bind(styles);

interface TextProps {
  text?: string;
  className?: string;
  highlight?: string;
}

const Text = ({ text, className, highlight }: TextProps) => {
  const titleParts = text ? text.split("/n") : [];

  return (
    <div className={cx(["container", className])}>
      {titleParts.map((part, index) => (
        <p key={index}>
          {highlight && part.includes(highlight) ? (
            <>
              {part.split(highlight)[0]}
              <span className={cx("highlight")}>{highlight}</span>
              {part.split(highlight)[1]}
            </>
          ) : (
            part
          )}
        </p>
      ))}
    </div>
  );
};

export default Text;
