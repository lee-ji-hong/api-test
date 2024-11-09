import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { sendRepaymentCalc } from "@/api/remotes";
import { RepaymentCalculationResult, sendRepaymentCalcRequest } from "@/models";
import { useNavigate } from "react-router-dom";

export const useSendRepaymentCalc = () => {
  const navigate = useNavigate();
  const [infoItem, setInfoItem] = useState<RepaymentCalculationResult>();

  const { mutate: RepaymentCalcInfo } = useMutation<RepaymentCalculationResult, Error, sendRepaymentCalcRequest>({
    mutationFn: sendRepaymentCalc,
    onSuccess: (response) => {
      setInfoItem(response);

      // router를 활용하여 특정페이지로 이동하기
      navigate("/calculator/repaymentDetails", { state: { response } });
    },
    onError: (error) => {
      // setInfoItem({
      //   // repaymentType: "",
      //   // principal: 0,
      //   // term: 0,
      //   // gracePeriod: 0,
      //   // interestRatePercentage: 0,
      //   // maturityPaymentAmount: 0,
      // });
      console.error(" 생성 실패:", error);
    },
  });

  return { RepaymentCalcInfo, infoItem };
};
