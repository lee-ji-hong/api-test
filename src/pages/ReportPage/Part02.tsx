import { useWindowSize } from "usehooks-ts";
import { useState } from "react";

import ProgressBar from "@/components/shared/ProgressBar";
import Spacing from "@/components/shared/Spacing";
import Image from "@/components/shared/Image";
import Text from "@/components/shared/Text";
import Box from "@mui/material/Box";

import { formatNumber, formatNumberWithUnits } from "@/utils/formatters";
import { IMAGES } from "@/constants/images";
import { LoanAdviceReport } from "@/models";

import classNames from "classnames/bind";
import styles from "./ReportPage.module.scss";
const cx = classNames.bind(styles);

interface Part02Props {
  reportData: LoanAdviceReport;
}

const Part02 = ({ reportData }: Part02Props) => {
  const [sliderValue, setSliderValue] = useState(reportData?.loanAmount);
  const { width } = useWindowSize();
  const isTabletSize = width < 748;
  const isMobileSize = width < 500;

  function valuetext(value: number) {
    return `${value}`;
  }

  const handleSliderChange = (event: Event, value: number | number[]) => {
    if (event) {
      setSliderValue(value as number);
    }
  };

  return (
    <>
      {" "}
      <div className={cx("banner-container")}>
        <Image className={cx("left-img")} imageInfo={IMAGES?.Letter} />
        <Text
          className={cx("right-txt")}
          text={`전세 대출금${formatNumberWithUnits(reportData?.loanAmount / 10000)}, 자기자금 ${formatNumberWithUnits(reportData?.ownFunds / 10000)}으로/n총 ${formatNumberWithUnits(reportData?.loanAmount + reportData?.ownFunds / 10000)}의 보증금을 충당할 수 있습니다.`}
        />
      </div>
      <div className={cx("box")}>
        <Spacing size={70} />
        <Text
          className={cx("txt-title")}
          text={`내가 ${formatNumberWithUnits(sliderValue / 10000)} 대출시/n약 ${formatNumber(
            Math.floor((reportData?.monthlyInterestCost / reportData?.loanAmount) * sliderValue),
          )}원의 이자를 내요!`}
          highlight={formatNumberWithUnits(sliderValue / 10000)}
        />
        <Spacing size={40} />
        {reportData?.loanAmount && (
          <div>
            <Box sx={{ width: isMobileSize ? width - 70 : isTabletSize ? width - 50 : width - 200, maxWidth: 900 }}>
              <ProgressBar
                aria-label="Temperature"
                defaultValue={reportData?.loanAmount ?? 0}
                getAriaValueText={valuetext}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `전세대출 ${formatNumberWithUnits(value / 10000)}`}
                // marks
                step={1000000}
                min={0}
                max={reportData?.loanAmount}
                onChange={handleSliderChange}
              />
            </Box>
          </div>
        )}
      </div>
    </>
  );
};

export default Part02;
