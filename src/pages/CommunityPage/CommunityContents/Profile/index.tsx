import { Typography } from "@mui/material";
import styles from "./Profile.module.scss";
import classNames from "classnames/bind";
import Image from "@/components/shared/Image";
import { IMAGES } from "@/constants/images";

const cx = classNames.bind(styles);

const Profile = () => {
  return (
    <div style={{ display: "flex" }} className={cx("container")}>
      <Image className={cx("img-profile")} imageInfo={IMAGES?.ProfileDummyIcon} />
      <div style={{ marginLeft: "10px" }}>
        <Typography className={cx("txt-name")}>김*니</Typography>
        <Typography className={cx("txt-time")}>4시간 전</Typography>
      </div>
    </div>
  );
};

export default Profile;
