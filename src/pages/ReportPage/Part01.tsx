import Badge2 from "@/components/shared/Badge/Badge2";
import Section01 from "@/components/shared/Section01";
import Spacing from "@/components/shared/Spacing";
import Image from "@/components/shared/Image";
import Text from "@/components/shared/Text";

import { formatNumberWithUnits } from "@/utils/formatters";
import { getBankImage } from "@/utils/getBankImage";
import { LoanAdviceReport } from "@/models";

import classNames from "classnames/bind";
import styles from "./ReportPage.module.scss";
const cx = classNames.bind(styles);

interface Part01Props {
  reportData: LoanAdviceReport;
}

const Part01 = ({ reportData }: Part01Props) => {
  return (
    <Section01 className={cx("section")}>
      <Spacing size={65} />
      <div className={cx("section-wrap")}>
        <div className={cx("section-top-content")}>
          <div>
            <Image className={cx("img-logo")} imageInfo={getBankImage(reportData?.loanProductCode)} />
          </div>
          <Text
            className={cx("txt-top")}
            text={`${reportData?.loanProductName || "HUG 청년전용/n버팀목전세자금 대출"}`}
          />
        </div>
        <Spacing size={10} />
        {["#20대인기상품", "#초저금리", "#최대한도"].map((item, index) => (
          <Badge2 key={index} title={item} />
        ))}
        <Spacing size={35} />
        <div className={cx("section-bottom")}>
          <div>
            <Text className={cx("bottom-txt-title")} text="최대한도" />
            <Text
              className={cx("bottom-txt-sub")}
              text={`${formatNumberWithUnits(reportData?.possibleLoanLimit / 10000) || "4억원"}`}
            />
          </div>
          <div>
            <Text className={cx("bottom-txt-title")} text="금리" />
            <Text className={cx("bottom-txt-sub")} text={`${reportData?.expectedLoanRate || "2.4"}%`} />
          </div>
        </div>
      </div>
    </Section01>
  );
};

export default Part01;
