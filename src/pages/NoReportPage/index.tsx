// controller 만들어서 컴포넌트 나눌 예정
import { CSSTransition } from "react-transition-group";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import DepositList from "@/components/shared/DepositList";
import Spacing from "@/components/shared/Spacing";
import Section01 from "@/components/shared/Section01";
import Header from "@/components/sections/Header";
import Button from "@/components/shared/Button";
import Text from "@/components/shared/Text";

import { useInternalRouter } from "@/hooks/useInternalRouter";
import { MOCK } from "@/pages/DepositResultPage/mock";
import classNames from "classnames/bind";
import styles from "./NoReportPage.module.scss";
import { useLogEvent } from "@/utils/firebaseLogEvent";
const cx = classNames.bind(styles);

interface ReportProduct {
  notEligibleReasons?: string[];
}

const NoReportPage = () => {
  const [showPage, setShowPage] = useState(true);
  const router = useInternalRouter();
  const location = useLocation();
  const reportData = location.state?.reportData?.data;

  const handleGoBack = () => {
    setShowPage(false);
    router.goBack();
  };

  const notEligibleProduct = reportData?.recommendedProducts.filter(
    (item: ReportProduct) => item?.notEligibleReasons && item?.notEligibleReasons[0] !== "",
  );

  const notEligibleProductSample = MOCK.filter(
    (item) => item?.notEligibleReasons && item?.notEligibleReasons[0] !== "",
  );

  const logEvent = useLogEvent();

  useEffect(() => {
    logEvent("NoReportPage", {
      page_title: "./NoReportPage",
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
  }, []);

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
              <Text className={cx("txt-top")} text="대출 가능한 상품이 없습니다./n대출 불가 사유를 확인하세요." />
            </div>
          </Section01>

          {/* Section07 */}
          <div className={cx("box")}>
            <Spacing size={70} />
            <DepositList list={notEligibleProduct || notEligibleProductSample} isAlert={true} color="white" />
          </div>

          {/* 버튼 */}
          <Spacing size={67} />
          <Button className={cx("button-wrap")} onClick={handleGoBack} title="리포트 다시 산출하기" />
          <Spacing size={14} />
        </div>
      </CSSTransition>
    </>
  );
};

export default NoReportPage;
