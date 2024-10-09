import { useMutation } from "@tanstack/react-query";
import { useInternalRouter } from "@/hooks/useInternalRouter";
import { sendLoanAdviceReport } from "@/api/remotes";
import { LoanAdviceReportResponse, sendLoanAdviceReportRequest } from "@/models";

export const useSendLoanAdviceReport = () => {
  const router = useInternalRouter();

  const { mutate: loanAdviceReport } = useMutation<LoanAdviceReportResponse, Error, sendLoanAdviceReportRequest>({
    mutationFn: sendLoanAdviceReport,
    onSuccess: (data) => {
      console.log(data);

      if (data.status === "NO_CONTENT") {
        router.push(`/no-report`, { reportData: data });
      } else {
        router.push(`/report`, { reportData: data });
      }
    },
    onError: (error) => {
      console.error(" 생성 실패:", error);
    },
  });

  return { loanAdviceReport };
};
