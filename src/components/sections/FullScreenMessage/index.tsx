// import { useLocation } from "react-router-dom";

// import DepositEntryPageLoading from "@/pages/DepositEntryPage/DepositEntryPageLoading";
// import DepositResultPageLoading from "@/pages/DepositResultPage/DepositResultPageLoading";
// import LoanInfoEntryPageLoading from "@/pages/LoanInfoEntryPage/LoanInfoEntryPageLoading";
// import ReportPageLoading from "@/pages/ReportPage/ReportPageLoading";
import Image from "@/components/shared/Image";

import { IMAGES } from "@/constants/images";

import classNames from "classnames/bind";
import styles from "./FullScreenMessage.module.scss";
const cx = classNames.bind(styles);

interface FullScreenMessageProps {
  type: "loading" | "error";
}

function FullScreenMessage({ type }: FullScreenMessageProps) {
  return (
    <>
      {type === "loading" ? (
        <Loading />
      ) : (
        <>
          <Error />
          에러가 발생했어요 잠시 후 다시 시도해주세요.
        </>
      )}
    </>
  );
}

function Error() {
  return (
    <div className={cx("container")}>
      <Image className={cx("ico-heart")} imageInfo={IMAGES?.LoadingHeart} />
    </div>
  );
}

function Loading() {
  // const { pathname } = useLocation();
  return (
    <>
      <div className={cx("container")}>
        <Image className={cx("ico-heart")} imageInfo={IMAGES?.LoadingHeart} />
      </div>
      {/* {pathname === "/deposit-entry" ? (
        <DepositEntryPageLoading />
      ) : pathname === "/deposit-result" || pathname === "/no-report" ? (
        <DepositResultPageLoading />
      ) : pathname === "/loan-info-entry" ? (
        <LoanInfoEntryPageLoading />
      ) : pathname === "/report" ? (
        <ReportPageLoading />
      ) : (
        <div className={cx("container")}>
          <Image className={cx("ico-heart")} imageInfo={IMAGES?.LoadingHeart} />
        </div>
      )} */}
    </>
  );
}

export default FullScreenMessage;
