import styles from "./LoanResult.module.scss";
import classNames from "classnames/bind";
import Text from "@/components/shared/Text";
import { formatNumberWithUnits2 } from "@/utils/formatters";
const cx = classNames.bind(styles);

export const LoanResult = ({ LoanLimit, LoanRate }: { LoanLimit: number; LoanRate: number }) => {
  return (
    <div className={cx("container")}>
      <Box title="예상 최대 한도" value={`${formatNumberWithUnits2(LoanLimit)}`} />
      <div className={cx("vertical-line")}></div>
      <Box title="예상 최저 금리" value={`${LoanRate}%`} />
    </div>
  );
};

function Box({ title, value }: { title: string; value: string }) {
  return (
    <div className={cx("box")}>
      <Text className={cx("title")} text={title} />
      <Text className={cx("value")} text={value} />
    </div>
  );
}
