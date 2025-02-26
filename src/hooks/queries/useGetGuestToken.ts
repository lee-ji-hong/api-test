import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getGuestToken } from "@/api/remotes";
import { GuestTokenResponse } from "@/models";
// import { useAuth } from "@/hooks/useAuth";

export const useGetGuestToken = () => {
  // const { auth } = useAuth();

  const { data: guestToken, isLoading: isGetGuestTokenLoading } = useQuery<GuestTokenResponse, AxiosError>({
    queryKey: ["guestToken"],
    queryFn: () => getGuestToken(),
    retry: 0,
    // enabled: !!auth,
  });

  return { guestToken, isGetGuestTokenLoading };
};
