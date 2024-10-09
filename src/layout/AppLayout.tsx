import { Outlet, useLocation } from "react-router-dom";
import MobileTabBar from "@/components/shared/MobileTabBar";
import styles from "./AppLayout.module.scss";
import classNames from "classnames/bind";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loadingState } from "@/recoil/atoms";
import { useEffect } from "react";
import Axios from "@/api/axios";
const cx = classNames.bind(styles);
const AppLayout = () => {
  const { pathname } = useLocation();
  const isLoading = useRecoilValue(loadingState);
  const setLoading = useSetRecoilState(loadingState);

  useEffect(() => {
    Axios.setLoadingFunction(setLoading);
  }, []);

  return (
    <>
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
