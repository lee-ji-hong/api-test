import React from "react";
import Spacing from "@/components/shared/Spacing";
import Section01 from "@/components/shared/Section01";
import Image from "@/components/shared/Image";

import { IMAGES } from "@/constants/images";
import classNames from "classnames/bind";
import styles from "./HomePage.module.scss";
const cx = classNames.bind(styles);

const HomePage = () => {
  console.log(IMAGES.Onboarding_1);
  return (
    <div className={cx("txt-box")}>
      <Spacing size={82} />
      <Section01 title="당신을 위한/n최적의 전세 대출을/n찾아드릴게요">
        <Spacing size={18} />
        <span>최신 정보를 바탕으로</span>
        <span>맞춤형 대출 솔루션을 제공받으세요</span>
        <Spacing size={52} />
        <Image imageInfo={IMAGES?.Onboarding_1} />
      </Section01>
    </div>
  );
};

export default HomePage;
