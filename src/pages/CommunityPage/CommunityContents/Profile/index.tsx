import { Typography } from "@mui/material";
import styles from "./Profile.module.scss";
import classNames from "classnames/bind";
import Image from "@/components/shared/Image";
import { IMAGES } from "@/constants/images";
import { Post } from "@/api/model/CommunityResponse";

const cx = classNames.bind(styles);

const Profile: React.FC<Post> = (props) => {
  return (
    <div style={{ display: "flex" }} className={cx("container")}>
      <Image className={cx("img-profile")} imageInfo={IMAGES?.ProfileDummyIcon} />
      <div style={{ marginLeft: "10px" }}>
        <Typography className={cx("txt-name")}>{props.author}</Typography>
        <Typography className={cx("txt-time")}>{props.timeAgo}</Typography>
      </div>
    </div>
  );
};

export default Profile;
