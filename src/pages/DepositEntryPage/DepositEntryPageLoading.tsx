import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

import styles from "./DepositEntryPage.module.scss";
import Header from "@/components/sections/Header";
import Spacing from "@/components/shared/Spacing";

import classNames from "classnames/bind";
import { useLogEvent } from "@/utils/firebaseLogEvent";
import { useEffect } from "react";
const cx = classNames.bind(styles);

const DepositEntryPageLoading = () => {
  const logEvent = useLogEvent();

  useEffect(() => {
    logEvent("DepositEntryPageLoading", {
      page_title: "./DepositEntryPageLoading",
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
  }, [logEvent]);

  return (
    <>
      <Header className={cx("cancel")} right="Setting_btn" left="Logo" />
      <Spacing size={53} />
      {/* skeleton */}
      <div className={cx("container")}>
        <Spacing size={90} />
        <Stack spacing={1} className={cx("skeleton-container")}>
          <Skeleton variant="rounded" width={220} height={50} />
          <Skeleton variant="rounded" width={100} height={50} />
          <div className={cx("skeleton-list")}>
            <Skeleton variant="rounded" width={72} height={32} className={cx("skeleton-item")} />
            <Skeleton variant="rounded" width={72} height={32} className={cx("skeleton-item")} />
            <Skeleton variant="rounded" width={72} height={32} className={cx("skeleton-item")} />
            <Skeleton variant="rounded" width={72} height={32} className={cx("skeleton-item")} />
          </div>
        </Stack>
        <Skeleton variant="rounded" width="90%" height={56} className={cx("skeleton-button")} />
      </div>
      {/* skeleton */}
    </>
  );
};

export default DepositEntryPageLoading;
