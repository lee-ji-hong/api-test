import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { authState } from "@/recoil/atoms";

const getCookie = (name: string): string | null => {
  const cookieArr = document.cookie.split("; ");
  for (const cookie of cookieArr) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
};

export const useAuth = () => {
  const [auth, setAuth] = useRecoilState(authState);

  const accessToken = getCookie("accessToken");
  useEffect(() => {
    if (accessToken) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [auth]);

  return { auth };
};
