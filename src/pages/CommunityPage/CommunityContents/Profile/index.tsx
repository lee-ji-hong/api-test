import { Typography } from "@mui/material";
import styles from "./Profile.module.scss";
import classNames from "classnames/bind";
import Image from "@/components/shared/Image";
import { IMAGES } from "@/constants/images";

const cx = classNames.bind(styles);

interface ProfileProps {
  author: string;
  timeAgo: string;
  imgUrl?: string;
}

const Profile: React.FC<ProfileProps> = (props) => {
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
