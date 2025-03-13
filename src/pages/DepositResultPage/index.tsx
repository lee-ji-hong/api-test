import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useState, useEffect } from "react";

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
import Badge from "@/components/shared/Badge";
import { useLogEvent } from "@/utils/firebaseLogEvent";
const cx = classNames.bind(styles);

export const DepositResultPage = () => {
  const formDataState = useRecoilValue(formData);
  const rentalDeposit = formDataState?.rentalDeposit;
  const location = useLocation();
  const navigate = useNavigate();
  const router = useInternalRouter();
  const { rentalProductData } = location.state || {};
  const [sortedData, setSortedData] = useState(rentalProductData);
  const [sortType, setSortType] = useState("한도순");

  const logEvent = useLogEvent();

  useEffect(() => {
    logEvent("DepositResultPage", {
      page_title: "./DepositResultPage",
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
  }, []);

  useEffect(() => {
    if (!rentalDeposit || rentalDeposit === 0 || !rentalProductData) {
      navigate("/deposit-entry");
    }
  }, [rentalDeposit, rentalProductData, navigate]);

  const handleSort = (type: string) => {
    if (!Array.isArray(rentalProductData)) {
      setSortedData([]);
      return;
    }
    const sorted = [...rentalProductData].sort((a, b) => {
      if (type === "금리순") {
        return a.expectedLoanRate - b.expectedLoanRate || b.possibleLoanLimit - a.possibleLoanLimit;
      } else if (type === "한도순") {
        return b.possibleLoanLimit - a.possibleLoanLimit || a.expectedLoanRate - b.expectedLoanRate;
      }
      return 0;
    });
    setSortedData(sorted);
  };

  const handleSelectOption = (value: string) => {
    setSortType(value);
  };

  useEffect(() => {
    handleSort(sortType);
  }, [sortType]);

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
        <div className={cx("container")}>
          {["한도순", "금리순"].map((item, index) => (
            <Badge
              className={cx("badge")}
              key={index}
              title={item}
              onClick={() => handleSelectOption(item)}
              theme={item === sortType ? "dark" : "white"}
            />
          ))}
        </div>
        <DepositList list={sortedData} color="white" />
        <Spacing size={100} />
        <Button
          className={cx("button-wrap")}
          onClick={() => {
            // 랜덤 값에 따라 A/B 경로 중 하나로 이동
            const randomPath = Math.random() > 0.4 ? "/loan-info-entry" : "/loan-info-entry-b";
            router.push(randomPath);
          }}
          title="맞춤형 전월세대출 더 알아보기"
        />
      </div>
    </>
  );
};

export default DepositResultPage;
