import { Outlet, useLocation } from "react-router-dom";
import MobileTabBar from "@/components/shared/MobileTabBar";
import styles from "./AppLayout.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
const AppLayout = () => {
  const { pathname } = useLocation();
  return (
    <>
      {pathname === "/deposit-entry" ? (
        <>
          <div className={cx("main")}>
            <Outlet />
          </div>
          <nav className={cx("tabBar")}>
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
