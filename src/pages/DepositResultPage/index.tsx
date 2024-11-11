import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useState, useEffect } from "react";

import DepositList from "@/components/shared/DepositList";
import Spacing from "@/components/shared/Spacing";
import Header from "@/components/sections/Header";
import Button from "@/components/shared/Button";
import Image from "@/components/shared/Image";
import Text from "@/components/shared/Text";
import { IMAGES } from "@/constants/images";

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
  const [sortedData, setSortedData] = useState(rentalProductData);
  const [sortType, setSortType] = useState("lowRate");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!rentalDeposit || rentalDeposit === 0) {
      navigate("/deposit-entry");
    }
  }, [rentalDeposit, navigate]);

  const handleSort = (type: string) => {
    const sorted = [...rentalProductData].sort((a, b) => {
      if (type === "lowRate") {
        return a.expectedLoanRate - b.expectedLoanRate || b.possibleLoanLimit - a.possibleLoanLimit;
      } else if (type === "highLimit") {
        return b.possibleLoanLimit - a.possibleLoanLimit || a.expectedLoanRate - b.expectedLoanRate;
      }
      return 0;
    });
    setSortedData(sorted);
  };

  const handleSelectOption = (value: string) => {
    setSortType(value);
    setIsOpen(false);
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
        <div className={cx("filter-wrap")}>
          <div className={cx("filter-container")} onClick={() => setIsOpen(!isOpen)}>
            <div className={cx("filter-select")}>
              <Text className={cx("txt-sub")} text={sortType === "lowRate" ? "금리 낮은 순" : "한도 높은 순"} />
              <Image className={cx("arrow")} imageInfo={isOpen ? IMAGES.Down : IMAGES.Up} />
            </div>
            {isOpen && (
              <ul className={cx("options")}>
                <li onClick={() => handleSelectOption("lowRate")}>금리 낮은 순</li>
                <li onClick={() => handleSelectOption("highLimit")}>한도 높은 순</li>
              </ul>
            )}
          </div>
        </div>
        <DepositList list={sortedData} color="white" />
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
