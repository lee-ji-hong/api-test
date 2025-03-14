import { useMutation } from "@tanstack/react-query";
import { sendLoanAdvicePreTerms } from "@/api/remotes";
import { BaseLoanProduct, sendLoanAdvicePreRequest } from "@/models";
import { useState } from "react";

export const useSendLoanAdvicePreTerms = () => {
  const [infoItem, setInfoItem] = useState<BaseLoanProduct>();

  const { mutate: loanAdvicPreReport } = useMutation<BaseLoanProduct, Error, sendLoanAdvicePreRequest>({
    mutationFn: (requestBody) => {
      return sendLoanAdvicePreTerms(requestBody);
    },
    onSuccess: (response) => {
      setInfoItem(response);
    },
    retry: 0,
    onError: (error) => {
      console.error(" 생성 실패:", error);
      console.log(error);
    },
  });

  return { loanAdvicPreReport, infoItem };
};
