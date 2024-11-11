import Spacing from "@/components/shared/Spacing";
import classNames from "classnames/bind";
import style from "./LoanTypeInput.module.scss";
import { useNavigate } from "react-router-dom";
import { annualIncomeState, arrDSRDatasState } from "@/recoil/atoms";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { LoanItem } from "./LoanItem";
import { DSRResultInfo } from "./DSRResultInfo";
import Button from "@/components/shared/Button";
import { useSendDSRCalc } from "@/hooks/queries/useSendDSRCalc";
import { sendDSRCalcRequest } from "@/models";

export const LoanTypeInput = () => {
  const cx = classNames.bind(style);
  const navigate = useNavigate();

  const arrDSRDatas = useRecoilValue(arrDSRDatasState); // Recoil 상태 가져오기
  const resetArrDSRDatas = useResetRecoilState(arrDSRDatasState); // 상태 초기화 함수

  const annualIncome = useRecoilValue(annualIncomeState);

  const { DSRCalcInfo, infoItem } = useSendDSRCalc();
  console.log("arrDSRDa1231222223tas", arrDSRDatas);
  console.log("annualIncom22e", annualIncome);
  return (
    <div className={cx("container")}>
      <div className={cx("title")}>대출유형</div>
      <Spacing size={16} />
      <div className={cx("inputContainer")}>
        <div>
          {arrDSRDatas.map((item, index) => {
            console.log("item", item);
            console.log("index", index);
            return <LoanItem {...item} />;
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
        <Spacing size={50} />
        <div className={cx("buttonWrap")}>
          <Button
            className={cx("buttonItem")}
            title="초기화"
            type="button"
            theme="light"
            onClick={() => {
              resetArrDSRDatas();
            }}
          />
          <Button
            className={cx("buttonItem")}
            title="계산하기"
            type="button"
            theme="primary"
            onClick={() => {
              const updatedFormData = {
                loanStatuses: [...arrDSRDatas],
                annualIncome: annualIncome,
              };

              DSRCalcInfo(updatedFormData as sendDSRCalcRequest);
            }}
          />
        </div>
        <Spacing size={100} />

        {infoItem && <DSRResultInfo {...infoItem} />}

        <Spacing size={160} />
      </div>
    </div>
  );
};
