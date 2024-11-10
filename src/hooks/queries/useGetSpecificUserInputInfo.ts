import { getSpecificUserInputInfo } from "@/api/remotes";
import { useQuery } from "@tanstack/react-query";
import { UserInputInfo } from "@/models";
import { AxiosError } from "axios";

export const useGetSpecificUserInputInfo = (param: number, isRecent: boolean) => {
  const {
    data: info,
    isLoading: isGetUserInputInfoLoading,
    error,
  } = useQuery<UserInputInfo, AxiosError>({
    queryKey: ["specificUserInputInfo", param],
    queryFn: async () => {
      return await getSpecificUserInputInfo(param);
    },
    retry: 0,
    enabled: isRecent && param !== undefined,
  });

  return { info, isGetUserInputInfoLoading, error };
};
