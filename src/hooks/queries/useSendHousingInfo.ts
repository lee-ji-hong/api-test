import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { sendHousingInfo } from "@/api/remotes";
import { sendHousingInfoRequest, HousingInfo } from "@/models";

export const useSendHousingInfo = () => {
  const [addressList, setAddressList] = useState<HousingInfo>();

  const { mutate: husingInfo } = useMutation<HousingInfo, Error, sendHousingInfoRequest>({
    mutationFn: sendHousingInfo,
    onSuccess: (response) => {
      console.log(response);
      setAddressList(response);
    },
    onError: (error) => {
      console.error(" 생성 실패:", error);
    },
  });

  return { husingInfo, addressList };
};
