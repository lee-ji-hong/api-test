import { forwardRef, ChangeEvent, InputHTMLAttributes, useState, useEffect } from "react";
import { useRecoilState } from "recoil";

import Spacing from "@/components/shared/Spacing";
import Text from "@/components/shared/Text";
import Image from "@/components/shared/Image";

import { useSendAddressSearch } from "@/hooks/queries/useSendAddressSearch";
import { useSendHousingInfo } from "@/hooks/queries/useSendHousingInfo";

import { AddressInfo, sendLoanAdviceReportRequest } from "@/models";
import { MOCK } from "@/constants/housingInfoList";
import { IMAGES } from "@/constants/images";
import { formData } from "@/recoil/atoms";
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
    const [jibunAddress, setJibunAddress] = useState("");
    const [roadAddress, setRoadAddress] = useState("");
    const [inputValue, setInputValue] = useState("");
    const { searchAddress, addressList } = useSendAddressSearch();
    const { husingInfo, infoItem } = useSendHousingInfo();

    useEffect(() => {
      const delayDebounceFn = setTimeout(() => {
        if (inputValue) {
          searchAddress({ keyword: inputValue });
        }
      }, 500);

      return () => clearTimeout(delayDebounceFn);
    }, [inputValue, searchAddress]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value);
      onChange(e);
    };

    const handleCancel = () => {
      setJibunAddress("");
      onChange("");
    };

    const handleExclusiveAreaSelect = (ExclusiveArea: number) => {
      setRecoilFormData((prevState) => ({
        ...prevState,
        exclusiveArea: ExclusiveArea,
      }));
      onClose();
    };

    const handleAddressSelect = (address: AddressInfo) => {
      const data = {
        districtCode: address.districtCode,
        jibun: address.jibun,
        dongName: address.dongName,
      };

      onChange(address?.jibunAddress);
      setJibunAddress(address?.jibunAddress);
      setRoadAddress(address?.roadAddress);
      setRecoilFormData((prevState) => ({
        ...prevState,
        buildingName: address?.buildingName,
        districtCode: address?.districtCode,
        dongName: address?.dongName,
        jibun: address?.jibun,
      }));
      husingInfo(data);
    };

    return (
      <div className={cx("back-drop")} onClick={onClose}>
        <div className={cx("container")} aria-label="alert-modal" onClick={(e) => e.stopPropagation()}>
          <Text className={cx("txt-title")} text={modalTitle} />
          <Spacing size={30} />
          {recoilFormData.jibun === "" || recoilFormData.jibun === undefined || jibunAddress === "" ? (
            <>
              <input
                className={cx("input")}
                ref={ref}
                maxLength={30}
                value={inputValue}
                onChange={handleInputChange}
                placeholder="주소를 입력해주세요"
                {...props}
              />
              <Spacing size={15} />
              <div className={cx("list-container")}>
                {addressList && addressList?.length > 0 ? (
                  // 우선 최대 3개만 노출되도록 구현 추후 페이징 처리 수정 예정
                  addressList?.slice(0, 5).map((item, index) => (
                    <div className={cx("list-item")} key={index} onClick={() => handleAddressSelect(item)}>
                      <Text className={cx("list-txt-top")} text={item.jibunAddress} highlight={inputValue} />
                      <Text className={cx("list-txt-bottom")} text={item.roadAddress} />
                    </div>
                  ))
                ) : (
                  <Text className={cx("no-result")} text="찾으시는 주소가 없습니다." />
                )}
              </div>
            </>
          ) : (
            <>
              <div className={cx("box-list-container")}>
                <div className={cx("list-item")}>
                  <Text className={cx("list-txt-top")} text={jibunAddress} highlight={jibunAddress} />
                  <Text className={cx("list-txt-bottom")} text={roadAddress} />
                </div>
                <Image className={cx("reset")} imageInfo={IMAGES?.Cancel_grey} onClick={handleCancel} />
              </div>
              <Spacing size={20} />
              <div className={cx("box-container")}>
                {infoItem?.apiResultCode === "Y" && infoItem?.housingInfoList
                  ? infoItem.housingInfoList.map((item, index) => {
                      const areaText = `${item.exclusiveAreaPy}평 (전용${item.exclusiveArea.toFixed(2)}㎡)미만`;
                      return (
                        <div
                          key={index}
                          className={cx("box")}
                          onClick={() => handleExclusiveAreaSelect(item.exclusiveArea)}>
                          <Text className={cx("box-txt-top")} text={areaText} />
                        </div>
                      );
                    })
                  : MOCK.map((item, index) => {
                      return (
                        <div key={index} className={cx("box")} onClick={() => handleExclusiveAreaSelect(item.value)}>
                          <Text className={cx("box-txt-top")} text={item.label} />
                        </div>
                      );
                    })}
              </div>
            </>
          )}
        </div>
      </div>
    );
  },
);

export default AddressSearchInputModal;
