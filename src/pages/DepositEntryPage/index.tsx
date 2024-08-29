import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MONEY } from "@/constants/money";
import classNames from "classnames/bind";
import styles from "./DepositEntryPage.module.scss";
const cx = classNames.bind(styles);

import DepositInput from "@/components/shared/DepositInput";
import BadgeList from "@/components/shared/BadgeList";
import Spacing from "@/components/shared/Spacing";
import Button from "@/components/shared/Button";
import Text from "@/components/shared/Text";

const DepositEntryPage = () => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [inputValue, setInputValue] = useState<number>("");
  const moneyKeys = Object.keys(MONEY);
  const navigate = useNavigate();

  const isInvalidValue = inputValue <= 5 || inputValue > 200000;
  const warningMessage =
    inputValue <= 5 ? "보증금은 5만원 이상이어야 합니다." : "보증금은 20억원을 초과할 수 없습니다.";

  const handleFocus = () => setIsInputFocused(true);
  const handleBlur = () => setIsInputFocused(false);

  const handleChangeValue = (value: string) => {
    const amount = MONEY[value];
    setInputValue((prevValue) => Math.min(prevValue + amount, 210000));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const rawValue = value.replace(/,/g, "").replace(/만원/g, "");
    const newValue = parseInt(rawValue, 10);
    if (!isNaN(newValue)) {
      setInputValue(Math.min(newValue, 210000));
    }
  };

  const formatNumber = (number: number) => {
    return `${new Intl.NumberFormat().format(number)}만원`;
  };

  const formatNumberWithUnits = (number: number): string => {
    if (number >= 10000) {
      const billion = Math.floor(number / 10000); // 억 단위 계산
      const million = number % 10000; // 만 단위 계산
      if (million > 0) {
        return `${billion}억 ${new Intl.NumberFormat().format(million)}만원`;
      }
      return `${billion}억`;
    }
    return formatNumber(number); // 억 단위 미만
  };

  return (
    <div className={cx("container")}>
      <Spacing size={179} />
      <Text className={cx("txt-title")} text="전월세보증금은?" />
      <DepositInput
        id="standard-basic"
        variant="standard"
        placeholder="0만원"
        onFocus={handleFocus}
        onBlur={handleBlur}
        error={isInvalidValue ? true : false}
        value={`${formatNumber(inputValue)}`}
        onChange={handleInputChange}
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        sx={{
          "& .MuiInputBase-input": {
            color: isInvalidValue ? "#fc4a4a" : "#4169e1",
          },
        }}
      />
      <Text
        className={cx("txt-sub", { "text-alert": isInvalidValue })}
        text={isInvalidValue ? warningMessage : formatNumberWithUnits(inputValue)}
      />
      <Spacing size={58} />
      <BadgeList list={moneyKeys} onClick={handleChangeValue} />
      <Button
        onClick={() => navigate("/deposit-entry")}
        title="전월세 대출 상품 확인하기"
        className={cx("fixed-button", { "with-input-focus": isInputFocused })}
      />
    </div>
  );
};

export default DepositEntryPage;
