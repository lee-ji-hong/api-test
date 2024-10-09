// authUtils.ts

export const getCookie = (name: string): string | null => {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
};

export const setCookie = (name: string, value: string): void => {
  document.cookie = `${name}=${encodeURIComponent(value)};`;
};
