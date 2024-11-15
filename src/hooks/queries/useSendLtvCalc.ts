import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { sendLtvCalc } from "@/api/remotes";
import { sendLtvCalcRequest, LtvCalculationResult } from "@/models";

export const useSendLtvCalc = (scrollToResult: () => void) => {
  const [infoItem, setInfoItem] = useState<LtvCalculationResult>();

  const { mutate: LtvCalcInfo } = useMutation<LtvCalculationResult, Error, sendLtvCalcRequest>({
    mutationFn: sendLtvCalc,
    onSuccess: (response) => {
      setInfoItem(response);
      scrollToResult();
    },
    onError: (error) => {
      setInfoItem({
        ltvRatio: 0.0,
        collateralValue: 0,
        possibleLoanAmount: 0,
      });
      console.error(" 생성 실패:", error);
    },
  });

  return { LtvCalcInfo, infoItem };
};
