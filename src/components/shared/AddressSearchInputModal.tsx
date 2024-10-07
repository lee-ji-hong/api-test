import { forwardRef, ChangeEvent, InputHTMLAttributes, useState, useEffect } from "react";
import { useRecoilState } from "recoil";

import Spacing from "@/components/shared/Spacing";
import Text from "@/components/shared/Text";

import { useSendAddressSearch } from "@/hooks/queries/useSendAddressSearch";
import { formData } from "@/recoil/atoms";
import { AddressInfo, sendLoanAdviceReportRequest } from "@/models";
import classNames from "classnames/bind";
import styles from "./AddressSearchInputModal.module.scss";
const cx = classNames.bind(styles);

interface AddressProps extends InputHTMLAttributes<HTMLInputElement> {
  modalTitle?: string;
  onChange: (event: ChangeEvent<HTMLInputElement> | string) => void;
  onClose: () => void;
}

export const AddressSearchInputModal = forwardRef<HTMLInputElement, AddressProps>(
  ({ modalTitle, onClose, onChange, ...props }, ref) => {
    const [recoilFormData, setRecoilFormData] = useRecoilState<sendLoanAdviceReportRequest>(formData);
    const [inputValue, setInputValue] = useState("");
    const { searchAddress, addressList } = useSendAddressSearch();

    useEffect(() => {
      const delayDebounceFn = setTimeout(() => {
        if (inputValue) {
          searchAddress({ keyword: inputValue });
        }
      }, 500);

      return () => clearTimeout(delayDebounceFn);
    }, [inputValue, searchAddress]);

    console.log(recoilFormData);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value);
      onChange(e);
    };

    const handleAddressSelect = (address: AddressInfo) => {
      onChange(address?.jibunAddress);
      setRecoilFormData((prevState) => ({
        ...prevState,
        buildingName: address?.buildingName,
        districtCode: address?.districtCode,
        dongName: address?.dongName,
        jibun: address?.jibun,
      }));
      onClose();
    };

    return (
      <div className={cx("back-drop")} onClick={onClose}>
        <div className={cx("container")} aria-label="alert-modal" onClick={(e) => e.stopPropagation()}>
          <Text className={cx("txt-title")} text={modalTitle} />
          <Spacing size={30} />
          <input
            className={cx("input")}
            ref={ref}
            maxLength={30}
            value={inputValue}
            onChange={handleInputChange}
            {...props}
          />
          <Spacing size={15} />
          <div className={cx("list-container")}>
            {addressList && addressList?.length > 0 ? (
              // 우선 최대 3개만 노출되도록 구현 추후 페이징 처리 수정 예정
              addressList?.slice(0, 5).map((item, index) => (
                <div className={cx("list-item")} key={index} onClick={() => handleAddressSelect(item)}>
                  <Text className={cx("list-txt-top")} text={item.jibunAddress} />
                  <Text className={cx("list-txt-bottom")} text={item.roadAddress} />
                </div>
              ))
            ) : (
              <Text className={cx("no-result")} text="찾으시는 주소가 없습니다." />
            )}
          </div>
        </div>
      </div>
    );
  },
);

export default AddressSearchInputModal;
