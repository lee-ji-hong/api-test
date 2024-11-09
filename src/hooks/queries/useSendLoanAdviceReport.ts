import { useMutation } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { sendLoanAdviceReportWithTempUser, sendLoanAdviceReport } from "@/api/remotes";
import { LoanAdviceReportResponse, sendLoanAdviceReportRequest } from "@/models";
import { useInternalRouter } from "@/hooks/useInternalRouter";
import { LOGIN_REDIRECT } from "@/constants/loginLanding";
import { setLoginRedirectPath } from "@/utils/localStorage";
import { loginState } from "@/recoil/atoms";
import { useAuth } from "@/hooks/useAuth";

export const useSendLoanAdviceReport = () => {
  const [, setIsLoginNeed] = useRecoilState(loginState);
  const uuid = localStorage.getItem("tempUserId");
  const router = useInternalRouter();
  const { auth } = useAuth();

  const { mutate: loanAdviceReport } = useMutation<LoanAdviceReportResponse, Error, sendLoanAdviceReportRequest>({
    mutationFn: (requestBody) => {
      if (!uuid) {
        return sendLoanAdviceReportWithTempUser(requestBody);
      } else {
        if (auth) {
          return sendLoanAdviceReport(requestBody);
        } else {
          setIsLoginNeed(true);
          return Promise.reject(new Error("로그인이 필요합니다."));
        }
      }
    },
    onSuccess: (data) => {
      if (data.status === "NO_CONTENT") {
        router.push(`/no-report`, { reportData: data });
      } else {
        router.push(`/report`, { reportData: data, isRecent: false });
      }
    },
    retry: 0,
    onError: (error) => {
      console.error(" 생성 실패:", error);
      console.log(error);
      // const statusCode = error?.response?.status;
      setLoginRedirectPath(LOGIN_REDIRECT.get("REPORT_RESULT"));
    },
  });

  return { loanAdviceReport };
};
