import classNames from "classnames/bind";
import styles from "./CommunityRecentReport.module.scss";
import RecentReportHeader from "./RecentReportHeader";

const cx = classNames.bind(styles);

const CommunityRecentReportPage = () => {
  return (
    <div className={cx("container")}>
      <div className={cx("containerHeader")}>
        <RecentReportHeader />
      </div>
    </div>
  );
};

export default CommunityRecentReportPage;
