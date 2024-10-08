import { useMutation } from "@tanstack/react-query";
import { useInternalRouter } from "@/hooks/useInternalRouter";
import { sendLogout } from "@/api/remotes";

export const useSendLogout = () => {
  const router = useInternalRouter();
  const deleteCookie = (name: string): void => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`; // 쿠키 삭제
  };

  const { mutate: Logout } = useMutation<void, Error>({
    mutationFn: sendLogout,
    onSuccess: () => {
      deleteCookie("accessToken");
      deleteCookie("refreshToken");
      alert("로그아웃 되었습니다. 다음에 또 만나요 😜");
      router.push("/");
    },
    onError: (error) => {
      console.error(" 생성 실패:", error);
      alert("로그아웃 처리 중 오류가 발생했습니다. 다시 시도해주세요.");
    },
  });

  return { Logout };
};
