import { useMutation } from "@tanstack/react-query";
import { sendSpecificLoanAdvice } from "@/api/remotes";
import { SpecificLoanAdviceResponse, sendSpecificLoanAdviceRequest } from "@/models";
import { useInternalRouter } from "@/hooks/useInternalRouter";

export const useSendSpecificLoanAdvice = () => {
  const router = useInternalRouter();

  const { mutate: specificLoanAdvice } = useMutation<SpecificLoanAdviceResponse, Error, sendSpecificLoanAdviceRequest>({
    mutationFn: async (requestBody) => {
      return await sendSpecificLoanAdvice(requestBody);
    },
    onSuccess: (data) => {
      router.push(`/report`, { reportData: data });
    },
    retry: 0,
    onError: (error) => {
      console.error(" 생성 실패:", error);
    },
  });

  return { specificLoanAdvice };
};
