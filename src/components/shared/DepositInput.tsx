import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";

const DepositInput = styled(TextField)({
  width: "311px",
  marginBottom: "16px",
  "& .MuiInput-underline:before": {
    border: "none",
  },
  "& .MuiInput-underline:hover:before": {
    border: "none",
  },
  "& .MuiInput-input": {
    fontFamily: "Pretendard",
    height: "46px",
    fontSize: "38px",
    fontWeight: 700,
    lineHeight: "45.35px",
    textAlign: "center",
    color: "#4169E1",
    "&::placeholder": {
      color: "#DADAE1",
    },
  },
});

export default DepositInput;
