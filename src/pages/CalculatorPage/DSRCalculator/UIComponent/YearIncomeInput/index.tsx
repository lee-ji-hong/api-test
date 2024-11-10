import classNames from "classnames/bind";
import styles from "./YearIncomeInput.module.scss";
import Spacing from "@/components/shared/Spacing";
import Badge from "@/components/shared/Badge";
import SpacingWidth from "@/components/shared/SpacingWidth";

export const YearIncomeInput = () => {
  const cx = classNames.bind(styles);

  return (
    <div className={cx("container")}>
      <div className={cx("title")}>연소득</div>
      <Spacing size={16} />
      <div className={cx("inputContainer")}>
        <input type="text" className={cx("input")} placeholder="0" />
        <span className={cx("unit")}>만원</span>
      </div>
      <div className={cx("subInput")}>1억 5천만원</div>
      <div className={cx("buttonContainer")}>
        <Badge className={cx("button")} key={""} title={"+100만"} onClick={() => {}} />
        <SpacingWidth size={8} />
        <Badge className={cx("button")} key={""} title={"+1000만"} onClick={() => {}} />
        <SpacingWidth size={8} />
        <Badge className={cx("button")} key={""} title={"+1억"} onClick={() => {}} />
      </div>
    </div>
  );
};
