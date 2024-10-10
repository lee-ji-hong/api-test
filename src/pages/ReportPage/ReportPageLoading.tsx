// controller 만들어서 컴포넌트 나눌 예정
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

import { CSSTransition } from "react-transition-group";
import { useState } from "react";

import Spacing from "@/components/shared/Spacing";
import Section01 from "@/components/shared/Section01";
import Header from "@/components/sections/Header";

import { useInternalRouter } from "@/hooks/useInternalRouter";
import classNames from "classnames/bind";
import styles from "./ReportPage.module.scss";
const cx = classNames.bind(styles);

const ReportPageLoading = () => {
  const [showPage, setShowPage] = useState(true);
  const router = useInternalRouter();

  const handleGoBack = () => {
    setShowPage(false);
    router.goBack();
  };

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
              <div className={cx("section-top-content")}>
                <Stack spacing={1}>
                  <Skeleton variant="circular" width={40} height={40} />
                  <Skeleton variant="rounded" width={200} height={50} />
                  <Skeleton variant="rounded" width={220} height={50} />
                </Stack>
              </div>
              <Spacing size={10} />
              <div className={cx("skeleton-list")}>
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton key={index} variant="rounded" width={72} height={32} className={cx("skeleton-item")} />
                ))}
              </div>

              <Spacing size={35} />
              <div className={cx("section-bottom")}>
                <Stack spacing={1}>
                  <Skeleton variant="rounded" width={60} height={15} />
                  <Skeleton variant="rounded" width={60} height={30} />
                </Stack>
                <Stack spacing={1}>
                  <Skeleton variant="rounded" width={60} height={15} />
                  <Skeleton variant="rounded" width={60} height={30} />
                </Stack>
              </div>
            </div>
          </Section01>
          {/* Section02 */}
          <Spacing size={70} />
          <Stack spacing={2}>
            <Skeleton variant="rounded" width={120} height={20} />
            <Skeleton variant="rounded" width={140} height={20} />
            <Skeleton variant="rounded" width="100%" height={70} />
            <Skeleton variant="rounded" width="100%" height={70} />
          </Stack>

          {/* Section03 */}
          <Spacing size={70} />
          <Stack spacing={2}>
            <Skeleton variant="rounded" width={120} height={20} />
            <Skeleton variant="rounded" width={140} height={20} />
            <Skeleton variant="rounded" width="100%" height={70} />
            <Skeleton variant="rounded" width="100%" height={70} />
          </Stack>

          {/* Section04 */}
          <Spacing size={70} />
          <Stack spacing={1}>
            <Skeleton variant="rounded" width={170} height={20} />
            <Skeleton variant="rounded" width={240} height={20} />
            <Skeleton variant="rounded" width={150} height={10} />
            <Skeleton variant="rounded" width={150} height={10} />
            <Skeleton variant="rounded" width="100%" height={223} />
          </Stack>

          {/* Section05 */}
          <Spacing size={70} />
          <Stack spacing={1}>
            <Skeleton variant="rounded" width={170} height={20} />
            <Skeleton variant="rounded" width={240} height={20} />
            <Skeleton variant="rounded" width="100%" height={223} />
          </Stack>

          <Skeleton variant="rounded" width="93%" height={56} className={cx("skeleton-button")} />
        </div>
      </CSSTransition>
    </>
  );
};

export default ReportPageLoading;
