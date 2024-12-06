import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

import { createCommunityDetail } from "@/constants/communityDetailDummy";
import { getAdviceReportData, getCommunityIdAfterLogin, getLoginRedirectPath } from "@/utils/localStorage";
import { formData } from "@/recoil/atoms";
import { sendLoanAdviceReportRequest } from "@/models";
import { useSendLoanAdviceReport } from "@/hooks/queries/useSendLoanAdviceReport";
import { useLogEvent } from "@/utils/firebaseLogEvent";

const LoginSuccessPage = () => {
  const [, setRecoilFormData] = useRecoilState(formData);
  const { loanAdviceReport } = useSendLoanAdviceReport();
  const navigate = useNavigate();
  // const token = getTokens();

  const logEvent = useLogEvent();

  useEffect(() => {
    logEvent("LoginResultPage", {
      page_title: "./LoginPage/LoginResultPage",
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
  }, [logEvent]);

  useEffect(() => {
    const objToken = getTokens();
    if (objToken.accessToken && objToken.refreshToken) {
      setCookie("accessToken", objToken.accessToken);
      setCookie("refreshToken", objToken.refreshToken);

      const savedFormData = localStorage.getItem("formData");
      if (savedFormData) {
        setRecoilFormData(JSON.parse(savedFormData));
      }

      switch (getLoginRedirectPath()) {
        case "/community/detail": {
          navigate(getLoginRedirectPath(), { state: { postId: getCommunityIdAfterLogin() } });
          break;
        }
        case "/community/write": {
          navigate(getLoginRedirectPath(), { state: { communityDetail: createCommunityDetail() } });
          break;
        }
        case "/report": {
          const jsonString = getAdviceReportData();
          const parsedData = JSON.parse(jsonString) as sendLoanAdviceReportRequest;
          loanAdviceReport(parsedData);
          break;
        }
        default: {
          navigate(getLoginRedirectPath());
          break;
        }
      }
    }
  }, [loanAdviceReport, navigate, setRecoilFormData]);

  return <div></div>;
};

// 쿠키 설정 함수
const setCookie = (name: string, value: string): void => {
  document.cookie = `${name}=${value}; path=/`; // 쿠키 저장
};

// 쿠키에서 특정 값을 가져오는 함수
// const getCookie = (name: string): string | null => {
//   const cookieArr = document.cookie.split("; "); // 쿠키를 각각의 key=value 쌍으로 분리
//   console.log("로그인결과페이지" + cookieArr);
//   for (const cookie of cookieArr) {
//     const [cookieName, cookieValue] = cookie.split("=");
//     if (cookieName === name) {
//       return decodeURIComponent(cookieValue); // 쿠키 값이 있으면 반환
//     }
//   }
//   return null; // 쿠키가 없을 경우 null 반환
// };

const getTokens = () => {
  const queryParams = new URLSearchParams(location.search);
  const accessToken = queryParams.get("accessToken");
  const refreshToken = queryParams.get("refreshToken");

  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
};
export default LoginSuccessPage;
