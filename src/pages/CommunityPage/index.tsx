import classNames from "classnames/bind";
import styles from "./CommunityPage.module.scss";
import { Button, Typography } from "@mui/material";

import Spacing from "@/components/shared/Spacing";
import { useState } from "react";

const cx = classNames.bind(styles);

const CommunityPage = () => {
  const [isLatest, setIsLatest] = useState(true);

  return (
    <div className={cx("container")}>
      <Typography className={cx("txt-title")}>커뮤니티</Typography>
      <Spacing size={16} />
      <div className={cx("button-space")}>
        <RoundButton
          text="최신순"
          onClick={() => {
            console.log("최신순 클릭");
            setIsLatest(true);
          }}
          isActive={isLatest}
        />
        <Spacing size={4} />
        <RoundButton
          text="인기순"
          onClick={() => {
            console.log("인기순 클릭");
            setIsLatest(false);
          }}
          isActive={!isLatest}
        />
        <Spacing size={34} />
      </div>
    </div>
  );
};

interface RoundButtonProps {
  text: string;
  onClick: () => void;
  isActive: boolean;
}

const RoundButton = (props: RoundButtonProps) => {
  return (
    <Button
      variant="contained"
      onClick={props.onClick}
      sx={{
        fontSize: "15px",
        letterSpacing: "-0.5px",
        width: "66px",
        height: "35px",
        borderRadius: "100px",
        color: props.isActive ? "white" : "#333347", // 텍스트 색상을 강제 적용
        padding: "6px 14px",
        backgroundColor: props.isActive ? "#333347 !important" : "transparent !important", // 배경을 투명하게
        border: "none",
        boxShadow: "none",
        ":hover": {
          backgroundColor: "white",
        },
      }}>
      {props.text}
    </Button>
  );
};

export default CommunityPage;
