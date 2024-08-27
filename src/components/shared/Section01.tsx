import classNames from "classnames/bind";
import styles from "./Section01.module.scss";

const cx = classNames.bind(styles);

const Section01 = ({
  children,
  className,
  title,
}: {
  children?: React.ReactNode;
  className?: string;
  title?: string;
}) => {
  const titleParts = title ? title.split("/n") : [];

  console.log(titleParts);
  return (
    <section className={cx(["container", className])}>
      {title != null ? (
        <div className={cx("txt-title-wrap")}>
          {titleParts.map((part, index) => (
            <span key={index}>{part}</span>
          ))}
        </div>
      ) : null}
      {children}
    </section>
  );
};

export default Section01;
