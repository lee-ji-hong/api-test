import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { sendaddressSearch } from "@/api/remotes";
import { Address, sendaddressSearchRequest, AddressInfo } from "@/models";

export const useSendAddressSearch = () => {
  const [addressList, setAddressList] = useState<AddressInfo[]>([]);

  const { mutate: searchAddress } = useMutation<Address, Error, sendaddressSearchRequest>({
    mutationFn: sendaddressSearch,
    onSuccess: (response) => {
      setAddressList(response.addressInfoList);
    },
    onError: (error) => {
      console.error(" 생성 실패:", error);
    },
  });

  return { searchAddress, addressList };
};
