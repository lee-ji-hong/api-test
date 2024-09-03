import classNames from "classnames/bind";
import styles from "./CommunityPage.module.scss";
import { Button, Typography } from "@mui/material";
const cx = classNames.bind(styles);

const CommunityPage = () => {
  return (
    <div className={cx("container")}>
      <Typography className={cx("txt-title")}>커뮤니티</Typography>
      {RoundedButton()}
    </div>
  );
};

function RoundedButton() {
  return (
    <Button
      variant="contained" // 버튼 스타일 (contained, outlined, text)
      sx={{
        borderRadius: "50px", // 라운드 버튼
        padding: "10px 20px", // 버튼 패딩 (선택 사항)
        backgroundColor: "primary.main", // 버튼 배경색 (테마 색상 사용)
        ":hover": {
          backgroundColor: "primary.dark", // 호버 상태 배경색
        },
      }}>
      Rounded Button
    </Button>
  );
}

export default CommunityPage;
