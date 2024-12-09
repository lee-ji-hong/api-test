import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import React, { useEffect } from "react";

import Header from "@/components/sections/Header";
import Spacing from "@/components/shared/Spacing";
import List from "@/components/shared/List";

import { useInternalRouter } from "@/hooks/useInternalRouter";

import classNames from "classnames/bind";
import styles from "./LoanInfoEntryPage.module.scss";
import { useLogEvent } from "@/utils/firebaseLogEvent";
const cx = classNames.bind(styles);

export const LoanInfoEntryPageLoading = () => {
  const router = useInternalRouter();

  const logEvent = useLogEvent();

  useEffect(() => {
    logEvent("LoanInfoEntryPageLoading", {
      page_title: "./LoanInfoEntryPageLoading",
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
  }, []);

  return (
    <>
      <Header className={cx("cancel")} onLeftClick={() => router.goBack()} left="Back_btn" />
      <Spacing size={53} />
      <div className={cx("container")}>
        <Spacing size={16} />
        <Skeleton variant="rounded" width={220} height={32} />
        <Spacing size={20} />

        <Stack spacing={1}>
          {Array.from({ length: 13 }).map((_, index) => (
            <React.Fragment key={index}>
              <List.Row topText="" right={<Skeleton variant="rounded" width={30} height={20} />} withArrow={true} />
            </React.Fragment>
          ))}
        </Stack>
      </div>
      <Skeleton variant="rounded" width="93%" height={56} className={cx("skeleton-button")} />
    </>
  );
};
export default LoanInfoEntryPageLoading;
