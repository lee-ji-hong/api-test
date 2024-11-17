import React from "react";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface FloatingButtonProps {
  onClick: () => void; // onClick 함수 타입 지정
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ onClick }) => {
  return (
    <Fab
      sx={{
        position: "fixed",
        bottom: 100,
        right: 20,
        width: 48, // 크기를 48px로 변경
        height: 48,
        backgroundColor: "#4169E1", // 배경색 설정
        boxShadow: "none", // 그림자 제거
        "&:hover": {
          backgroundColor: "#27408B", // 호버 시 배경색 변경
        },
      }}
      color="primary"
      aria-label="add"
      onClick={onClick}>
      <AddIcon sx={{ fontSize: "2.6rem" }} />
    </Fab>
  );
};

export default FloatingButton;
