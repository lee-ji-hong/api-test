import Spacing from "@/components/shared/Spacing";
import Text from "@/components/shared/Text";

import classNames from "classnames/bind";
import styles from "./ResultInfo.module.scss";
const cx = classNames.bind(styles);

interface Contents {
  title: string;
  ment: string;
  description: string;
}
const ResultInfo = ({
  contents,
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
  contents: Contents;
}) => {
  return (
    <section className={cx(["container", className])}>
      <Text className={cx("text")} text={contents.title} />
      <Text className={cx("text")} text={contents.ment} />
      <Spacing size={10} />
      <Text className={cx("text-sub")} text={contents.description} />
      <Spacing size={20} />
      <div className={cx("box")}>{children}</div>
      <Spacing size={400} />
    </section>
  );
};

export default ResultInfo;
