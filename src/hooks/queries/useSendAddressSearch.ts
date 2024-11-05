import { useInfiniteQuery } from "@tanstack/react-query";
import { sendaddressSearch } from "@/api/remotes";
import { sendaddressSearchRequest } from "@/models";

export const useSendAddressSearch = (keyword: sendaddressSearchRequest, enabled: boolean) => {
  const addressInfiniteQuery = useInfiniteQuery({
    queryKey: ["addressList", keyword],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await sendaddressSearch(pageParam, keyword);
      return {
        ...response,
        currentPage: pageParam,
        totalPage: 10, // 예시: 총 페이지 수를 고정값이나 조건으로 설정
      };
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage < lastPage.totalPage) {
        return lastPage.currentPage + 1;
      } else {
        return undefined;
      }
    },
    retry: 0,
    enabled,
  });

  return addressInfiniteQuery;
};
