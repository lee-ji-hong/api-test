import Spacing from "@/components/shared/Spacing";
import Text from "@/components/shared/Text";

import classNames from "classnames/bind";
import styles from "./Section02.module.scss";

const cx = classNames.bind(styles);

const Section02 = ({
  children,
  className,
  title,
}: {
  children?: React.ReactNode;
  className?: string;
  title?: string;
}) => {
  return (
    <section className={cx(["container", className])}>
      {title != null ? (
        <>
          <Spacing size={40} />
          <Text className={cx("text")} text={title} />{" "}
        </>
      ) : null}
      <Spacing size={16} />
      {children}
    </section>
  );
};

export default Section02;
