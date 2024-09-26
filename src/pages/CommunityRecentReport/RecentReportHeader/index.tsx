import { Typography } from "@mui/material";
import classNames from "classnames/bind";
import styles from "./CommunityRecentReportHeader.module.scss";
import Image from "@/components/shared/Image";
import { IMAGES } from "@/constants/images";
import { useNavigate } from "react-router-dom";
import { CommunityDetail } from "@/models";

const cx = classNames.bind(styles);
const RecentReportHeader: React.FC<CommunityDetail> = (communityDetail) => {
  const navigate = useNavigate();

  function onBackPress() {
    navigate("/community/modify", { state: { communityDetail: communityDetail }, replace: true });
  }

  return (
    <div className={cx("containerRecentReportHeader")}>
      <button onClick={onBackPress}>
        <Image className={cx("btnWriteBack")} imageInfo={IMAGES?.BackButton} />
      </button>

      <Typography className={cx("txtTitle")}>최근 보고서</Typography>
    </div>
  );
};

export default RecentReportHeader;
