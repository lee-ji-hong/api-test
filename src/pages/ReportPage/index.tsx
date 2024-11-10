// controller 만들어서 컴포넌트 나눌 예정
import { CSSTransition } from "react-transition-group";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useState } from "react";

import { useGetSpecificUserInputInfo } from "@/hooks/queries/useGetSpecificUserInputInfo";
import { useInternalRouter } from "@/hooks/useInternalRouter";
import { sendLoanAdviceReportRequest } from "@/models";
import Spacing from "@/components/shared/Spacing";
import Header from "@/components/sections/Header";
import Button from "@/components/shared/Button";
import { formData } from "@/recoil/atoms";
import Part01 from "./Part01";
import Part02 from "./Part02";
import Part03 from "./Part03";
import Part04 from "./Part04";
import Part05 from "./Part05";
import Part06 from "./Part06";
import Part07 from "./Part07";
import Part08 from "./Part08";
import Part09 from "./Part09";
import Part10 from "./Part10";
import Part11 from "./Part11";

import classNames from "classnames/bind";
import styles from "./ReportPage.module.scss";
const cx = classNames.bind(styles);

const ReportPage = () => {
  const [, setRecoilFormData] = useRecoilState<sendLoanAdviceReportRequest>(formData);
  const [showPage, setShowPage] = useState(true);
  const [toggle, setToggle] = useState(false);
  const router = useInternalRouter();
  const location = useLocation();
  const reportData = location.state?.reportData?.data;
  const isRecent = location.state?.isRecent;
  const { info } = useGetSpecificUserInputInfo(reportData?.userInputInfoId, isRecent);
  // console.log(location.state);

  const handleGoBack = () => {
    setShowPage(false);
    router.goBack();
  };

  const handleNavigate = () => {
    setRecoilFormData({
      ...(info as sendLoanAdviceReportRequest),
      annualIncome: info?.annualIncome ? info?.annualIncome / 10000 : info?.annualIncome,
      cashOnHand: info?.cashOnHand ? info?.cashOnHand / 10000 : info?.cashOnHand,
      monthlyRent: info?.monthlyRent ? info?.monthlyRent / 10000 : info?.monthlyRent,
      rentalDeposit: info?.rentalDeposit ? info?.rentalDeposit / 10000 : info?.rentalDeposit,
      spouseAnnualIncome: info?.spouseAnnualIncome ? info?.spouseAnnualIncome / 10000 : info?.spouseAnnualIncome,
    });
    router.push("/loan-info-entry", { isRecent: true });
  };

  const handleClose = () => {
    setToggle((prev) => !prev);
  };

  return (
    <>
      <Header
        className={cx("cancel")}
        onRightClick={() => {
          setShowPage(false);
          router.push("/deposit-entry");
        }}
        right="Cancel_btn"
      />
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
          <Part01 reportData={reportData} /> {/* 대출 정보 */}
          <Part02 reportData={reportData} /> {/* 프로그레스바 */}
          <Part03 reportData={reportData} /> {/* 부수비용 */}
          <Part04 reportData={reportData} /> {/* 이자금 */}
          <Part05 reportData={reportData} /> {/* 대출 추천 이유 */}
          <Part06 reportData={reportData} /> {/* 대출가능상품 */}
          <Part07 reportData={reportData} /> {/* 대출불가상품 */}
          <Part08 reportData={reportData} /> {/* 은행사 리스트 */}
          <Part09 /> {/* 필요한 서류 */}
          <Part10 /> {/* 대출 순서, 주의사항 */}
          {/* 버튼 */}
          <Spacing size={67} />
          {isRecent ? (
            <div className={cx("button-wrap-divide")}>
              <Button
                className={cx("button")}
                title="적용 조건 보기"
                theme="light"
                onClick={() => setToggle(!toggle)}
              />
              <Button className={cx("button")} title="다시 산출하기" onClick={handleNavigate} />
            </div>
          ) : (
            <Button className={cx("button-wrap")} onClick={handleGoBack} title="리포트 다시 산출하기" />
          )}
          <Spacing size={14} />
          {toggle && info !== undefined && <Part11 Info={info} handleClose={handleClose} />}
        </div>
      </CSSTransition>
    </>
  );
};

export default ReportPage;
