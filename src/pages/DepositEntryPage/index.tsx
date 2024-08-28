import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Text from "@/components/shared/Text";
import DepositInput from "@/components/shared/DepositInput";
import Spacing from "@/components/shared/Spacing";
import Button from "@/components/shared/Button";
import BadgeList from "@/components/shared/BadgeList";

import classNames from "classnames/bind";
import styles from "./DepositEntryPage.module.scss";
const cx = classNames.bind(styles);

const DepositEntryPage = () => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const money = ["+10만", "+100만", "+1000만", "+1억"];

  // Input 포커스 핸들러
  const handleFocus = () => setIsInputFocused(true);
  const handleBlur = () => setIsInputFocused(false);

  const handleChangeValue = (value: string) => {
    console.log(value);
    setInputValue(value);
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
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Spacing size={58} />
      <BadgeList list={money} onClick={handleChangeValue} />
      <Button
        onClick={() => navigate("/deposit-entry")}
        title="전월세 대출 상품 확인하기"
        className={cx("fixed-button", { "with-input-focus": isInputFocused })}
      />
    </div>
  );
};

export default DepositEntryPage;
