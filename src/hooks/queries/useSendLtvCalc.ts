import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { sendLtvCalc } from "@/api/remotes";
import { sendLtvCalcRequest, LtvCalculationResult } from "@/models";

export const useSendLtvCalc = () => {
  const [infoItem, setInfoItem] = useState<LtvCalculationResult>();

  const { mutate: LtvCalcInfo } = useMutation<LtvCalculationResult, Error, sendLtvCalcRequest>({
    mutationFn: sendLtvCalc,
    onSuccess: (response) => {
      setInfoItem(response);
    },
    onError: (error) => {
      setInfoItem({
        ltvRatio: 0.6,
        collateralValue: 500000000,
        possibleLoanAmount: 300000000,
      });
      console.error(" 생성 실패:", error);
    },
  });

  return { LtvCalcInfo, infoItem };
};
