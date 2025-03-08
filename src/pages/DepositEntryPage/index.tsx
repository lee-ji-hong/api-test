import { useState, useEffect } from "react";
import { useWindowSize } from "usehooks-ts";
import { useRecoilState, useRecoilValue } from "recoil";

import { GlobalPortal } from "@/components/shared/GlobalPortal";
import KeyboardModal from "@/components/modal/KeyboardModal";
import DepositList from "@/components/shared/DepositList";
import BadgeList from "@/components/shared/BadgeList";
import Header from "@/components/sections/Header";
import Spacing from "@/components/shared/Spacing";
import Button from "@/components/shared/Button";
import Text from "@/components/shared/Text";

import { useSendSimpleRentalProduct } from "@/hooks/queries/useSendSimpleRentalProduct";
import { formatNumber, formatNumberWithUnits } from "@/utils/formatters";
import { useGetLoanAdvice } from "@/hooks/queries/useGetLoanAdvice";
import { useGetGuestToken } from "@/hooks/queries/useGetGuestToken";
import { setCookie } from "@/api/authUtils";
import { useInternalRouter } from "@/hooks/useInternalRouter";
import { sendLoanAdviceReportRequest } from "@/models";
import { formData, authState } from "@/recoil/atoms";
import { MONEY } from "@/constants/money";

import styles from "./DepositEntryPage.module.scss";
import classNames from "classnames/bind";
import { useLogEvent } from "@/utils/firebaseLogEvent";
const cx = classNames.bind(styles);

const DepositEntryPage = () => {
  const [, setRecoilFormData] = useRecoilState<sendLoanAdviceReportRequest>(formData);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [inputValue, setInputValue] = useState<number>(0);
  const [bottomOffset, setBottomOffset] = useState(0);
  const [gap, setGap] = useState(0);
  const { loanAdviceInfo } = useGetLoanAdvice();
  const { height } = useWindowSize();
  const { simpleRentalProduct } = useSendSimpleRentalProduct();
  const { guestToken, isGetGuestTokenLoading } = useGetGuestToken();
  const auth = useRecoilValue(authState);
  const router = useInternalRouter();

  const logEvent = useLogEvent();

  useEffect(() => {
    logEvent("DepositEntryPage", {
      page_title: "./DepositEntryPage",
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
  }, []);

  if (!isGetGuestTokenLoading && guestToken?.accessToken) {
    setCookie("guestToken", guestToken.accessToken);
    setCookie("roleType", guestToken.roleType);
  }

  useEffect(() => {
    const calculateKeyboardHeight = () => {
      const calculatedHeight = (height * 0.4 - 207) / 7;
      setKeyboardHeight(calculatedHeight);

      if (!isInputFocused) {
        setBottomOffset(82);
        setGap(0);
      } else {
        const newBottomOffset = height < 668 ? height * 0.4 + 15 : height < 900 ? height * 0.4 + 25 : height * 0.4 + 45;
        setGap(height - newBottomOffset - 56 - 180);
        setBottomOffset(newBottomOffset);
      }
    };

    calculateKeyboardHeight();
  }, [height, isInputFocused]);

  const isInvalidValue = inputValue > 0 && (inputValue <= 100 || inputValue > 200000);
  const warningMessage =
    inputValue === 0
      ? ""
      : inputValue <= 100
        ? "보증금은 100만원 이상이어야 합니다."
        : "보증금은 20억원을 초과할 수 없습니다.";

  const handleFocus = () => setIsInputFocused(true);
  const handleBlur = () => {
    setTimeout(() => {
      setIsInputFocused(false);
    }, 100);
  };

  const handleChangeValue = (label: string) => {
    const item = MONEY.default.find((item) => item.label === label)!;
    setInputValue((prevValue) => Math.min(prevValue + item.value, 210000));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const rawValue = value.replace(/,/g, "").replace(/만원/g, "");
    const newValue = parseInt(rawValue, 10);

    if (!isNaN(newValue)) {
      setInputValue(Math.min(newValue, 210000));
    }
  };

  const handleKeyPress = (key: string) => {
    if (key === "⌫") {
      setInputValue((prevValue) => Math.floor(prevValue / 10));
    } else if (key === "00") {
      setInputValue((prevValue) => Math.min(prevValue * 100, 210000));
    } else {
      const numKey = parseInt(key, 10);
      if (!isNaN(numKey)) {
        setInputValue((prevValue) => Math.min(prevValue * 10 + numKey, 210000));
      }
    }
  };

  const handleNavigate = (inputValue: number) => {
    const adjustedValue = inputValue * 10000;
    setRecoilFormData((prevState) => ({
      ...prevState,
      rentalDeposit: inputValue,
    }));
    simpleRentalProduct({ rentalDeposit: adjustedValue });
  };

  return (
    <>
      <Header className={cx("cancel")} onRightClick={() => router.push("/settings")} right="Setting_btn" left="Logo" />
      <Spacing size={53} />
      <div className={cx("container")}>
        <Spacing size={gap === 0 ? 90 : Math.floor(gap / 3)} />
        <Text className={cx("txt-title")} text="전월세보증금은?" />
        <Spacing size={4} />
        <div className={cx("input-container")}>
          <input
            className={cx("input", { shake: isInvalidValue })}
            maxLength={30}
            value={inputValue === 0 ? "" : `${formatNumber(inputValue)}만원`}
            placeholder="0만원"
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            readOnly={true}
          />
        </div>
        <Text
          className={cx(
            "txt-sub",
            { "text-alert": isInvalidValue },
            {
              "text-zero": inputValue === 0,
            },
          )}
          text={inputValue === 0 ? "-" : isInvalidValue ? warningMessage : formatNumberWithUnits(inputValue)}
        />
        <Spacing size={24} />
        <BadgeList list={MONEY.default} onClick={handleChangeValue} />
        <Spacing size={gap === 0 ? 60 : Math.floor(gap / 2)} />

        {!isInputFocused ? (
          <>
            <Button
              className={cx("button-wrap", { "auth-button-wrap": auth })}
              subClassName={cx("button-container")}
              disabled={!inputValue || isInvalidValue}
              onClick={() => handleNavigate(inputValue)}
              bottom={bottomOffset}
              title="전월세 대출 상품 확인하기"
            />
            <Spacing size={57} />
            {auth && (
              <div>
                <Text className={cx("txt-report")} text="최근 보고서" />
                <DepositList list={loanAdviceInfo?.slice(0, 5)} isAlert={false} color="white" isFetch={true} />
                <Spacing size={80} />
              </div>
            )}
          </>
        ) : (
          <div>
            <Button
              className={cx("button-wrap-focus")}
              subClassName={cx("button-container")}
              disabled={!inputValue || isInvalidValue}
              onClick={() => handleNavigate(inputValue)}
              bottom={bottomOffset}
              title="전월세 대출 상품 확인하기"
            />

            <GlobalPortal.Consumer>
              <KeyboardModal
                className={cx("keyboard-container")}
                onKeyPress={handleKeyPress}
                keyboardHeight={keyboardHeight}
              />
            </GlobalPortal.Consumer>
          </div>
        )}
      </div>
    </>
  );
};

export default DepositEntryPage;
