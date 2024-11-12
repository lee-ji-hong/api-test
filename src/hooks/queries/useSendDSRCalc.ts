import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { sendDSRCalc } from "@/api/remotes";
import { DSRCalculationResult, sendDSRCalcRequest } from "@/models";

export const useSendDSRCalc = () => {
  const [infoItem, setInfoItem] = useState<DSRCalculationResult>();

  const { mutate: DSRCalcInfo } = useMutation<DSRCalculationResult, Error, sendDSRCalcRequest>({
    mutationFn: sendDSRCalc,
    onSuccess: (response) => {
      setInfoItem(response);
    },
    onError: (error) => {
      // setInfoItem({
      //   dtiRatio: 0.35,
      //   annualIncome: 100000000,
      //   annualRepaymentAmount: 21000000,
      //   annualRepaymentPrincipal: 10500000,
      //   annualRepaymentInterest: 10500000,
      //   yearlyLoanInterestRepayment: 10500000,
      // });
      console.error(" 생성 실패:", error);
    },
  });

  // infoItem 초기화 함수 추가
  const resetInfoItem = () => {
    setInfoItem(undefined); // infoItem을 초기값으로 초기화
  };

  return { DSRCalcInfo, infoItem, resetInfoItem };
};
