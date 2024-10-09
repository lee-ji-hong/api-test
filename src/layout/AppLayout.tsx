import { Outlet, useLocation } from "react-router-dom";
import MobileTabBar from "@/components/shared/MobileTabBar";
import styles from "./AppLayout.module.scss";
import classNames from "classnames/bind";
import { useRecoilState } from "recoil";
import { loadingState, loginState } from "@/recoil/atoms";
import Axios from "@/api/axios";
import { useLayoutEffect } from "react";
import CenterModal from "@/components/modal/CenterModal";
import { reqLogin } from "@/api/remotes";
const cx = classNames.bind(styles);
const AppLayout = () => {
  const { pathname } = useLocation();
  const [isLoading, setLoading] = useRecoilState(loadingState);
  const [isLoginNeed, setIsLoginNeed] = useRecoilState(loginState);

  useLayoutEffect(() => {
    Axios.setLoadingFunction(setLoading);
    Axios.setLoginFunction(setIsLoginNeed);
  });

  return (
    <>
      {isLoading && <div className={cx("loading")}>로딩 중...</div>} {/* 로딩 컴포넌트 */}
      {isLoginNeed && (
        <CenterModal
          message={`로그인이 필요합니다.\n로그인 페이지로 이동하시겠습니까?`}
          subMessage=""
          confirmLabel="확인"
          cancelLabel="취소"
          onCancel={() => {
            setIsLoginNeed(false);
          }}
          onConfirm={() => {
            setIsLoginNeed(false);
            reqLogin();
          }}
        />
      )}
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
