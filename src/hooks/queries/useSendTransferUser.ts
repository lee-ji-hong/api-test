import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { sendTransferUser } from "@/api/remotes";
import { TransferUserResponse } from "@/models";

export const useSendTransferUser = () => {
  const [isTransferUser, setIsTransferUser] = useState<string>("false");

  const { mutate: transterUser } = useMutation<TransferUserResponse, Error, string>({
    mutationFn: sendTransferUser,
    onSuccess: (response) => {
      setIsTransferUser(response?.message);
    },
    onError: (error) => {
      console.error(" 생성 실패:", error);
    },
  });

  return { transterUser, isTransferUser };
};
