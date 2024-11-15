import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import { OptionItem, OptionsType } from "@/models";
import { useRecoilState } from "recoil";

import ResultInfo from "@/components/sections/Calculator/ResultInfo";
import SelectBottomSheet from "@/components/modal/SelectBottomSheet";
import Section02 from "@/components/shared/Section02";
import Spacing from "@/components/shared/Spacing";
import Button from "@/components/shared/Button";
import Text from "@/components/shared/Text";

import { useSendDtiCalc } from "@/hooks/queries/useSendDtiCalc";
import { validateFormData } from "./validateFormData";
import { sendDtiCalcRequest } from "@/models";
import { dtiCalcState, periodState } from "@/recoil/atoms";
import { getLabelFromOptions } from "@/utils/getLabelFromOptions";
import { resultState, repaymentOptions } from "./options";
import { INPUTS } from "./INPUTS";

import styles from "../CalculatorPage.module.scss";
import classNames from "classnames/bind";
import { useLayoutEffect } from "react";
import { formatNumber } from "@/utils/formatters";
const cx = classNames.bind(styles);

const DTICalculator = () => {
  const [DtiCalc] = useRecoilState<sendDtiCalcRequest>(dtiCalcState);
  const [focusedInput, setFocusedInput] = useState("");
  const [isKeyboardModalOpen, setIsKeyboardModalOpen] = useState(false);
  const [, setSelectedBadge] = useRecoilState(periodState);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [contents, setContents] = useState(resultState);
  const [bottomOffset, setBottomOffset] = useState(0);
  const [toggle, setToggle] = useState(false);
  const scrollToResult = () => {
    if (resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  const { DtiCalcInfo, infoItem } = useSendDtiCalc(scrollToResult);
  const inputRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const resultRef = useRef<HTMLDivElement>(null);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setFocus,
    reset,
  } = useForm({
    defaultValues: DtiCalc,
    values: DtiCalc,
    mode: "onChange",
  });

  useLayoutEffect(() => {
    if (infoItem) scrollToResult();
  }, [infoItem]);

  useEffect(() => {
    const calculateKeyboardHeight = () => {
      if (focusedInput) {
        const height = (window.innerHeight * 0.4 - 207) / 7;
        setKeyboardHeight(height);
      }

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
    const element = inputRefs.current[focusedInput];
    if (element && bottomOffset !== 0) {
      let topPosition = 0;
      if (focusedInput === "interestRate") {
        topPosition = element.getBoundingClientRect().top + window.pageYOffset;
      } else if (focusedInput === "loanTerm") {
        topPosition = element.getBoundingClientRect().top + window.pageYOffset + 70;
      } else {
        topPosition = element.getBoundingClientRect().top + window.pageYOffset + 50;
      }

      window.scrollTo({
        top: topPosition - bottomOffset,
        behavior: "smooth",
      });
    }
  }, [isKeyboardModalOpen, bottomOffset]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    if (!validateFormData(data, setFocus)) return;
    setContents((prev) => ({
      ...prev,
      details: {
        ...prev.details,
        annualIncome: data.annualIncome * 10000,
        loanAmount: data.loanAmount * 10000,
        interestRate: data.interestRate,
        loanTerm: data.loanTerm,
        yearlyLoanInterestRepayment: data.yearlyLoanInterestRepayment * 10000,
        repaymentType: getLabelFromOptions(data.repaymentType, repaymentOptions) as string,
      },
    }));
    const updatedFormData = {
      ...data,
      annualIncome: (data.annualIncome ?? 0) * 10000,
      loanAmount: (data.loanAmount ?? 0) * 10000,
      interestRate: data.interestRate ?? 0,
      loanTerm: data.loanTerm ?? 0,
      yearlyLoanInterestRepayment: (data.yearlyLoanInterestRepayment ?? 0) * 10000,
    };
    DtiCalcInfo(updatedFormData as sendDtiCalcRequest);
  };

  const onClose = () => {
    setIsKeyboardModalOpen(false);
    setFocusedInput("");
  };

  const handleReset = () => {
    reset();
  };

  const handleBadgeSelect = (item: string) => {
    setSelectedBadge(item);
  };

  const content = `
주택담보대출 차주의 원리금상환능력을 감안하여 주택담보대출 한도를 설정하기 위해 도입된 규제 비율이다.<br>
[은행업 감독규정]에서는 동 비율을 “DTI = (해당 주택담보대출의 연간 원리금 상환액 + 기타부채의 연간 이자상환액) / 연소득 × 100” 방식으로 산정하도록 하고 있다.<br>
DTI(Debt to Income ratio) 규제는 LTV 규제 강화의 후속조치로 2005년 8월 도입되었으며, 이는 차주의 소득수준과 관계없이 주택가격에 비례하여 주택담보대출 한도가 결정되는 LTV 규제의 문제점을 보완하고자 도입한 것이다.<br>
특히 과도한 가계부채의 증가 억제 및 주택자금 수요 축소 등을 위해 DTI 비율을 특정수준 이내로 제한하기도 한다.<br>
한편, DTI는 LTV와 함께 대표적인 거시건전성정책의 수단으로서 통화신용정책과 상호 보완적인 관계를 가지고 있다.<br>
예를 들어 저금리 하에서 주택가격 상승세가 확대될 경우 DTI 및 LTV 규제를 강화하면 주택담보대출 한도가 축소되어 주택시장 과열을 억제하는 효과를 기대할 수 있다.<br><br>
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
        <Text className={cx("txt-title")} text="DTI란?" />
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
            const isOptionsType = (options: OptionItem[] | OptionsType | undefined): options is OptionsType => {
              return options !== undefined && "year" in options && "month" in options;
            };
            return (
              <div ref={(el) => (inputRefs.current[item.name] = el)} key={item.id}>
                <Section02 title={item.label} isPeriodBadge={item?.isPeriod} onClick={handleBadgeSelect}>
                  <Component
                    id={item.name}
                    formFieldName={item.name as keyof sendDtiCalcRequest}
                    control={control}
                    options={isOptionsType(item.options) ? item.options : (item.options as OptionItem[])}
                    min={item.limit?.min}
                    max={item.limit?.max}
                    unit={item?.unit}
                    formattedAmount={item?.formattedAmount}
                    onFocus={() => {
                      setIsKeyboardModalOpen(true);
                      setFocusedInput(item.name);
                    }}
                    onBlur={onClose}
                    keyboardHeight={focusedInput === item.name ? keyboardHeight : 0}
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
            <Button className={cx("button")} title="계산하기" type="submit" disabled={isSubmitting} />
          </div>
        </>
      </form>

      {infoItem &&
        (console.log(`21asd${infoItem.annualIncome}`),
        (
          <>
            <div className={cx("hr")}></div>
            <ResultInfo
              availableLoanAmount={infoItem.annualRepaymentInterest}
              ltvRatio={infoItem.dtiRatio}
              contents={contents}>
              <div className={cx("box-txt-container")}>
                <Text className={cx("box-txt-left")} text="DTI" />
                <Text className={cx("box-txt-right")} text={infoItem?.dtiRatio + "%"} />
              </div>
              <div className={cx("box-txt-container")}>
                <Text className={cx("box-txt-left")} text="연 원리금 상환액" />
                <Text className={cx("box-txt-right")} text={formatNumber(infoItem?.annualRepaymentAmount) + "원"} />
              </div>
            </ResultInfo>
          </>
        ))}
      {isKeyboardModalOpen ? <Spacing size={bottomOffset} /> : <Spacing size={70} />}
      {toggle && (
        <SelectBottomSheet modalTitle="DTI란?" titleAlign="flex-start" onClose={() => setToggle(false)}>
          <span className={cx("txt-sub")} dangerouslySetInnerHTML={{ __html: content }} />
        </SelectBottomSheet>
      )}
      <div ref={resultRef}></div>
    </div>
  );
};

export default DTICalculator;
