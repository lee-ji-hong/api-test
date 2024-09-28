import { Typography } from "@mui/material";
import styles from "./Profile.module.scss";
import classNames from "classnames/bind";
import Image from "@/components/shared/Image";
import { IMAGES } from "@/constants/images";

const cx = classNames.bind(styles);

interface ProfileProps {
  avatarUrl: string;
  author: string;
  timeAgo: string;
}

const Profile: React.FC<ProfileProps> = (props) => {
  // URL 유효성 검증 함수
  const checkValidUrl = (url: string): boolean => {
    try {
      // URL 형식 검증
      if (!url) return false;
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };
  const avatarUrl = props.avatarUrl;
  const isVaildUrl: boolean = checkValidUrl(avatarUrl);
  IMAGES?.ProfileDummyIcon || "";

  return (
    <div style={{ display: "flex" }} className={cx("container")}>
      {isVaildUrl ? (
        <img alt="profile" src={avatarUrl} className={cx("img-profile")} />
      ) : (
        <Image className={cx("img-profile")} imageInfo={IMAGES?.ProfileDummyIcon} />
      )}

      <div style={{ marginLeft: "10px" }}>
        <Typography className={cx("txt-name")}>{props.author}</Typography>
        <Typography className={cx("txt-time")}>{props.timeAgo}</Typography>
      </div>
    </div>
  );
};

export default Profile;
