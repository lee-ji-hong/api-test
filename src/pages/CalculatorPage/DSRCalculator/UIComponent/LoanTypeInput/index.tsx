import Spacing from "@/components/shared/Spacing";
import classNames from "classnames/bind";
import style from "./LoanTypeInput.module.scss";

export const LoanTypeInput = () => {
  const cx = classNames.bind(style);
  return (
    <div className={cx("container")}>
      <div className={cx("title")}>대출유형</div>
      <Spacing size={16} />
      <div className={cx("inputContainer")}>
        <button className={cx("button")}>+ 대출을 추가해주세요</button>
      </div>
    </div>
  );
};
