import { createCommunityDetail } from "@/constants/communityDetailDummy";
import { getCommunityIdAfterLogin, getLoginRedirectPath } from "@/utils/localStorage";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginSuccessPage = () => {
  const navigate = useNavigate();
  // const token = getTokens();

  useEffect(() => {
    const objToken = getTokens();
    if (objToken.accessToken && objToken.refreshToken) {
      alert("로그인 성공!");
      alert(`해당 경로로 이동합니다.: ${getLoginRedirectPath()}`);

      setCookie("accessToken", objToken.accessToken);
      setCookie("refreshToken", objToken.refreshToken);

      switch (getLoginRedirectPath()) {
        case "/community/detail":
          navigate(getLoginRedirectPath(), { state: { postId: getCommunityIdAfterLogin() } });
          break;
        case "/community/write":
          navigate("/community/write", { state: { communityDetail: createCommunityDetail() } });
          break;
        default:
          navigate(getLoginRedirectPath());
          break;
      }
    }
  });

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
