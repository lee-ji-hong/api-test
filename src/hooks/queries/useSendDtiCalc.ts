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
        dtiRatio: 0.35,
        annualIncome: 100000000,
        annualRepaymentAmount: 21000000,
        annualRepaymentPrincipal: 10500000,
        annualRepaymentInterest: 10500000,
        yearlyLoanInterestRepayment: 10500000,
      });
      console.error(" 생성 실패:", error);
    },
  });

  return { DtiCalcInfo, infoItem };
};
