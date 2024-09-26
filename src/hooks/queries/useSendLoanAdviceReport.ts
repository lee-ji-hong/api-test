import { useMutation } from "@tanstack/react-query";
import { useInternalRouter } from "@/hooks/useInternalRouter";
import { sendLoanAdviceReport } from "@/api/remotes";
import { LoanAdviceReport, sendLoanAdviceReportRequest } from "@/models";

export const useSendLoanAdviceReport = () => {
  const router = useInternalRouter();

  const { mutate: loanAdviceReport } = useMutation<LoanAdviceReport, Error, sendLoanAdviceReportRequest>({
    mutationFn: sendLoanAdviceReport,
    onSuccess: (data) => {
      console.log(data);
      router.push(`/report`, { state: { reportData: data } });
    },
    onError: (error) => {
      console.error(" 생성 실패:", error);
    },
  });

  return { loanAdviceReport };
};
