import { useRecoilValue } from "recoil";

import Spacing from "@/components/shared/Spacing";
import Text from "@/components/shared/Text";
import Badge from "@/components/shared/Badge";
import { periodState } from "@/recoil/atoms";

import classNames from "classnames/bind";
import styles from "./Section02.module.scss";
const cx = classNames.bind(styles);

const Section02 = ({
  children,
  className,
  title,
  isPeriodBadge = false,

  onClick,
}: {
  children?: React.ReactNode;
  className?: string;
  title?: string;
  isPeriodBadge?: boolean;

  onClick?: (item: string) => void;
}) => {
  const selectedBadge = useRecoilValue(periodState);

  return (
    <section className={cx(["container", className])}>
      <Spacing size={40} />
      <div className={cx({ "title-wrap": isPeriodBadge })}>
        {title != null ? <Text className={cx("text")} text={title} /> : null}
        {isPeriodBadge && (
          <div className={cx("badge-container")}>
            {["년", "월"].map((label) => (
              <Badge
                key={label}
                className={cx("button")}
                title={label}
                onClick={() => onClick && onClick(label)}
                theme={selectedBadge === label ? "blue" : "primary"}
              />
            ))}
          </div>
        )}
      </div>
      <Spacing size={16} />
      {children}
    </section>
  );
};

export default Section02;
