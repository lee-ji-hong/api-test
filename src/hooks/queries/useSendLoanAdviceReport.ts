import { useMutation } from "@tanstack/react-query";
import { useInternalRouter } from "@/hooks/useInternalRouter";
import { sendLoanAdviceReportWithTempUser, sendLoanAdviceReport } from "@/api/remotes";
import { LoanAdviceReportResponse, sendLoanAdviceReportRequest } from "@/models";
import { LOGIN_REDIRECT } from "@/constants/loginLanding";
import { setLoginRedirectPath } from "@/utils/localStorage";

export const useSendLoanAdviceReport = () => {
  let uuid = localStorage.getItem("tempUserId");
  const router = useInternalRouter();

  const { mutate: loanAdviceReport } = useMutation<LoanAdviceReportResponse, Error, sendLoanAdviceReportRequest>({
    mutationFn: (requestBody) => {
      if (!uuid) {
        return sendLoanAdviceReportWithTempUser(requestBody);
      } else {
        return sendLoanAdviceReport(requestBody);
      }
    },
    onSuccess: (data) => {
      if (data.status === "NO_CONTENT") {
        router.push(`/no-report`, { reportData: data });
      } else {
        router.push(`/report`, { reportData: data });
      }
    },
    retry: 0,
    onError: (error) => {
      console.error(" 생성 실패:", error);
      // router.push(`/deposit-result`);
      setLoginRedirectPath(LOGIN_REDIRECT.get("REPORT_RESULT"));
    },
  });

  return { loanAdviceReport };
};
