import Header from "@/components/sections/Header";
import Spacing from "@/components/shared/Spacing";
import { ProgressPercentage } from "@/components";

import { useInternalRouter } from "@/hooks/useInternalRouter";

import classNames from "classnames/bind";
import styles from "./LoanInfoEntryTypeBPage.module.scss";
import { LoanResult } from "./LoanResult";
const cx = classNames.bind(styles);

export const LoanInfoEntryTypeBPage = () => {
  const router = useInternalRouter();

  return (
    <>
      {/* <GlobalPortal.Consumer>
      </GlobalPortal.Consumer> */}
      <ProgressPercentage />
      <Header className={cx("cancel")} onLeftClick={() => router.push("/deposit-result")} left="Back_btn" />
      <Spacing size={53} />
      <div className={cx("container")}>
        <LoanResult />
      </div>
    </>
  );
};
export default LoanInfoEntryTypeBPage;
