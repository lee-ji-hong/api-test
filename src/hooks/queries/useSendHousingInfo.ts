import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { sendHousingInfo } from "@/api/remotes";
import { sendHousingInfoRequest, HousingInfo } from "@/models";

export const useSendHousingInfo = () => {
  const [infoItem, setInfoItem] = useState<HousingInfo>();

  const { mutate: husingInfo } = useMutation<HousingInfo, Error, sendHousingInfoRequest>({
    mutationFn: sendHousingInfo,
    onSuccess: (response) => {
      setInfoItem(response);
    },
    onError: (error) => {
      console.error(" 생성 실패:", error);
    },
  });

  return { husingInfo, infoItem };
};
