// controller 만들어서 컴포넌트 나눌 예정
import { CSSTransition } from "react-transition-group";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useState } from "react";
import DepositList from "@/components/shared/DepositList";
import ReportList from "@/components/shared/ReportList";
import Spacing from "@/components/shared/Spacing";
import Section01 from "@/components/shared/Section01";
import Header from "@/components/sections/Header";
import Button from "@/components/shared/Button";
import Badge2 from "@/components/shared/Badge2";
import Image from "@/components/shared/Image";
import Text from "@/components/shared/Text";

import { formatNumber, formatNumberWithUnits } from "@/utils/formatters";
import { useInternalRouter } from "@/hooks/useInternalRouter";
import { IMAGES } from "@/constants/images";
import { formData } from "@/recoil/atoms";
import { orderStep, warning } from "./data";
import { MOCK } from "@/pages/DepositResultPage/mock";
import classNames from "classnames/bind";
import styles from "./ReportPage.module.scss";
const cx = classNames.bind(styles);

interface ListItem {
  label: string;
  amount: number;
}

const ReportPage = () => {
  const [showMoreExtraCost, setShowMoreExtraCost] = useState(false);
  const [showMoreDepositList, setShowMoreDepositList] = useState(false);
  const [showPage, setShowPage] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useInternalRouter();
  const location = useLocation();
  const reportData = location.state?.reportData?.data;
  const MAX_LENGTH = 100;
  const userInputData = useRecoilValue(formData);
  console.log(userInputData);

  const feeData: ListItem[] = [
    { label: "보증보험료", amount: reportData?.guaranteeInsuranceFee },
    { label: "인지세", amount: reportData?.stampDuty },
  ];

  const handleExtraCostListToggle = () => {
    setShowMoreExtraCost(!showMoreExtraCost);
  };

  const handleDepositListToggle = () => {
    setShowMoreDepositList(!showMoreDepositList);
  };

  const handleGoBack = () => {
    setShowPage(false);
    router.goBack();
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const recommendationReason = reportData?.recommendationReason || "이 대출을 추천한 이유";
  const shouldShowMore = recommendationReason.length > MAX_LENGTH;
  console.log(reportData?.recommendedProducts.length);
  return (
    <>
      <Header className={cx("cancel")} onRightClick={handleGoBack} right="Cancel_btn" />
      <CSSTransition
        in={showPage}
        timeout={500}
        classNames={{
          enter: cx("page-enter"),
          enterActive: cx("page-enter-active"),
          exit: cx("page-exit"),
          exitActive: cx("page-exit-active"),
        }}
        unmountOnExit>
        <div>
          {/* Section01 */}
          <Section01 className={cx("section")}>
            <Spacing size={65} />
            <div className={cx("section-wrap")}>
              <Image className={cx("img-logo")} imageInfo={IMAGES?.LoanBankDummyIcon} />
              <Text
                className={cx("txt-top")}
                text={`${reportData.loanProductName || "HUG 청년전용/n버팀목전세자금 대출"}`}
              />
              <Spacing size={10} />
              {["#20대인기상품", "#초저금리", "#최대한도"].map((item, index) => (
                <Badge2 key={index} title={item} />
              ))}
              <Spacing size={35} />
              <div className={cx("section-bottom")}>
                <div>
                  <Text className={cx("bottom-txt-title")} text="최대한도" />
                  <Text
                    className={cx("bottom-txt-sub")}
                    text={`${formatNumberWithUnits(reportData?.possibleLoanLimit / 10000) || "4억원"}`}
                  />
                </div>
                <div>
                  <Text className={cx("bottom-txt-title")} text="금리" />
                  <Text className={cx("bottom-txt-sub")} text={`${reportData?.expectedLoanRate || "2.4"}%`} />
                </div>
              </div>
            </div>
          </Section01>
          {/* Section02 */}
          <div className={cx("box")}>
            <Spacing size={70} />
            <Text
              className={cx("txt-title")}
              text={`내가 ${formatNumberWithUnits(reportData?.loanAmount / 10000)} 대출시/n약 ${formatNumber(reportData?.monthlyInterestCost)}원의 이자를 내요!`}
              highlight={formatNumberWithUnits(reportData?.loanAmount / 10000)}
            />
            <div>프로그레스 바 자리</div>
          </div>
          {/* Section03 */}
          <div className={cx("box")}>
            <Spacing size={70} />
            <Text
              className={cx("txt-title")}
              text={`${formatNumberWithUnits(reportData?.loanAmount / 10000)} 대출시 약 ${formatNumber(reportData?.guaranteeInsuranceFee + reportData?.stampDuty)}원의/n부수비용이 들어가요!`}
              highlight={`${formatNumber(reportData?.guaranteeInsuranceFee + reportData?.stampDuty)}원`}
            />
            <ReportList list={feeData} show={showMoreExtraCost} />
            {feeData.length > 3 && (
              <button className={cx("list-button")} onClick={handleExtraCostListToggle}>
                {showMoreExtraCost ? "부수 비용 더 보기 ∧" : "부수 비용 더 보기 ∨"}
              </button>
            )}
          </div>
          {/* Section04 */}
          <div className={cx("box")}>
            <Spacing size={70} />
            <Text className={cx("txt-title")} text="전세 대출을 하게 되면/n한달에 외식을 10번을 더 줄여야해요!" />
            <Spacing size={8} />
            <Text
              className={cx("txt-sub")}
              text="보증금 중 자기자금 1억원에 대해서는/n월 50만원의 기회비용이 발생해요 "
            />
            <Spacing size={8} />
            <Image className={cx("img")} imageInfo={IMAGES?.Report_1} />
          </div>
          {/* Section05 */}
          <div className={cx("box")}>
            <Spacing size={70} />
            <Text
              className={cx("txt-title")}
              text="이 대출을 추천한 이유는/n#20대 인기상품 #초저금리 #최대한도"
              highlight="#20대 인기상품 #초저금리 #최대한도"
            />
            <Spacing size={16} />
            <div className={cx("reason-box")}>
              <Text
                className={cx("txt-sub")}
                text={
                  isExpanded || !shouldShowMore
                    ? recommendationReason
                    : `${recommendationReason.substring(0, MAX_LENGTH)}...`
                }
              />
              {shouldShowMore && (
                <button className={cx("show-more-btn")} onClick={toggleExpanded}>
                  <Text
                    className={cx("txt-sub")}
                    text={isExpanded ? "간략히" : "더보기"}
                    highlight={isExpanded ? "간략히" : "더보기"}
                  />
                </button>
              )}
            </div>
          </div>
          {/* Section06 */}
          <div className={cx("box")}>
            <Spacing size={70} />
            <Text className={cx("txt-title")} text="다른 가능한 대출 상품도 확인해보세요!" />
            <Spacing size={8} />
            <DepositList
              list={reportData?.recommendedProducts || MOCK}
              isShow={reportData?.recommendedProducts.length > 3}
              toggle={showMoreDepositList}
              color="white"
            />
            {reportData?.recommendedProducts.length > 3 && (
              <button className={cx("list-button")} onClick={handleDepositListToggle}>
                {showMoreDepositList ? "다른 상품 더 보기 ∧" : "다른 상품 더 보기 ∨"}
              </button>
            )}
          </div>
          {/* Section07 */}
          <div className={cx("box")}>
            <Spacing size={70} />
            <Text className={cx("txt-title")} text="대출 불가 상품들의 사유를 확인해보세요!" />
            <Spacing size={8} />
            <DepositList
              list={reportData?.recommendedProducts || MOCK}
              isShow={reportData?.recommendedProducts.length > 3}
              toggle={showMoreDepositList}
              color="white"
            />
            {reportData?.recommendedProducts.length > 3 && (
              <button className={cx("list-button")} onClick={handleDepositListToggle}>
                {showMoreDepositList ? "다른 상품 더 보기 ∧" : "다른 상품 더 보기 ∨"}
              </button>
            )}
          </div>

          {/* Section08 */}
          <div className={cx("box")}>
            <Spacing size={70} />
            <Text className={cx("txt-title")} text="아래 은행에서 취급하는 상품이예요!" />
            <Spacing size={8} />
            <div className={cx("logo-wrap")}>
              {reportData?.availableBanks?.map((icon: string) => (
                <div key={icon}>
                  <Image className={cx("logo")} imageInfo={IMAGES.small[icon as keyof typeof IMAGES.small]} />
                  <Text className={cx("txt-sub")} text={IMAGES.small[icon as keyof typeof IMAGES.small].alt} />
                </div>
              ))}
            </div>
          </div>
          {/* Section09 */}
          <div className={cx("box")}>
            <Spacing size={70} />
            <Text className={cx("txt-title")} text="필요한 서류는 이런 것들이 있어요!" />
            <Spacing size={10} />
            <div>
              {[
                "신분증",
                "소득증명서",
                "주택임대차증명서",
                "세금 납부 증명서",
                "신용 등급 확인서",
                "주택등기부등본",
                "기존대출내역서",
                "대출상환증명서",
                "통장거래내역서",
              ].map((item, index) => (
                <Badge2 className={cx("badge-icon")} key={index} title={item} />
              ))}
            </div>
          </div>
          {/* Section10 */}
          <div className={cx("box")}>
            <Spacing size={70} />
            <Text className={cx("txt-title")} text="이런 순서로 대출 진행하면 OK!" />
            <Spacing size={10} />
            <div>
              {orderStep.map((step) => (
                <div className={cx("order-wrap")} key={step.id}>
                  <Image className={cx("img")} imageInfo={IMAGES?.Report_1} />
                  <div>
                    <Text className={cx("txt-title")} text={`STEP ${step.id}`} />
                    <Text className={cx("txt-sub")} text={step.description} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Section11 */}
          <div className={cx("box")}>
            <Spacing size={70} />
            <Text className={cx("txt-warning")} text="주의사항" />
            <Spacing size={10} />
            <ul>
              {warning.map((item, index) => (
                <li key={index} className={cx("warning-list")}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* 버튼 */}
          <Spacing size={100} />
          <Button className={cx("button-wrap")} onClick={handleGoBack} title="리포트 다시 산출하기" />
          <Spacing size={14} />
        </div>
      </CSSTransition>
    </>
  );
};

export default ReportPage;
