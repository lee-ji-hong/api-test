import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { MOCK } from "./mock";
import classNames from "classnames/bind";
import styles from "./DepositResultPage.module.scss";
const cx = classNames.bind(styles);

import DepositList from "@/components/shared/DepositList";
import Spacing from "@/components/shared/Spacing";
import Button from "@/components/shared/Button";
import Text from "@/components/shared/Text";

export const DepositResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { inputValue } = location.state || { inputValue: 0 };

  console.log(inputValue);
  useEffect(() => {
    if (!inputValue || inputValue === 0) {
      navigate("/deposit-entry");
    }
  }, [inputValue, navigate]);

  return (
    <div className={cx("container")}>
      <Spacing size={26} />
      <Text
        className={cx("txt-title")}
        text={`보증금 ${inputValue}만원을/n마련할 수 있는 상품이에요`}
        highlight={`${inputValue}만원`}
      />
      <Spacing size={10} />
      <Text className={cx("txt-sub")} text="추가 정보를 입력하고/n맞춤형 전월세대출을 알아보세요" />
      <DepositList list={MOCK} />
      <Button
        className={cx("fixed-button")}
        onClick={() => navigate("/deposit-entry")}
        title="맞춤형 전월세대출 더 알아보기"
      />
    </div>
  );
};

export default DepositResultPage;
