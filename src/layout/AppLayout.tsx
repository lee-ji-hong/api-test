import { Outlet } from "react-router-dom";
import styles from "./AppLayout.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
const AppLayout = () => {
  return (
    <div className={cx("main")}>
      <Outlet />
    </div>
  );
};

export default AppLayout;
