import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getLoanAdvice } from "@/api/remotes";
import { DepositLists } from "@/models";
import { useAuth } from "@/hooks/useAuth";

export const useGetLoanAdvice = () => {
  const { auth } = useAuth();

  const { data: loanAdviceInfo, isLoading: isGetLoanAdviceLoading } = useQuery<DepositLists[], AxiosError>({
    queryKey: ["communityDetail"],
    queryFn: () => getLoanAdvice(),
    retry: 0,
    enabled: !!auth,
  });

  return { loanAdviceInfo, isGetLoanAdviceLoading };
};
