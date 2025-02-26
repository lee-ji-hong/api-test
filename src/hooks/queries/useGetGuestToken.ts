import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getGuestToken } from "@/api/remotes";
import { GuestToken } from "@/models";

export const useGetGuestToken = () => {
  const { data: guestToken, isLoading: isGetGuestTokenLoading } = useQuery<GuestToken, AxiosError>({
    queryKey: ["guestToken"],
    queryFn: () => getGuestToken(),
    retry: 0,
  });

  return { guestToken, isGetGuestTokenLoading };
};
