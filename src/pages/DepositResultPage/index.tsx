import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { MOCK } from "./mock";

import DepositList from "@/components/shared/DepositList";
import Spacing from "@/components/shared/Spacing";
import Header from "@/components/sections/Header";
import Button from "@/components/shared/Button";
import Text from "@/components/shared/Text";

import { formatNumberWithUnits } from "@/utils/formatters";
import { useInternalRouter } from "@/hooks/useInternalRouter";
import classNames from "classnames/bind";
import styles from "./DepositResultPage.module.scss";
const cx = classNames.bind(styles);

export const DepositResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const router = useInternalRouter();
  const { inputValue } = location.state || { inputValue: 0 };

  useEffect(() => {
    if (!inputValue || inputValue === 0) {
      navigate("/deposit-entry");
    }
  }, [inputValue, navigate]);

  return (
    <>
      <Header className={cx("cancel")} onLeftClick={() => router.goBack()} left="Back_btn" />
      <div className={cx("container")}>
        <Spacing size={16} />
        <Text
          className={cx("txt-title")}
          text={`보증금 ${formatNumberWithUnits(inputValue)}을/n마련할 수 있는 상품이에요`}
          highlight={`${formatNumberWithUnits(inputValue)}`}
        />
        <Spacing size={10} />
        <Text className={cx("txt-sub")} text="추가 정보를 입력하고/n맞춤형 전월세대출을 알아보세요" />
        <Spacing size={25} />
        <DepositList list={MOCK} color="white" />
        <Spacing size={80} />
        <Button
          className={cx("button-wrap")}
          onClick={() => router.push("/loan-info-entry")}
          title="맞춤형 전월세대출 더 알아보기"
        />
      </div>
    </>
  );
};

export default DepositResultPage;
