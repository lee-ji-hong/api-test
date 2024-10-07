import { Outlet, useLocation } from "react-router-dom";
import MobileTabBar from "@/components/shared/MobileTabBar";
import styles from "./AppLayout.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
const AppLayout = () => {
  const { pathname } = useLocation();
  return (
    <>
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
