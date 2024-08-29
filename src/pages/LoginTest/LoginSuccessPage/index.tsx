const LoginSuccessPage = () => {
  const token = getTokens();
  return (
    <div>
      <h1>로그인 리다이렉션 결과</h1>
      <h2>{token.accessToken}</h2>
      <h2>{token.refreshToken}</h2>
    </div>
  );
};

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
