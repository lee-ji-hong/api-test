import Spacing from "@/components/shared/Spacing";
import Image from "@/components/shared/Image";
import Text from "@/components/shared/Text";
import { IMAGES } from "@/constants/images";

import { LoanAdviceReport } from "@/models";

import classNames from "classnames/bind";
import styles from "./ReportPage.module.scss";
const cx = classNames.bind(styles);

interface Part08Props {
  reportData: LoanAdviceReport;
}

const Part08 = ({ reportData }: Part08Props) => {
  return (
    <div className={cx("box-scroll")}>
      <Spacing size={70} />
      <Text className={cx("txt-title")} text="아래 은행에서 취급하는 상품이예요!" />
      <Spacing size={18} />
      {reportData?.availableBanks.length > 5 ? (
        <div className={cx("logo-wrap", "animation")} style={{ animationDuration: "10s" }}>
          {reportData?.availableBanks?.map((icon: string) => (
            <div key={icon} className={cx("logo-item")}>
              <Image className={cx("logo")} imageInfo={IMAGES.small[icon as keyof typeof IMAGES.small]} />
              <Spacing size={6} />
              <Text className={cx("txt-sub")} text={IMAGES.small[icon as keyof typeof IMAGES.small].alt} />
            </div>
          ))}
          {reportData?.availableBanks?.map((icon: string) => (
            <div key={icon} className={cx("logo-item")}>
              <Image className={cx("logo")} imageInfo={IMAGES.small[icon as keyof typeof IMAGES.small]} />
              <Spacing size={6} />
              <Text className={cx("txt-sub")} text={IMAGES.small[icon as keyof typeof IMAGES.small].alt} />
            </div>
          ))}
          {reportData?.availableBanks?.map((icon: string) => (
            <div key={icon} className={cx("logo-item")}>
              <Image className={cx("logo")} imageInfo={IMAGES.small[icon as keyof typeof IMAGES.small]} />
              <Spacing size={6} />
              <Text className={cx("txt-sub")} text={IMAGES.small[icon as keyof typeof IMAGES.small].alt} />
            </div>
          ))}
        </div>
      ) : (
        <div className={cx("logo-wrap")}>
          {reportData?.availableBanks?.map((icon: string) => (
            <div key={icon} className={cx("logo-item")}>
              <Image className={cx("logo")} imageInfo={IMAGES.small[icon as keyof typeof IMAGES.small]} />
              <Spacing size={6} />
              <Text className={cx("txt-sub")} text={IMAGES.small[icon as keyof typeof IMAGES.small].alt} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Part08;
