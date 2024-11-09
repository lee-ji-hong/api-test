import { getSpecificUserInputInfo } from "@/api/remotes";
import { useQuery } from "@tanstack/react-query";
import { UserInputInfo } from "@/models";
import { AxiosError } from "axios";

export const useGetSpecificUserInputInfo = (param: number, toggle: boolean) => {
  const {
    data: specificUserInputInfo,
    isLoading: isGetUserInputInfoLoading,
    error,
  } = useQuery<UserInputInfo, AxiosError>({
    queryKey: ["specificUserInputInfo", param],
    queryFn: async () => {
      return await getSpecificUserInputInfo(param);
    },
    retry: 0,
    enabled: toggle && param !== undefined,
  });

  return { specificUserInputInfo, isGetUserInputInfoLoading, error };
};
