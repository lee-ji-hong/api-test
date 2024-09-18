// controller 만들어서 컴포넌트 나눌 예정
import { CSSTransition } from "react-transition-group";
import { useState } from "react";
import ReportList from "@/components/shared/ReportList";
import Spacing from "@/components/shared/Spacing";
import Section01 from "@/components/shared/Section01";
import Header from "@/components/sections/Header";
import Button from "@/components/shared/Button";
import Badge2 from "@/components/shared/Badge2";
import Image from "@/components/shared/Image";
import Text from "@/components/shared/Text";
import { useInternalRouter } from "@/hooks/useInternalRouter";
import { IMAGES } from "@/constants/images";
import classNames from "classnames/bind";
import styles from "./ReportPage.module.scss";
const cx = classNames.bind(styles);

const feeData = [
  { label: "대출 취급 수수료", amount: "200,000원" },
  { label: "인지세", amount: "90,000원" },
  { label: "보증보험료", amount: "10,291원" },
  { label: "기타 비용 1", amount: "50,000원" },
  { label: "기타 비용 2", amount: "30,000원" },
  { label: "기타 비용 3", amount: "25,000원" },
  { label: "기타 비용 4", amount: "15,000원" },
  { label: "기타 비용 5", amount: "12,000원" },
];

const ReportPage = () => {
  const [showMore, setShowMore] = useState(false);
  const [showPage, setShowPage] = useState(true);
  const router = useInternalRouter();

  const handleToggle = () => {
    setShowMore(!showMore);
  };

  const handleCancelClick = () => {
    setShowPage(false);
    setTimeout(() => {
      router.push("/deposit-entry");
      alert("취소버튼입니다");
    }, 200);
  };

  return (
    <>
      <Header className={cx("cancel")} onRightClick={() => alert("취소버튼입니다")} right="Cancel_btn" />
      <CSSTransition
        in={showPage}
        timeout={500}
        classNames={{
          enter: cx("page-enter"),
          enterActive: cx("page-enter-active"),
          exit: cx("page-exit"),
          exitActive: cx("page-exit-active"),
        }}
        unmountOnExit>
        <div>
          {/* Section01 */}
          <Section01 className={cx("section")}>
            <Spacing size={65} />
            <div className={cx("section-wrap")}>
              <Image className={cx("img-logo")} imageInfo={IMAGES?.LoanBankDummyIcon} />
              <Text className={cx("txt-top")} text="HUG 청년전용/n버팀목전세자금 대출" />
              <Spacing size={10} />
              {["#20대인기상품", "#초저금리", "#최대한도"].map((item, index) => (
                <Badge2 key={index} title={item} />
              ))}
              <Spacing size={35} />
              <div className={cx("section-bottom")}>
                <div>
                  <Text className={cx("bottom-txt-title")} text="최대한도" />
                  <Text className={cx("bottom-txt-sub")} text="4억원" />
                </div>
                <div>
                  <Text className={cx("bottom-txt-title")} text="금리" />
                  <Text className={cx("bottom-txt-sub")} text="2.4%" />
                </div>
              </div>
            </div>
          </Section01>
          {/* Section02 */}
          <div className={cx("box")}>
            <Spacing size={70} />
            <Text
              className={cx("txt-title")}
              text="내가 4억원 대출시/n약 3,000,291원의 이자를 내요!"
              highlight="4억원"
            />
            <div>프로그레스 바 자리</div>
          </div>
          {/* Section03 */}
          <div className={cx("box")}>
            <Spacing size={70} />
            <Text
              className={cx("txt-title")}
              text="4억원 대출시 약 800,291원의/n부수비용이 들어가요!"
              highlight="800,291원"
            />
            <ReportList list={feeData} show={showMore} />
            <button className={cx("list-button")} onClick={handleToggle}>
              {showMore ? "부수 비용 더 보기 ∧" : "부수 비용 더 보기 ∨"}
            </button>
          </div>
          {/* Section04 */}
          <div className={cx("box")}>
            <Spacing size={70} />
            <Text className={cx("txt-title")} text="전세 대출을 하게 되면/n한달에 외식을 10번을 더 줄여야해요!" />
            <Spacing size={8} />
            <Text className={cx("txt-sub")} text="숨겨진 비용까지 철저히 분석하여/n현명한 결정을 할 수 있어요" />
            <Spacing size={8} />
            <Image className={cx("img")} imageInfo={IMAGES?.Report_1} />
          </div>
          {/* Section05 */}
          <div className={cx("box")}>
            <Spacing size={70} />
            <Text
              className={cx("txt-title")}
              text="이 대출을 추천한 이유는/n#20대 인기상품 #초저금리 #최대한도"
              highlight="#20대 인기상품 #초저금리 #최대한도"
            />
            <Spacing size={16} />
            <div>박스 UI</div>
          </div>
          {/* Section06 */}
          <div className={cx("box")}>
            <Spacing size={70} />
            <Text
              className={cx("txt-title")}
              text="이 대출을 추천한 이유는/n#20대 인기상품 #초저금리 #최대한도"
              highlight="#20대 인기상품 #초저금리 #최대한도"
            />
            <Spacing size={8} />
            <Text className={cx("txt-sub")} text="숨겨진 비용까지 철저히 분석하여/n현명한 결정을 할 수 있어요" />
            <div>박스 UI</div>
          </div>
          <Spacing size={60} />
          <Button className={cx("button-wrap")} onClick={handleCancelClick} title="전월세 대출 상품 확인하러 가기" />
          <Spacing size={14} />
        </div>
      </CSSTransition>
    </>
  );
};

export default ReportPage;
