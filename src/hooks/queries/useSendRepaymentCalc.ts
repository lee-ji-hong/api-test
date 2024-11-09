import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { sendRepaymentCalc } from "@/api/remotes";
import { RepaymentCalculationResult, sendRepaymentCalcRequest } from "@/models";

export const useSendRepaymentCalc = () => {
  const [infoItem, setInfoItem] = useState<RepaymentCalculationResult>();

  const { mutate: RepaymentCalcInfo } = useMutation<RepaymentCalculationResult, Error, sendRepaymentCalcRequest>({
    mutationFn: sendRepaymentCalc,
    onSuccess: (response) => {
      setInfoItem(response);
    },
    onError: (error) => {
      setInfoItem({
        repaymentType: "",
        principal: 0,
        term: 0,
        gracePeriod: 0,
        interestRatePercentage: 0,
        maturityPaymentAmount: 0,
      });
      console.error(" 생성 실패:", error);
    },
  });

  return { RepaymentCalcInfo, infoItem };
};
