import Spacing from "@/components/shared/Spacing";
import classNames from "classnames/bind";
import style from "./LoanTypeInput.module.scss";
import { useNavigate } from "react-router-dom";

export const LoanTypeInput = () => {
  const cx = classNames.bind(style);
  const navigate = useNavigate();
  return (
    <div className={cx("container")}>
      <div className={cx("title")}>대출유형</div>
      <Spacing size={16} />
      <div className={cx("inputContainer")}>
        <button
          className={cx("button")}
          onClick={() => {
            navigate("/calculator/dsrLoanAddPage");
          }}>
          + 대출을 추가해주세요
        </button>
      </div>
    </div>
  );
};
