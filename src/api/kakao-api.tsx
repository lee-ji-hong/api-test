const baseUrl = import.meta.env.VITE_BASE_URL;
const reqLogin = () => {
  window.location.href = `${baseUrl}/oauth2/authorization/kakao`;
};

export { reqLogin };
