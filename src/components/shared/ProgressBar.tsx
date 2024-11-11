import Slider from "@mui/material/Slider";
import { styled } from "@mui/system";

const iOSBoxShadow = "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)";

const ProgressBar = styled(Slider)(({ theme }) => ({
  color: "#4169E1",
  height: 5,
  padding: "15px 0",
  "& .MuiSlider-thumb": {
    height: 30,
    width: 30,
    backgroundColor: "#fff",
    boxShadow: "0 0 2px 0px rgba(0, 0, 0, 0.1)",
    "&:focus, &:hover, &.Mui-active": {
      boxShadow: "0px 0px 3px 1px rgba(0, 0, 0, 0.1)",
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        boxShadow: iOSBoxShadow,
      },
    },
    "&:before": {
      boxShadow: "0px 0px 1px 0px rgba(0,0,0,0.2), 0px 0px 0px 0px rgba(0,0,0,0.14), 0px 0px 1px 0px rgba(0,0,0,0.12)",
    },
  },
  "& .MuiSlider-valueLabel": {
    fontSize: 14,
    fontWeight: "normal",
    top: 60,
    backgroundColor: "unset",
    color: "#66667A",
    display: "block",
    transform: "translateY(-100%) scale(1)", //tooltip 보이게 처리
    "&::before": {
      display: "block",
    },
    "& *": {
      background: "transparent",
      color: "#66667A",
      fontFamily: "Pretendard",
      fontSize: 14,
      fontWeight: 500,
      lineHeight: "21px",
      letterSpacing: "-1px",
      ...theme.applyStyles("dark", {
        color: "#fff",
      }),
    },
  },
  "& .MuiSlider-track": {
    border: "none",
    height: 5,
  },
  "& .MuiSlider-rail": {
    opacity: 0.5,
    boxShadow: "inset 0px 0px 4px -2px #000",
    backgroundColor: "#d0d0d0",
  },
  ...theme.applyStyles("dark", {
    color: "#0a84ff",
  }),
}));

export default ProgressBar;
