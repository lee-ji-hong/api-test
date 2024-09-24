import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getCommunityDetail } from "@/api/remotes";
import { CommunityDetail } from "@/models";

export const useGetCommunityDetail = (postId: number) => {
  const { data: communityDetail, isLoading: isCommunityDetailLoading } = useQuery<CommunityDetail, AxiosError>({
    queryKey: ["communityDetail", postId],
    queryFn: () => getCommunityDetail({ postId }),
    retry: 0,
  });

  return { communityDetail, isCommunityDetailLoading };
};
