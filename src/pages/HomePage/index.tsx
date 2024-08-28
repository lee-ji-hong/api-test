import { useNavigate } from "react-router-dom";
import Spacing from "@/components/shared/Spacing";
import Section01 from "@/components/shared/Section01";
import Image from "@/components/shared/Image";
import Text from "@/components/shared/Text";
import Box from "@/components/shared/Box";
import Button from "@/components/shared/Button";

import { IMAGES } from "@/constants/images";
import classNames from "classnames/bind";
import styles from "./HomePage.module.scss";
const cx = classNames.bind(styles);

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Section01 className={cx("section")} title="당신을 위한/n최적의 전세 대출을/n찾아드릴게요">
        <div onClick={() => navigate("/deposit-entry")}>
          <Image className={cx("cancel")} imageInfo={IMAGES?.Cancel_btn} />
        </div>
        <Spacing size={18} />
        <Text className={cx("txt-box")} text="최신 정보를 바탕으로/n맞춤형 대출 솔루션을 제공받으세요" />
        <Spacing size={52} />
        <Image className={cx("top-img")} imageInfo={IMAGES?.Onboarding_1} />
      </Section01>
      <Box>
        <Text
          className={cx("txt-title")}
          text="간단한 정보 입력으로/n맞춤형 전세 대출을 추천드려요"
          highlight="맞춤형 전세 대출"
        />
        <Text className={cx("txt-sub")} text="설정한 전세 대출 금액에 따라/n최적의 조건을 추천드릴 수 있어요" />
        <Image className={cx("img")} imageInfo={IMAGES?.Onboarding_2} />
      </Box>
      <Spacing size={34} />
      <Box>
        <Text className={cx("txt-title")} text="부스비용 및 기회비용까지/n리포트로 제공드려요" highlight="리포트" />
        <Text className={cx("txt-sub")} text="숨겨진 비용까지 철저히 분석하여/n현명한 결정을 할 수 있어요" />
        <Image className={cx("img")} imageInfo={IMAGES?.Onboarding_3} />
      </Box>
      <Spacing size={34} />
      <Box>
        <Text
          className={cx("txt-title")}
          text="선택한 대출 상품에 대해/n무료 상담까지 가능해요"
          highlight="무료 상담"
        />
        <Text className={cx("txt-sub")} text="궁금한 점,/n다 물어보고 대출을 선택하세요" />
        <Image className={cx("img")} imageInfo={IMAGES?.Onboarding_4} />
      </Box>
      <Spacing size={60} />
      <Button onClick={() => navigate("/deposit-entry")} title="전월세 대출 상품 확인하러 가기" />
      <Spacing size={14} />
    </div>
  );
};

export default HomePage;
