import { useMutation } from "@tanstack/react-query";
import { sendLoanAdviceReport } from "@/api/remotes";
import { LoanAdvicePreTermsResponse, sendLoanAdviceReportRequest } from "@/models";
import { useState } from "react";

export const useSendLoanAdvicePreTerms = () => {
  const [infoItem, setInfoItem] = useState<LoanAdvicePreTermsResponse>();

  const { mutate: loanAdvicPreReport } = useMutation<LoanAdvicePreTermsResponse, Error, sendLoanAdviceReportRequest>({
    mutationFn: (requestBody) => {
      return sendLoanAdviceReport(requestBody);
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
