import Badge2 from "@/components/shared/Badge/Badge2";
import Spacing from "@/components/shared/Spacing";
import Text from "@/components/shared/Text";

import classNames from "classnames/bind";
import styles from "./ReportPage.module.scss";
const cx = classNames.bind(styles);

const Part09 = () => {
  return (
    <div className={cx("box")}>
      <Spacing size={70} />
      <Text className={cx("txt-title")} text="필요한 서류는 이런 것들이 있어요!" />
      <Spacing size={10} />
      <div>
        {[
          "신분증",
          "주민등록등본",
          "재직증명서",
          "사업자등록증",
          "소득금액증명서",
          "임대차계약서",
          "등기사항전부증명서",
          "전입세대열람내역",
          "기타 상품별 필요서류",
        ].map((item, index) => (
          <Badge2 className={cx("badge-icon")} key={index} title={item} />
        ))}
      </div>
    </div>
  );
};

export default Part09;
