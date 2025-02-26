import { useMutation } from "@tanstack/react-query";
import { sendLoanAdviceReport } from "@/api/remotes";
import { SpecificLoanAdviceResponse, sendLoanAdviceReportRequest } from "@/models";
import { useInternalRouter } from "@/hooks/useInternalRouter";

export const useSendLoanAdviceReport = () => {
  const router = useInternalRouter();

  const { mutate: loanAdviceReport } = useMutation<SpecificLoanAdviceResponse, Error, sendLoanAdviceReportRequest>({
    mutationFn: (requestBody) => {
      return sendLoanAdviceReport(requestBody);
    },
    onSuccess: (data) => {
      if (data.status === "NO_CONTENT") {
        router.push(`/no-report/${data.data.userInputInfoId}`, { reportData: data });
      } else {
        router.push(`/report/${data.data.userInputInfoId}`, { reportData: data, isRecent: false });
      }
    },
    retry: 0,
    onError: (error) => {
      console.error(" 생성 실패:", error);
      console.log(error);
    },
  });

  return { loanAdviceReport };
};
