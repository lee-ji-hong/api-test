import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

import Spacing from "@/components/shared/Spacing";
import Header from "@/components/sections/Header";
import { useInternalRouter } from "@/hooks/useInternalRouter";
import classNames from "classnames/bind";
import styles from "./DepositResultPage.module.scss";
import { useEffect } from "react";
import { useLogEvent } from "@/utils/firebaseLogEvent";
const cx = classNames.bind(styles);

export const DepositResultPageLoading = () => {
  const router = useInternalRouter();

  const logEvent = useLogEvent();

  useEffect(() => {
    logEvent("DepositResultPageLoading", {
      page_title: "./DepositResultPageLoading",
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
  }, [logEvent]);

  return (
    <>
      <Header className={cx("cancel")} onLeftClick={() => router.goBack()} left="Back_btn" />
      <Spacing size={53} />
      <div className={cx("container")}>
        <Spacing size={16} />
        <Stack spacing={1}>
          <Skeleton variant="rounded" width={200} height={32} className={cx("skeleton-item")} />
          <Skeleton variant="rounded" width={270} height={32} className={cx("skeleton-item")} />
          <Skeleton variant="text" width={150} sx={{ fontSize: "1rem" }} />
          <Skeleton variant="text" width={180} sx={{ fontSize: "1rem" }} />
        </Stack>
        <Spacing size={25} />
        <Stack spacing={2}>
          <Skeleton variant="rounded" width="100%" height={90} />
          <Skeleton variant="rounded" width="100%" height={90} />
          <Skeleton variant="rounded" width="100%" height={90} />
          <Skeleton variant="rounded" width="100%" height={90} />
        </Stack>

        <Skeleton variant="rounded" width="93%" height={56} className={cx("skeleton-button")} />
      </div>
    </>
  );
};

export default DepositResultPageLoading;
