import Spacing from "@/components/shared/Spacing";
import classNames from "classnames/bind";
import styles from "./CommunityRecentReport.module.scss";
import RecentReportBody from "./RecentReportBody";
import RecentReportHeader from "./RecentReportHeader";
import { CommunityDetail } from "@/models";
import { useLocation } from "react-router-dom";

const cx = classNames.bind(styles);

const CommunityRecentReportPage = () => {
  const { communityDetail } = useLocation().state as { communityDetail: CommunityDetail };

  return (
    <div className={cx("container")}>
      <div className={cx("containerHeader")}>
        <RecentReportHeader {...communityDetail} />
        <Spacing size={16} />
        <RecentReportBody {...communityDetail} />
      </div>
    </div>
  );
};

export default CommunityRecentReportPage;
