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
import { useRef } from "react";
import { useLayoutEffect } from "react";

export const LoanTypeInput = () => {
  const cx = classNames.bind(style);
  const navigate = useNavigate();

  const arrDSRDatas = useRecoilValue(arrDSRDatasState); // Recoil 상태 가져오기
  const resetArrDSRDatas = useResetRecoilState(arrDSRDatasState); // 상태 초기화 함수

  const annualIncome = useRecoilValue(annualIncomeState);

  const resultRef = useRef<HTMLDivElement>(null);

  const scrollToResult = () => {
    if (resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  const { DSRCalcInfo, infoItem, resetInfoItem } = useSendDSRCalc(scrollToResult);

  useLayoutEffect(() => {
    if (infoItem) scrollToResult();
  }, [infoItem]);

  console.log("arrDSRDatas", arrDSRDatas);
  return (
    <div className={cx("container")}>
      <div className={cx("title")}>대출유형</div>
      <Spacing size={16} />

      <div>
        <div className={cx("inputContainer")}>
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

        {arrDSRDatas.length > 0 && (
          <>
            <Spacing size={50} />
            <div className={cx("buttonWrap")}>
              <Button
                className={cx("buttonItem")}
                title="초기화"
                type="button"
                theme="light"
                onClick={() => {
                  resetArrDSRDatas();
                  resetInfoItem();
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
                    annualIncome: annualIncome * 10000,
                  };

                  DSRCalcInfo(updatedFormData as sendDSRCalcRequest);
                }}
              />
            </div>
          </>
        )}
        {!infoItem && <Spacing size={70} />}

        {infoItem && (
          <>
            <div className={cx("hr")}></div>
            <DSRResultInfo {...infoItem} />
            <Spacing size={70} />
          </>
        )}
      </div>
      <div ref={resultRef}></div>
    </div>
  );
};
