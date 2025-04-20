import { FieldValues, SubmitHandler, useForm, useWatch } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
// import { DevTool } from "@hookform/devtools";
import { useRecoilState } from "recoil";

import ResultInfo from "@/components/sections/Calculator/ResultInfo";
import SelectBottomSheet from "@/components/modal/SelectBottomSheet";
import Section02 from "@/components/shared/Section02";
import Spacing from "@/components/shared/Spacing";
import Button from "@/components/shared/Button";
import Text from "@/components/shared/Text";

import { useSendLtvCalc } from "@/hooks/queries/useSendLtvCalc";
import { validateFormData } from "./validateFormData";
import { sendLtvCalcRequest } from "@/models";
import { ltvCalcState } from "@/recoil/atoms";
import { getLabelFromOptions } from "@/utils/getLabelFromOptions";
import { resultState, loanPurposeOptions, houseOwnershipTypeOptions, regionTypeOptions } from "./ltvOptions";
import { INPUTS } from "./INPUTS";

import styles from "../CalculatorPage.module.scss";
import classNames from "classnames/bind";
import { useLayoutEffect } from "react";
import { formatNumber } from "@/utils/formatters";
const cx = classNames.bind(styles);

const LTVCalculator = () => {
  const [ltvCalc] = useRecoilState<sendLtvCalcRequest>(ltvCalcState);
  const [toggle, setToggle] = useState(false);
  const [isKeyboardModalOpen, setIsKeyboardModalOpen] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [bottomOffset, setBottomOffset] = useState(0);
  const [contents, setContents] = useState(resultState);
  const scrollToResult = () => {
    if (resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };
  const { LtvCalcInfo, infoItem } = useSendLtvCalc(scrollToResult);

  const inputRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const resultRef = useRef<HTMLDivElement>(null);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setFocus,
    reset,
  } = useForm({
    defaultValues: ltvCalc,
    values: ltvCalc,
    mode: "onChange",
  });

  const formValues = useWatch({ control });
  const isFormComplete = Object.values(formValues).every((value) => value !== undefined && value !== "");

  useLayoutEffect(() => {
    if (infoItem) scrollToResult();
  }, [infoItem]);

  useEffect(() => {
    const calculateKeyboardHeight = () => {
      const height = (window.innerHeight * 0.4 - 207) / 7;
      setKeyboardHeight(height);

      if (!isKeyboardModalOpen) {
        setBottomOffset(0);
        setKeyboardHeight(0);
      } else {
        if (window.innerWidth < 380) {
          setBottomOffset(window.innerHeight * 0.4 - 5);
        }
        setBottomOffset(window.innerHeight * 0.4 + 15);
      }
    };

    window.addEventListener("resize", calculateKeyboardHeight);
    calculateKeyboardHeight();
    return () => {
      window.removeEventListener("resize", calculateKeyboardHeight);
    };
  }, [isKeyboardModalOpen]);

  useEffect(() => {
    const element = inputRefs.current["collateralValue"];
    if (element && bottomOffset !== 0) {
      const topPosition = element.getBoundingClientRect().top + window.pageYOffset + 50;
      window.scrollTo({
        top: topPosition - bottomOffset,
        behavior: "smooth",
      });
    }
  }, [isKeyboardModalOpen, bottomOffset]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!validateFormData(data, setFocus)) return;
    setContents((prev) => ({
      ...prev,
      details: {
        ...prev.details,
        collateralValue: data.collateralValue,
        loanPurpose: getLabelFromOptions(data.loanPurpose, loanPurposeOptions) as string,
        houseOwnershipType: getLabelFromOptions(data.houseOwnershipType, houseOwnershipTypeOptions) as string,
        regionType: getLabelFromOptions(data.regionType, regionTypeOptions) as string,
      },
    }));
    const updatedFormData = {
      ...data,
      collateralValue: (data.collateralValue ?? 0) * 10000,
    };
    LtvCalcInfo(updatedFormData as sendLtvCalcRequest);
  };

  const onClose = () => {
    setTimeout(() => {
      setIsKeyboardModalOpen(false);
    }, 100);
  };

  const handleReset = () => {
    reset();
  };

  const content = `
  자산의 담보가치에 대한 대출 비율을 의미하며, 우리나라에서는 주택가격에 대한 대출 비율로 많이 알려져 있다.<br>
  예를 들어 아파트 감정가격이 5억원이고 담보인정비율이 70%이면 금융기관으로부터 3억 5천만원의 주택담보대출을 받을 수 있다.<br>
  [은행업 감독업무시행세칙]에서는 주택담보대출의 담보인정비율 산정방식을 다음과 같이 제시하고 있다.<br>
  담보인정비율 = (주택담보대출 + 선순위채권 + 임차보증금 및 최우선변제 소액임차보증금) / 담보가치 × 100.<br>
  여기서 담보가치는 다음 중 금융기관 자율로 선택하여 적용한다.<br>
  ① 국세청 기준시가<br>
  ② 한국감정원 등 전문감정기관의 감정평가액<br>
  ③ 한국감정원의 층별·호별 격차율 지수로 산정한 가격<br>
  ④ KB부동산시세의 일반거래가격<br>
  당초 LTV(Loan to Value ratio) 규제는 은행권을 중심으로 내규에 반영하여 자율적으로 시행해 오다가,<br>
  금융기관의 경영 안정성 유지, 주택가격 안정화 등을 위한 주택담보대출 규모의 관리 필요성이 제기되면서 감독규제 수단으로 도입되었다.<br>
  최근에는 가계부채 증가 억제 및 부동산경기 조절 등 거시건전성정책 수단으로 활용되고 있으며,<br>
  금융기관별, 지역별로 세분화하여 차등 적용되고 있다.<br>
  한편, 금융기관은 담보인정비율(LTV)과 차주의 부채상환능력을 나타내는 총부채상환비율(DTI)을 함께 고려하여 대출규모를 결정한다.<br><br>
  - 출처: 한국은행
  `;

  // HTML 태그 제거 함수
  const stripHtml = (html: string) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  const plainText = stripHtml(content); // HTML 태그 제거 후 텍스트 추출

  return (
    <div>
      <div className={cx("reason-box")}>
        <Text className={cx("txt-title")} text="LTV란?" />
        <div>
          <span className={cx("txt-sub")}>{plainText.substring(0, 100)}...</span>
          <button onClick={() => setToggle(!toggle)}>
            <Text className={cx("txt-sub")} text={"\u00A0\u00A0\u00A0\u00A0더보기"} highlight="더보기" />
          </button>
        </div>
      </div>
      <form className={cx("form-container")} onSubmit={handleSubmit(onSubmit)}>
        <>
          {INPUTS.map((item, ...rest) => {
            const Component = item.component;
            return (
              <div ref={(el) => (inputRefs.current[item.name] = el)} key={item.id}>
                <Section02 title={item.label}>
                  <Component
                    id={item.name}
                    formFieldName={item.name as keyof sendLtvCalcRequest}
                    control={control}
                    options={item.options}
                    min={item.limit?.min}
                    max={item.limit?.max}
                    onFocus={() => setIsKeyboardModalOpen(true)}
                    onBlur={onClose}
                    keyboardHeight={keyboardHeight}
                    {...rest}
                  />
                </Section02>
              </div>
            );
          })}
          <Spacing size={50} />
          <div className={cx("button-wrap")}>
            <Button
              className={cx("button")}
              title="초기화"
              type="button"
              disabled={isSubmitting}
              theme="light"
              onClick={handleReset}
            />
            <Button
              className={cx("button")}
              title="계산하기"
              type="submit"
              disabled={isSubmitting || !isFormComplete}
            />
          </div>
        </>
      </form>

      {infoItem && (
        <>
          <div className={cx("hr")}></div>
          <ResultInfo
            contents={contents}
            ltvRatio={infoItem?.ltvRatio}
            availableLoanAmount={infoItem?.possibleLoanAmount}>
            <div className={cx("box-txt-container")}>
              <Text className={cx("box-txt-left")} text="LTV" />
              <Text className={cx("box-txt-right")} text={infoItem?.ltvRatio + "%"} />
            </div>
            <div className={cx("box-txt-container")}>
              <Text className={cx("box-txt-left")} text="예상대출가능금액" />
              <Text className={cx("box-txt-right")} text={formatNumber(infoItem?.possibleLoanAmount) + "원"} />
            </div>
          </ResultInfo>
        </>
      )}
      {isKeyboardModalOpen ? <Spacing size={bottomOffset} /> : <Spacing size={70} />}
      {toggle && (
        <SelectBottomSheet modalTitle="LTV란?" titleAlign="flex-start" onClose={() => setToggle(false)}>
          <span className={cx("txt-sub")} dangerouslySetInnerHTML={{ __html: content }} />
        </SelectBottomSheet>
      )}

      <div ref={resultRef}></div>
      {/* <DevTool control={control} /> */}
    </div>
  );
};

export default LTVCalculator;
