import { reqLogin } from "@/api/remotes";

const LoginPage = () => {
  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={reqLogin}>카카오 로그인 테스트</button>
    </div>
  );
};

export default LoginPage;
