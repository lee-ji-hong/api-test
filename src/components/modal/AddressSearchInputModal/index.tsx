import { forwardRef, ChangeEvent, InputHTMLAttributes, useState, useEffect, useRef, useCallback } from "react";
import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";
import CircularProgress from "@mui/material/CircularProgress";
import { useRecoilState } from "recoil";

import { GlobalPortal } from "@/components/shared/GlobalPortal";
import Spacing from "@/components/shared/Spacing";
import Text from "@/components/shared/Text";
import Image from "@/components/shared/Image";

import { useSendAddressSearch } from "@/hooks/queries/useSendAddressSearch";
import { useSendHousingInfo } from "@/hooks/queries/useSendHousingInfo";

import { AddressInfo, sendLoanAdviceReportRequest, Address } from "@/models";
import { MOCK } from "@/constants/housingInfoList";
import { IMAGES } from "@/constants/images";
import { formData } from "@/recoil/atoms";
import classNames from "classnames/bind";
import styles from "./AddressSearchInputModal.module.scss";
const cx = classNames.bind(styles);

interface AddressProps extends InputHTMLAttributes<HTMLInputElement> {
  modalTitle?: string;
  onChange: (event: ChangeEvent<HTMLInputElement> | string) => void;
  onClose: (isBackdropClick?: boolean) => void;
}

export const AddressSearchInputModal = forwardRef<HTMLInputElement, AddressProps>(
  ({ modalTitle, onClose, onChange, ...props }, ref) => {
    const [recoilFormData, setRecoilFormData] = useRecoilState<sendLoanAdviceReportRequest>(formData);
    const { husingInfo, infoItem } = useSendHousingInfo();
    const [jibunAddress, setJibunAddress] = useState("");
    const [roadAddress, setRoadAddress] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const {
      data: addressData,
      hasNextPage,
      isFetchingNextPage,
      fetchNextPage,
      isLoading: isAddressLoading,
    }: UseInfiniteQueryResult<InfiniteData<Address, unknown>, Error> = useSendAddressSearch(
      { keyword: inputValue },
      !!inputValue,
    );
    const observerElem = useRef<HTMLDivElement | null>(null);
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
      setIsVisible(true);
    }, []);

    const handleObserver = useCallback(
      (entries: IntersectionObserverEntry[]) => {
        const [target] = entries;
        if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
          setTimeout(() => {
            fetchNextPage();
          }, 500);
        }
      },
      [fetchNextPage, hasNextPage, isFetchingNextPage],
    );

    useEffect(() => {
      observer.current = new IntersectionObserver(handleObserver, { threshold: 0.1 });
      const currentElement = observerElem.current;
      if (currentElement) {
        observer.current.observe(currentElement);
      }

      return () => {
        if (currentElement && observer.current) {
          observer.current.unobserve(currentElement);
          observer.current.disconnect();
        }
      };
    }, [handleObserver]);

    const addressList: AddressInfo[] = addressData?.pages.flatMap((page) => page.addressInfoList) ?? [];

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
      setIsVisible(false);
      setTimeout(() => onClose(false), 400);
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
      <GlobalPortal.Consumer>
        <div
          className={cx("back-drop")}
          onClick={() => {
            setIsVisible(false);
            setTimeout(() => onClose(true), 400);
          }}>
          <div
            className={cx("container", { show: isVisible })}
            aria-label="alert-modal"
            onClick={(e) => e.stopPropagation()}>
            <div className={cx("bar")}></div>
            <Image className={cx("Icon")} onClick={() => onClose(true)} imageInfo={IMAGES.Cancel_btn} />
            <Spacing size={35} />
            <Text className={cx("txt-title")} text={modalTitle} />
            <Spacing size={30} />
            {recoilFormData.jibun === "" || recoilFormData.jibun === undefined || jibunAddress === "" ? (
              <>
                <div className={cx("input-container")}>
                  <input
                    className={cx("input")}
                    ref={ref}
                    maxLength={30}
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                      }
                    }}
                    placeholder="주소를 입력해주세요"
                    {...props}
                  />
                  {inputValue !== "" ? (
                    <Image
                      className={cx("reset-input")}
                      imageInfo={IMAGES?.Cancel_grey}
                      onClick={() => {
                        setInputValue("");
                        onChange("");
                      }}
                    />
                  ) : (
                    <></>
                  )}
                </div>
                <div className={cx("hr-top")}></div>
                <div className={cx("list-container")}>
                  {!isAddressLoading && addressList?.length > 0 ? (
                    addressList.map((item, index) => (
                      <div className={cx("list-item")} key={index} onClick={() => handleAddressSelect(item)}>
                        <Text className={cx("list-txt-top")} text={item.jibunAddress} highlight={inputValue} />
                        <Text className={cx("list-txt-bottom")} text={item.roadAddress} />
                      </div>
                    ))
                  ) : (
                    <Text className={cx("no-result")} text="찾으시는 주소가 없습니다." />
                  )}
                  {isFetchingNextPage && (
                    <div className={cx("loading-container")}>
                      <CircularProgress />
                    </div>
                  )}
                  <div ref={observerElem} style={{ height: "5px" }} />
                </div>
                <div className={cx("hr-bottom")}></div>
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
      </GlobalPortal.Consumer>
    );
  },
);

export default AddressSearchInputModal;
