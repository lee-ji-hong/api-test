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
        width: 46,
        height: 46,
        backgroundColor: "#4169E1",
      }}
      color="primary"
      aria-label="add"
      onClick={onClick}>
      <AddIcon sx={{ fontSize: "2.6rem" }} />
    </Fab>
  );
};

export default FloatingButton;
