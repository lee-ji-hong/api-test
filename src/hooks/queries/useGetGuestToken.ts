import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getGuestToken } from "@/api/remotes";
import { getCookie } from "@/api/authUtils";
import { GuestToken } from "@/models";
export const useGetGuestToken = () => {
  const existingToken = getCookie("guestToken");
  const { data: guestToken, isLoading: isGetGuestTokenLoading } = useQuery<GuestToken, AxiosError>({
    queryKey: ["guestToken"],
    queryFn: () => getGuestToken(),
    retry: 0,
    enabled: !existingToken,
  });

  return { guestToken, isGetGuestTokenLoading };
};
