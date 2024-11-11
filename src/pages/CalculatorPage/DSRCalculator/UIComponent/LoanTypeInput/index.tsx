import Spacing from "@/components/shared/Spacing";
import classNames from "classnames/bind";
import style from "./LoanTypeInput.module.scss";
import { useNavigate } from "react-router-dom";
import { arrDSRDatasState } from "@/recoil/atoms";
import { useRecoilValue } from "recoil";
import { LoanItem } from "./LoanItem";
import { DSRResultInfo } from "./DSRResultInfo";
import Button from "@/components/shared/Button";

export const LoanTypeInput = () => {
  const cx = classNames.bind(style);
  const navigate = useNavigate();

  const arrDSRDatas = useRecoilValue(arrDSRDatasState); // Recoil 상태 가져오기
  console.log("arrDSRDa1231222223tas", arrDSRDatas);
  return (
    <div className={cx("container")}>
      <div className={cx("title")}>대출유형</div>
      <Spacing size={16} />
      <div className={cx("inputContainer")}>
        <div>
          {arrDSRDatas.map((item, index) => {
            console.log("item", item);
            console.log("index", index);
            return <LoanItem key={index} data={item} />;
          })}
        </div>
        <Spacing size={16} />
        <button
          className={cx("button")}
          onClick={() => {
            navigate("/calculator/dsrLoanAddPage");
          }}>
          + 대출을 추가해주세요
        </button>
        <div className={cx("button-wrap")}>
          <Button
            className={cx("button")}
            title="초기화"
            type="button"
            // disabled={isSubmitting}
            theme="light"
            // onClick={handleReset}
          />
          <Button
            className={cx("button")}
            title="초기화"
            type="button"
            // disabled={isSubmitting}
            theme="light"
            // onClick={handleReset}
          />
        </div>
        <Spacing size={100} />
        <DSRResultInfo />

        <Spacing size={160} />
      </div>
    </div>
  );
};
