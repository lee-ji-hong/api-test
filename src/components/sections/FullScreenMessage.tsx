import { useLocation } from "react-router-dom";

import DepositEntryPageLoading from "@/pages/DepositEntryPage/DepositEntryPageLoading";
import DepositResultPageLoading from "@/pages/DepositResultPage/DepositResultPageLoading";
import Lottie from "@/components/shared/Lottie";

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
  return <Lottie src="https://static.toss.im/tds/icon/png/4x/icn-warning-color.png" />;
}

function Loading() {
  const { pathname } = useLocation();
  return (
    <>
      {pathname === "/deposit-entry" ? (
        <DepositEntryPageLoading />
      ) : pathname === "/deposit-result" ? (
        <DepositResultPageLoading />
      ) : (
        <div className={cx("container")}>
          <Lottie src="https://static.toss.im/lotties/loading/circle-loading.json" />
        </div>
      )}
    </>
  );
}

export default FullScreenMessage;
