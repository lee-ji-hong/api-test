const reqLogin = () => {
  const kakaoAuthUrl = `http://52.78.180.147:8080/oauth2/authorization/kakao`;
  window.location.href = kakaoAuthUrl;
};

export { reqLogin };
