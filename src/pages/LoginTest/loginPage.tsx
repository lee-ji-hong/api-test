const LoginPage = () => {
  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleLoginRequest}>카카오 로그인 테스트</button>
    </div>
  );
};

const handleLoginRequest = () => {
  // 현재 페이지의 URL을 사용하거나 다른 동적 URL을 생성
  const redirectUri = encodeURIComponent("https://www.yourwebsite.com/oauth/callback");

  // 카카오 인증 URL을 생성하며, 리다이렉트 URI를 포함시킴
  const kakaoAuthUrl = `http://52.78.180.147:8080/oauth2/authorization/kakao?redirect_uri=${redirectUri}`;

  // 리다이렉트 URL로 이동
  window.location.href = kakaoAuthUrl;
};

// 쿼리 파라미터를 추출하는 함수 (예: "accessToken", "refreshToken" 등)
function getQueryParam(url: string, param: string) {
  const urlParams = new URLSearchParams(new URL(url).search);
  return urlParams.get(param);
}

// 리다이렉트된 후 받은 토큰을 처리
window.onload = function () {
  const accessToken = getQueryParam(window.location.href, "accessToken");
  const refreshToken = getQueryParam(window.location.href, "refreshToken");

  if (accessToken && refreshToken) {
    alert("로그인 성공!");
  } else {
    alert("로그인 실패!");
  }
};
export default LoginPage;
