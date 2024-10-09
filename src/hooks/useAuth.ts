import { useState, useEffect } from "react";

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
  const [auth, setAuth] = useState(false);
  const accessToken = getCookie("accessToken");

  useEffect(() => {
    if (accessToken) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, []);

  return { auth };
};
