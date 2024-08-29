import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";

const DepositInput = styled(TextField)({
  width: "311px",
  "& .MuiInput-underline:before": {
    border: "none",
  },
  "& .MuiInput-underline:hover:before": {
    border: "none",
  },
  "& .Mui-error::before": {
    borderBottomColor: "#fc4a4a !important",
  },
  "& .Mui-error::after": {
    borderBottomColor: "#fc4a4a !important",
  },
  "& .MuiInput-root::after": {
    // borderBottom: "2px solid #4169e1 !important",
  },
  "& .MuiInput-input": {
    fontFamily: "Pretendard",
    height: "52px",
    fontSize: "38px",
    fontWeight: 700,
    lineHeight: "45.35px",
    textAlign: "center",
    "&::placeholder": {
      color: "#DADAE1",
    },
  },
});

export default DepositInput;
