import styles from "./CommunityPage.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Profile = () => {
  return (
    <div style={cx("container")}>
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
        <h3>김*니</h3>
        <p>4시간 전</p>
      </div>
    </div>
  );
};

export default Profile;
