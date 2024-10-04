import { Typography } from "@mui/material";
import styles from "./Profile.module.scss";
import classNames from "classnames/bind";
import Image from "@/components/shared/Image";
import { IMAGES } from "@/constants/images";
import BottomModal from "@/components/modal/BottomModal";

const cx = classNames.bind(styles);

interface ProfileProps {
  avatarUrl: string;
  author: string;
  timeAgo: string;
  updateDeleteAuthority?: string;
  onClose?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const Profile: React.FC<ProfileProps> = (props) => {
  const isAuthor = props.updateDeleteAuthority === "ALL";

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
  const isVaildUrl: boolean = checkValidUrl(props.avatarUrl);
  IMAGES?.ProfileDummyIcon || "";

  return (
    <div style={{ display: "flex" }} className={cx("container")}>
      <div style={{ display: "flex" }}>
        {isVaildUrl ? (
          <img alt="profile" src={props.avatarUrl} className={cx("img-profile")} />
        ) : (
          <Image className={cx("img-profile")} imageInfo={IMAGES?.ProfileDummyIcon} />
        )}

        <div style={{ marginLeft: "10px" }}>
          <Typography className={cx("txt-name")}>{props.author}</Typography>
          <Typography className={cx("txt-time")}>{props.timeAgo}</Typography>
        </div>
      </div>

      {isAuthor && (
        <button onClick={() => alert("dd")}>
          <Image className={cx("btnMore")} imageInfo={IMAGES?.MoreButton} />
        </button>
      )}

      {true && <BottomModal onClose={props.onClose!} onEdit={props.onEdit!} onDelete={props.onDelete!} />}
    </div>
  );
};

export default Profile;
