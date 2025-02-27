import Header from "@/components/sections/Header";
import Spacing from "@/components/shared/Spacing";
import { ProgressPercentage, GlobalPortal } from "@/components";

import { useInternalRouter } from "@/hooks/useInternalRouter";

import classNames from "classnames/bind";
import styles from "./LoanInfoEntryTypeBPage.module.scss";
const cx = classNames.bind(styles);

export const LoanInfoEntryTypeBPage = () => {
  const router = useInternalRouter();

  return (
    <>
      <GlobalPortal.Consumer>
        <ProgressPercentage />
      </GlobalPortal.Consumer>
      <Header className={cx("cancel")} onLeftClick={() => router.push("/deposit-result")} left="Back_btn" />
      <Spacing size={53} />
      <div className={cx("container")}></div>
    </>
  );
};
export default LoanInfoEntryTypeBPage;
