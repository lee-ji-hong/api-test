import Spacing from "@/components/shared/Spacing";
import Image from "@/components/shared/Image";
import Text from "@/components/shared/Text";
import { IMAGES } from "@/constants/images";
import { orderStep, warning } from "./data";

import classNames from "classnames/bind";
import styles from "./ReportPage.module.scss";
const cx = classNames.bind(styles);

const Part10 = () => {
  return (
    <>
      <div className={cx("box")}>
        <Spacing size={70} />
        <Text className={cx("txt-title")} text="이런 순서로 대출 진행하면 OK!" />
        <Spacing size={10} />
        <div>
          {orderStep.map((step) => (
            <div className={cx("order-wrap")} key={step.id}>
              <Image className={cx("img")} imageInfo={IMAGES?.Report_1} />
              <div>
                <Text className={cx("txt-title")} text={`STEP ${step.id}`} />
                <Text className={cx("txt-sub")} text={step.description} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Spacing size={50} />
      <div className={cx("warnning-box")}>
        <Spacing size={20} />
        <Text className={cx("txt-warning")} text="주의사항" />
        <Spacing size={10} />
        <ul>
          {warning.map((item, index) => (
            <li key={index} className={cx("warning-list")}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Part10;
