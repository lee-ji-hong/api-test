import { useMutation } from "@tanstack/react-query";
import { useInternalRouter } from "@/hooks/useInternalRouter";

import { sendSimpleRentalProduct } from "@/api/remotes";
import { SendSimpleRentalProductRequest, SimpleRentalProduct } from "@/models";

export const useSendSimpleRentalProduct = () => {
  const router = useInternalRouter();

  const { mutate: simpleRentalProduct } = useMutation<SimpleRentalProduct[], Error, SendSimpleRentalProductRequest>({
    mutationFn: sendSimpleRentalProduct,
    onSuccess: (data) => {
      console.log(data);
      router.push(`/deposit-result`, { resultData: data });
    },
    onError: (error) => {
      console.error(" 생성 실패:", error);
    },
  });

  return { simpleRentalProduct };
};
