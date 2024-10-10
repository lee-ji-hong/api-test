import { Outlet, useLocation } from "react-router-dom";
import MobileTabBar from "@/components/shared/MobileTabBar";
import { Helmet } from "react-helmet-async";

import styles from "./AppLayout.module.scss";
import classNames from "classnames/bind";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loadingState } from "@/recoil/atoms";
import Axios from "@/api/axios";
import { useLayoutEffect } from "react";
const cx = classNames.bind(styles);
const AppLayout = () => {
  const { pathname } = useLocation();
  const isLoading = useRecoilValue(loadingState);
  const setLoading = useSetRecoilState(loadingState);

  useLayoutEffect(() => {
    Axios.setLoadingFunction(setLoading);
  });

  return (
    <>
      <Helmet>
        <title>내집플랜 | 전월세대출조회</title>
        <meta name="description" content="당신을 위한 최적의 전세 대출을 찾아드릴게요 - 전세대출, 신혼, 청년" />
        <meta name="keywords" content="내집플랜,전세대출,신혼,청년,대출" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content="내집플랜" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://myzipplan.com/metaThum.png" />
        <meta property="og:article:author" content="내집플랜" />
        <meta property="og:url" content="https://myzipplan.com/" />
      </Helmet>
      {isLoading && <div className={cx("loading")}>로딩 중...</div>} {/* 로딩 컴포넌트 */}
      {pathname === "/deposit-entry" || pathname === "/community" ? (
        <>
          <div className={cx("main")}>
            <Outlet />
          </div>
          <nav className={cx("tabBar", { "tabBar-z-index": pathname === "/deposit-entry" })}>
            <MobileTabBar />
          </nav>
        </>
      ) : (
        <div className={cx("main")}>
          <Outlet />
        </div>
      )}
    </>
  );
};

export default AppLayout;
