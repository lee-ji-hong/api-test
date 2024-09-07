import Profile from "./Profile";
import Contents from "./Contents";
import Spacing from "@/components/shared/Spacing";
import styles from "./CommunityContents.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const CommunityContents = () => {
  return (
    <div className={cx("container")}>
      <Profile />
      <Spacing size={12} />
      <Contents />
      <Spacing size={16} />
      <Spacing size={50} />
    </div>
  );
};

export default CommunityContents;
