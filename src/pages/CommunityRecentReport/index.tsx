import Spacing from "@/components/shared/Spacing";
import classNames from "classnames/bind";
import styles from "./CommunityRecentReport.module.scss";
import RecentReportBody from "./RecentReportBody";
import RecentReportHeader from "./RecentReportHeader";

const cx = classNames.bind(styles);

const CommunityRecentReportPage = () => {
  return (
    <div className={cx("container")}>
      <div className={cx("containerHeader")}>
        <RecentReportHeader />
        <Spacing size={16} />
        <RecentReportBody />
      </div>
    </div>
  );
};

export default CommunityRecentReportPage;
