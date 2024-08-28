import { NAVIGATION_BAR_MENU } from "@/constants/navigationBarMenu";
import { NavLink } from "react-router-dom";

import classNames from "classnames/bind";
import styles from "./MobileTabBar.module.scss";

const cx = classNames.bind(styles);

const MobileTabBar = () => {
  return (
    <ul className={cx("menu")}>
      {Object.entries(NAVIGATION_BAR_MENU).map(([key, { tabTitle, path, icon }]) => {
        const { SVGComponent, alt } = icon;
        return (
          <li key={key} className={cx("menu-item")}>
            <NavLink
              to={path}
              className={({ isActive }) =>
                cx({
                  "menu-item-active": isActive,
                })
              }>
              {({ isActive }) => (
                <>
                  <SVGComponent title={alt} color={isActive ? "#4169E1" : "#333347"} />
                  <div>{tabTitle}</div>
                </>
              )}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};
export default MobileTabBar;
