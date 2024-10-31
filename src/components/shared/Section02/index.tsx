import Spacing from "@/components/shared/Spacing";
import Text from "@/components/shared/Text";
import Badge from "@/components/shared/Badge";

import classNames from "classnames/bind";
import styles from "./Section02.module.scss";

const cx = classNames.bind(styles);

const Section02 = ({
  children,
  className,
  title,
  isPeriodBadge,
}: {
  children?: React.ReactNode;
  className?: string;
  title?: string;
  isPeriodBadge?: boolean;
}) => {
  return (
    <section className={cx(["container", className])}>
      <Spacing size={40} />
      <div className={cx({ "title-wrap": isPeriodBadge })}>
        {title != null ? <Text className={cx("text")} text={title} /> : null}
        {isPeriodBadge && (
          <div className={cx("badge-container")}>
            <Badge
              className={cx("button")}
              title="년"
              // onClick={(e) => handleClick(e, label)}
            />
            <Badge
              className={cx("button")}
              title="월"
              // onClick={(e) => handleClick(e, label)}
            />
          </div>
        )}
      </div>
      <Spacing size={16} />
      {children}
    </section>
  );
};

export default Section02;
