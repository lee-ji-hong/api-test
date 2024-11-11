import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useEffect } from "react";

import DepositList from "@/components/shared/DepositList";
import Spacing from "@/components/shared/Spacing";
import Header from "@/components/sections/Header";
import Button from "@/components/shared/Button";
import Text from "@/components/shared/Text";

import { formatNumberWithUnits } from "@/utils/formatters";
import { useInternalRouter } from "@/hooks/useInternalRouter";
import { formData } from "@/recoil/atoms";
// import { rentalProductData } from "./mock";
import classNames from "classnames/bind";
import styles from "./DepositResultPage.module.scss";
const cx = classNames.bind(styles);

export const DepositResultPage = () => {
  const formDataState = useRecoilValue(formData);
  const rentalDeposit = formDataState?.rentalDeposit;
  const location = useLocation();
  const navigate = useNavigate();
  const router = useInternalRouter();
  const { rentalProductData } = location.state || {};

  console.log(rentalProductData);

  useEffect(() => {
    if (!rentalDeposit || rentalDeposit === 0) {
      navigate("/deposit-entry");
    }
  }, [rentalDeposit, navigate]);

  return (
    <>
      <Header className={cx("cancel")} onLeftClick={() => router.push("/deposit-entry")} left="Back_btn" />
      <Spacing size={53} />
      <div className={cx("container")}>
        <Spacing size={16} />
        <Text
          className={cx("txt-title")}
          text={`보증금 ${formatNumberWithUnits(rentalDeposit ?? 0)}을/n마련할 수 있는 상품이에요`}
          highlight={`${formatNumberWithUnits(rentalDeposit ?? 0)}`}
        />
        <Spacing size={8} />
        <Text className={cx("txt-sub")} text="추가 정보를 입력하고/n맞춤형 전월세대출을 알아보세요" />
        <Spacing size={20} />
        <DepositList list={rentalProductData} color="white" />
        <Spacing size={100} />
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
