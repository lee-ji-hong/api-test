import { Typography } from "@mui/material";
import classNames from "classnames/bind";
import styles from "./CommunityRecentReportHeader.module.scss";
import Image from "@/components/shared/Image";
import { IMAGES } from "@/constants/images";
import { useNavigate } from "react-router-dom";
import RecentReportBody from "../RecentReportBody";

const cx = classNames.bind(styles);
const RecentReportHeader = () => {
  const navigate = useNavigate();

  return (
    <div className={cx("containerRecentReportHeader")}>
      <button onClick={() => navigate(-1)}>
        <Image className={cx("btnWriteBack")} imageInfo={IMAGES?.BackButton} />
      </button>

      <Typography className={cx("txtTitle")}>최근 보고서</Typography>
      <RecentReportBody />
    </div>
  );
};

export default RecentReportHeader;
