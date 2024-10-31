import Spacing from "@/components/shared/Spacing";
import Text from "@/components/shared/Text";

import classNames from "classnames/bind";
import styles from "./ResultInfo.module.scss";
const cx = classNames.bind(styles);

interface Contents {
  title: string;
  ment: string;
  description: string;
  details: Record<string, string | number>;
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
  const getLabelForKey = (key: string) => {
    switch (key) {
      case "loanPurpose":
        return "대출 목적";
      case "houseOwnershipType":
        return "보유주택 수";
      case "regionType":
        return "지역";
      case "collateralValue":
        return "담보대출금액";
      default:
        return key;
    }
  };
  return (
    <section className={cx(["container", className])}>
      <Text className={cx("text")} text={contents.title} />
      <Text className={cx("text")} text={contents.ment} />
      <Spacing size={10} />
      <Text className={cx("text-sub")} text={contents.description} />
      <Spacing size={20} />

      <div className={cx("box")}>
        {Object.entries(contents?.details).map(([key, value]) => (
          <div className={cx("box-txt-container")} key={key}>
            <Text className={cx("box-txt-left")} text={getLabelForKey(key)} />
            <Text className={cx("box-txt-right")} text={String(value)} />
          </div>
        ))}
        {children}
      </div>
    </section>
  );
};

export default ResultInfo;
