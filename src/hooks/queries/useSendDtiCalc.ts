import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { sendDtiCalc } from "@/api/remotes";
import { sendDtiCalcRequest, DtiCalculationResult } from "@/models";

export const useSendDtiCalc = (scrollCallback: () => void) => {
  const [infoItem, setInfoItem] = useState<DtiCalculationResult>();

  const { mutate: DtiCalcInfo } = useMutation<DtiCalculationResult, Error, sendDtiCalcRequest>({
    mutationFn: sendDtiCalc,
    onSuccess: (response) => {
      setInfoItem(response);
      scrollCallback();
    },
    onError: (error) => {
      setInfoItem({
        dtiRatio: 0,
        annualIncome: 0,
        annualRepaymentAmount: 0,
        annualRepaymentPrincipal: 0,
        annualRepaymentInterest: 0,
        yearlyLoanInterestRepayment: 0,
      });
      console.error(" 생성 실패:", error);
    },
  });

  return { DtiCalcInfo, infoItem };
};
