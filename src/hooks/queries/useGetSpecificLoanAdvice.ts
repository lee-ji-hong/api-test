import { getSpecificLoanAdvice } from "@/api/remotes";
import { useQuery } from "@tanstack/react-query";
import { LoanAdviceReport } from "@/models";
import { useAuth } from "@/hooks/useAuth";
import { AxiosError } from "axios";

export const useGetSpecificLoanAdvice = (param: number) => {
  const { auth } = useAuth();

  const {
    data: specificLoanAdvice,
    isLoading: isGetLoanAdviceLoading,
    error,
  } = useQuery<LoanAdviceReport, AxiosError>({
    queryKey: ["SpecificLoanAdviceInfo", param],
    queryFn: async () => {
      return await getSpecificLoanAdvice(param);
    },
    retry: 0,
    enabled: !!auth && param !== undefined && param !== 0,
  });

  return { specificLoanAdvice, isGetLoanAdviceLoading, error };
};
