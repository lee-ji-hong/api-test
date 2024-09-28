import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import styles from "./DepositEntryPage.module.scss";
import KeyboardModal from "@/components/shared/KeyboardModal";
import DepositInput from "@/components/shared/DepositInput";
import BadgeList from "@/components/shared/BadgeList";
import Header from "@/components/sections/Header";
import Spacing from "@/components/shared/Spacing";
import Button from "@/components/shared/Button";
import Text from "@/components/shared/Text";

import { useSendSimpleRentalProduct } from "@/hooks/queries/useSendSimpleRentalProduct";
import { formatNumber, formatNumberWithUnits } from "@/utils/formatters";
import { useInternalRouter } from "@/hooks/useInternalRouter";
import { sendLoanAdviceReportRequest } from "@/models";
import { formData } from "@/recoil/atoms";
import { MONEY } from "@/constants/money";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const DepositEntryPage = () => {
  const [recoilFormData, setRecoilFormData] = useRecoilState<sendLoanAdviceReportRequest>(formData);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [inputValue, setInputValue] = useState<number>(0);
  const [bottomOffset, setBottomOffset] = useState(0);
  const { simpleRentalProduct } = useSendSimpleRentalProduct();
  const router = useInternalRouter();

  useEffect(() => {
    if (isInputFocused) {
      setBottomOffset(275); // 모달이 나타날 때
    } else {
      setBottomOffset(40); // 기본 상태
    }
  }, [isInputFocused]);

  console.log(recoilFormData);

  const isInvalidValue = inputValue > 0 && (inputValue <= 100 || inputValue > 200000);
  const warningMessage =
    inputValue === 0
      ? ""
      : inputValue <= 100
        ? "보증금은 100만원 이상이어야 합니다."
        : "보증금은 20억원을 초과할 수 없습니다.";

  const handleFocus = () => setIsInputFocused(true);
  const handleBlur = () => setIsInputFocused(false);

  const handleChangeValue = (label: string) => {
    const item = MONEY.find((item) => item.label === label)!;
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
      <Header
        className={cx("cancel")}
        onRightClick={() => alert("준비중입니다")}
        onLeftClick={() => router.push("/")}
        right="Setting_btn"
        left="Logo"
      />
      <div className={cx("container")}>
        <Spacing size={90} />
        <Text className={cx("txt-title")} text="전월세보증금은?" />
        <DepositInput
          id="standard-basic"
          variant="standard"
          placeholder="0만원"
          onFocus={handleFocus}
          onBlur={handleBlur}
          error={isInvalidValue ? true : false}
          value={inputValue === 0 ? "" : formatNumber(inputValue)}
          onChange={handleInputChange}
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*", readOnly: true }}
          className={cx({ shake: isInvalidValue })}
          sx={{
            "& .MuiInputBase-input": {
              color: inputValue === 0 ? "#dadae1" : isInvalidValue ? "#fc4a4a" : "#4169e1",
            },
          }}
        />
        <Text
          className={cx("txt-sub", { "text-alert": isInvalidValue })}
          text={inputValue === 0 ? "" : isInvalidValue ? warningMessage : formatNumberWithUnits(inputValue)}
        />
        <Spacing size={38} />
        <BadgeList list={MONEY} onClick={handleChangeValue} />
        <Button
          className={cx("button-wrap")}
          disabled={!inputValue || isInvalidValue}
          onClick={() => handleNavigate(inputValue)}
          bottom={bottomOffset}
          title="전월세 대출 상품 확인하기"
        />
        {isInputFocused && <KeyboardModal onKeyPress={handleKeyPress} />}
      </div>
    </>
  );
};

export default DepositEntryPage;
