import { CSSTransition } from "react-transition-group";
import { useState, useRef, useEffect } from "react";
import Spacing from "@/components/shared/Spacing";
import Section01 from "@/components/shared/Section01";
import Header from "@/components/sections/Header";
import Button from "@/components/shared/Button";
import Image from "@/components/shared/Image";
import Text from "@/components/shared/Text";
import Box from "@/components/shared/Box";
import { useInternalRouter } from "@/hooks/useInternalRouter";
import { useAuth } from "@/hooks/useAuth";
import { IMAGES } from "@/constants/images";
import classNames from "classnames/bind";
import styles from "./HomePage.module.scss";
import { useLogEvent } from "@/utils/firebaseLogEvent";
const cx = classNames.bind(styles);

const HomePage = () => {
  const [showPage, setShowPage] = useState(true);
  const router = useInternalRouter();
  const nodeRef = useRef(null);
  const { auth } = useAuth();

  const logEvent = useLogEvent();

  useEffect(() => {
    logEvent("홈페이지 진입", {
      page_title: "./HomePage",
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
  }, []);

  useEffect(() => {
    if (auth) {
      router.push("/deposit-entry");
    }
  }, [auth]);

  const handleCancelClick = () => {
    setShowPage(false);
    setTimeout(() => {
      router.push("/deposit-entry");
    }, 200);
  };

  return (
    <>
      <Header className={cx("cancel")} onRightClick={handleCancelClick} right="Cancel_btn" />
      <CSSTransition
        in={showPage}
        timeout={500}
        nodeRef={nodeRef}
        classNames={{
          enter: cx("page-enter"),
          enterActive: cx("page-enter-active"),
          exit: cx("page-exit"),
          exitActive: cx("page-exit-active"),
        }}
        unmountOnExit>
        <div ref={nodeRef} data-testid="home-page">
          <Section01 className={cx("section")} title="당신을 위한/n최적의 전세 대출을/n찾아드릴게요">
            <Spacing size={18} />
            <Text className={cx("txt-box")} text="최신 정보를 바탕으로/n맞춤형 대출 솔루션을 제공받으세요" />
            <Text className={cx("txt-grey")} text="*신용 점수에 전혀 영향이 없어요" />
            <Spacing size={52} />
            <Image className={cx("top-img-1")} imageInfo={IMAGES?.Onboarding_1} />
          </Section01>
          <Box>
            <div>
              <Text
                className={cx("txt-title")}
                text="간단한 정보 입력으로/n맞춤형 전세 대출을 추천드려요"
                highlight="맞춤형 전세 대출"
              />
              <Spacing size={8} />
              <Text className={cx("txt-sub")} text="설정한 전세 대출 금액에 따라/n최적의 조건을 추천드릴 수 있어요" />
            </div>

            <Image className={cx("img")} imageInfo={IMAGES?.Onboarding_2} />
          </Box>
          <Spacing size={34} />
          <Box>
            <div>
              <Text
                className={cx("txt-title")}
                text="부수비용 및 기회비용까지/n리포트로 제공드려요"
                highlight="리포트"
              />
              <Spacing size={8} />
              <Text className={cx("txt-sub")} text="숨겨진 비용까지 철저히 분석하여/n현명한 결정을 할 수 있어요" />
            </div>
            <Image className={cx("img")} imageInfo={IMAGES?.Onboarding_3} />
          </Box>
          <Spacing size={34} />
          <Box>
            <div>
              <Text
                className={cx("txt-title")}
                text="선택한 대출 상품에 대해/n무료 상담까지 가능해요"
                highlight="무료 상담"
              />
              <Spacing size={8} />
              <Text className={cx("txt-sub")} text="궁금한 점,/n다 물어보고 대출을 선택하세요" />
            </div>
            <Image className={cx("img")} imageInfo={IMAGES?.Onboarding_4} />
          </Box>
          <Spacing size={60} />
          <Button
            className={cx("button-wrap")}
            onClick={() => router.push("/deposit-entry")}
            title="전월세 대출 상품 확인하러 가기"
          />
          <Spacing size={14} />
        </div>
      </CSSTransition>
    </>
  );
};

export default HomePage;
