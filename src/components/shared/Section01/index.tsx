import Spacing from "@/components/shared/Spacing";
import Text from "@/components/shared/Text";

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
  return (
    <section className={cx(["container", className])}>
      {title != null ? (
        <>
          <Spacing size={126} />
          <Text className={cx("text")} text={title} />{" "}
        </>
      ) : null}
      {children}
    </section>
  );
};

export default Section01;
