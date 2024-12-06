import { useMutation } from "@tanstack/react-query";
import { sendLoanAdviceReportWithTempUser, sendLoanAdviceReport } from "@/api/remotes";
import { SpecificLoanAdviceResponse, sendLoanAdviceReportRequest } from "@/models";
import { useInternalRouter } from "@/hooks/useInternalRouter";

export const useSendLoanAdviceReport = () => {
  const uuid = localStorage.getItem("tempUserId");
  const router = useInternalRouter();

  const { mutate: loanAdviceReport } = useMutation<SpecificLoanAdviceResponse, Error, sendLoanAdviceReportRequest>({
    mutationFn: (requestBody) => {
      if (!uuid) {
        return sendLoanAdviceReportWithTempUser(requestBody);
      } else {
        return sendLoanAdviceReport(requestBody);
      }
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
