import { Typography } from "@mui/material";
import styles from "./Profile.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Profile = () => {
  return (
    <div style={{ display: "flex" }} className={cx("container")}>
      <img
        src="https://via.placeholder.com/150" // 프로필 이미지 URL
        alt="Profile"
        style={{
          width: "40px", // 이미지 너비
          height: "40px", // 이미지 높이
          borderRadius: "50%", // 원형으로 만들기
          objectFit: "cover", // 이미지 비율을 유지하며 자르기
          border: "2px solid #ddd", // 테두리 (선택 사항)
        }}
      />
      <div style={{ marginLeft: "10px" }}>
        <Typography className={cx("txt-name")}>김*니</Typography>
        <Typography className={cx("txt-time")}>4시간 전</Typography>
      </div>
    </div>
  );
};

export default Profile;
