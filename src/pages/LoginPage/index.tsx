import { reqLogin } from "@/api/remotes";
import { useLogEvent } from "@/utils/firebaseLogEvent";
import { useEffect } from "react";

const LoginPage = () => {
  const logEvent = useLogEvent();

  useEffect(() => {
    logEvent("HomePage", {
      page_title: "./HomePage",
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
  }, []);
  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={reqLogin}>카카오 로그인 테스트</button>
    </div>
  );
};

export default LoginPage;
