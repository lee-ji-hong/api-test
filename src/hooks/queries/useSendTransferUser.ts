import { useMutation } from "@tanstack/react-query";
import { sendTransferUser } from "@/api/remotes";
import { GuestToken } from "@/models";
import { useState } from "react";

export const useSendTransferUser = () => {
  const [infoItem, setInfoItem] = useState<GuestToken>();

  const { mutate: transferUser } = useMutation<GuestToken, Error, string>({
    mutationFn: (requestBody) => {
      return sendTransferUser(requestBody);
    },
    onSuccess: (response) => {
      setInfoItem(response);
    },
    retry: 0,
    onError: (error) => {
      console.error(" 생성 실패:", error);
      console.log(error);
    },
  });

  return { transferUser, infoItem };
};
