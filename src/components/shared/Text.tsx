import React from "react";
import classNames from "classnames/bind";
import styles from "./Text.module.scss";

const cx = classNames.bind(styles);

interface TextProps {
  text?: string | number;
  className?: string;
  highlight?: string;
  style?: React.CSSProperties;
}

const Text = ({ text, className, style, highlight }: TextProps) => {
  const titleParts = text ? String(text).split("/n") : [];

  return (
    <div className={cx(["container", className])} style={style}>
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
