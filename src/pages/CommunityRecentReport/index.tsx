import Spacing from "@/components/shared/Spacing";
import classNames from "classnames/bind";
import styles from "./CommunityRecentReport.module.scss";
import RecentReportBody from "./RecentReportBody";
import RecentReportHeader from "./RecentReportHeader";
import { CommunityDetail } from "@/models";
import { useLocation } from "react-router-dom";
import { useLogEvent } from "@/utils/firebaseLogEvent";
import { useEffect } from "react";

const cx = classNames.bind(styles);

const CommunityRecentReportPage = () => {
  const { from, communityDetail } = useLocation().state as { from: string; communityDetail: CommunityDetail };

  const logEvent = useLogEvent();

  useEffect(() => {
    logEvent("CommunityRecentReport", {
      page_title: "./CommunityRecentReport",
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
  }, [logEvent]);

  return (
    <div className={cx("container")}>
      <div className={cx("containerHeader")}>
        <RecentReportHeader from={from} communityDetail={communityDetail} />
        <Spacing size={16} />
        <RecentReportBody from={from} communityDetail={communityDetail} />
      </div>
    </div>
  );
};

export default CommunityRecentReportPage;
