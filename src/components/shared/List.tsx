import { PropsWithChildren, ReactNode } from "react";
import Text from "@/components/shared/Text";
import Icon from "@/components/shared/Icon";

import classNames from "classnames/bind";
import styles from "./List.module.scss";
const cx = classNames.bind(styles);

interface Props {
  className?: string;
}

const List = ({ className, children }: PropsWithChildren<Props>) => {
  return <ul className={cx(["container", className])}>{children}</ul>;
};

interface ListRowProps {
  className?: string;
  iconName?: string;
  topText: string;
  bottomText?: string;
  right?: ReactNode;
  withArrow?: boolean;
  onClick?: () => void;
}

const Row = ({ className, iconName, topText, bottomText, right, withArrow, onClick }: ListRowProps) => {
  return (
    <li onClick={onClick} className={cx("row", className)}>
      <div className={cx("row-content")}>
        {iconName != null ? <Icon name={iconName} size={24} className={cx("icon")} /> : null}
        <div className={cx("row-text")}>
          <Text className={cx("txt-title")} text={topText} />
          {bottomText != null ? <Text className={cx("txt-title")} text={bottomText} /> : null}
        </div>
      </div>
      <div className={cx("row-content")}>
        {right != null ? right : null}
        {withArrow ? <Icon className={cx("icon")} name="icon-arrow-right-sidebar-mono" size={12} /> : null}
      </div>
    </li>
  );
};

List.Row = Row;

export { List, Row };
export default List;
