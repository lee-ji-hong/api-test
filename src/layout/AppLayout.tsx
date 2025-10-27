import { Outlet, useLocation } from "react-router-dom";
import { LinearProgress } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useLayoutEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import Axios from "@/api/axios";

import SelectBottomSheet from "@/components/modal/SelectBottomSheet";
import MobileTabBar from "@/components/shared/MobileTabBar";
import Image from "@/components/shared/Image";
import Text from "@/components/shared/Text";

import { loadingState, loginState, authState } from "@/recoil/atoms";
import { IMAGES } from "@/constants/images";
import { reqLogin } from "@/api/remotes";

import styles from "./AppLayout.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const AppLayout = () => {
  const { pathname } = useLocation();
  const [isLoading, setLoading] = useRecoilState(loadingState);
  const [isLoginNeed, setIsLoginNeed] = useRecoilState(loginState);
  const auth = useRecoilValue(authState);

  useLayoutEffect(() => {
    Axios.setLoadingFunction(setLoading);
    Axios.setLoginFunction(setIsLoginNeed);
    if (pathname !== "/community") {
      window.scrollTo(0, 0);
    }
  }, [isLoading, isLoginNeed, auth]);

  return (
    <>
      <Helmet>
        <title>내집플랜 | 전월세대출조회</title>
        <meta name="description" content="당신을 위한 최적의 전세 대출을 찾아드릴게요 - 전세대출, 신혼, 청년" />
        <meta name="keywords" content="내집플랜,전세대출,신혼,청년,대출" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content="내집플랜" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://myzipplan.xyz/metaThum.png" />
        <meta property="og:article:author" content="내집플랜" />
        <meta property="og:url" content="https://myzipplan.xyz/" />
      </Helmet>
      {isLoading && <LinearProgress />} {/* 로딩 컴포넌트 */}
      {isLoginNeed && (
        <SelectBottomSheet
          modalTitle={`내집플랜에 로그인하고/n더 다양한 서비스를 확인해보세요!`}
          titleAlign="center"
          onClose={() => setIsLoginNeed(false)}>
          <>
            <div className={cx("img-wrap")}>
              <Image className={cx("img")} imageInfo={IMAGES?.Letter} />
            </div>
            <div>
              <button
                className={cx(["button-container", "yellow"])}
                onClick={() => {
                  setIsLoginNeed(false);
                  reqLogin();
                }}>
                <div className={cx("button-text-wrap")}>
                  <Image className={cx("img")} imageInfo={IMAGES?.KAKAO_icon} />
                  <Text text="카카오로 3초만에 로그인" />
                </div>
              </button>
            </div>
          </>
        </SelectBottomSheet>
      )}
      {pathname === "/deposit-entry" || pathname === "/community" || pathname === "/calculator" ? (
        <>
          <div className={cx("main")}>
            <Outlet />
          </div>
          <nav className={cx("tabBar", { "tabBar-z-index": pathname === "/deposit-entry" && !auth })}>
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
