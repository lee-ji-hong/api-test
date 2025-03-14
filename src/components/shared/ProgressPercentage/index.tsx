import LinearProgress, { LinearProgressProps } from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
    </Box>
  );
}

export const ProgressPercentage = ({ currentStep, length }: { currentStep: number; length: number }) => {
  const percentValue = (currentStep / length) * 100;
  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgressWithLabel value={percentValue} />
    </Box>
  );
};
