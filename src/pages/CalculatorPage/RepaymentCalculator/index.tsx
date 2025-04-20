import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import { OptionItem, OptionsType, sendRepaymentCalcRequest } from "@/models";
import { useRecoilState } from "recoil";

import SelectBottomSheet from "@/components/modal/SelectBottomSheet";
import Section02 from "@/components/shared/Section02";
import Spacing from "@/components/shared/Spacing";
import Button from "@/components/shared/Button";

import { validateFormData } from "./validateFormData";
import { periodState, repaymentCalcState } from "@/recoil/atoms";
// import { getLabelFromOptions } from "@/utils/getLabelFromOptions";
// import { resultState, repaymentOptions } from "./options";
import { INPUTS } from "./INPUTS";

import styles from "../CalculatorPage.module.scss";
import classNames from "classnames/bind";
import { useSendRepaymentCalc } from "@/hooks/queries/useSendRepaymentCalc";
import RepaymentCalcDetail from "./RepaymentDetail";
import { useLayoutEffect } from "react";
const cx = classNames.bind(styles);

const RepaymentCalculator = () => {
  const [ReapymentCalc] = useRecoilState<sendRepaymentCalcRequest>(repaymentCalcState);
  const [focusedInput, setFocusedInput] = useState("");
  const [isKeyboardModalOpen, setIsKeyboardModalOpen] = useState(false);
  const [selectedBadge, setSelectedBadge] = useRecoilState(periodState);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const [bottomOffset, setBottomOffset] = useState(0);
  const [toggle, setToggle] = useState(false);
  const [interestRate, setInterestRate] = useState(0);
  const inputRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const resultRef = useRef<HTMLDivElement>(null);
  const scrollToResult = () => {
    if (resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const { RepaymentCalcInfo, infoItem } = useSendRepaymentCalc(scrollToResult);
  const {
    control,
    watch,
    handleSubmit,
    formState: { isSubmitting },
    setFocus,
    reset,
  } = useForm({
    defaultValues: ReapymentCalc,
    values: ReapymentCalc,
    mode: "onChange",
  });

  useLayoutEffect(() => {
    if (infoItem) scrollToResult();
  }, [infoItem]);

  const formValues = watch();
  const isFormComplete = Object.values(formValues).every((value) => value !== undefined && value !== "");
  useEffect(() => {
    setInterestRate(formValues.interestRatePercentage);
  }, [formValues]); // 값이 변경될 때마다 실행

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
    if (!validateFormData(data, setFocus)) return;

    const updatedFormData = {
      ...data,
      principal: (data.principal ?? 0) * 10000,
      interestRatePercentage: data.interestRatePercentage ?? 0,
      term: selectedBadge == "년" ? data.term * 12 : data.term,
      gracePeriod: selectedBadge == "년" ? data.gracePeriod * 12 : data.gracePeriod,
      repaymentType: data.repaymentType ?? "",
      maturityPaymentAmount: (data.principal ?? 0) * 10000,
    };
    RepaymentCalcInfo(updatedFormData as sendRepaymentCalcRequest);
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

  const content = "매월 얼마씩 갚아야하는지, 대출기간동안 총 상환 금액관 대출이자는 얼마인지 확인해 보세요.";
  return (
    <div>
      {/* <div className={cx("reason-box")}>
        <Text className={cx("txt-title")} text="대출 원리금 계산기란?" />
        <div>
          <span className={cx("txt-sub")}>{content.substring(0, 100)}...</span>
          <button onClick={() => setToggle(!toggle)}>
            <Text className={cx("txt-sub")} text={"\u00A0\u00A0\u00A0\u00A0더보기"} highlight="더보기" />
          </button>
        </div>
      </div> */}
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
                    formFieldName={item.name as keyof sendRepaymentCalcRequest}
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
          <div ref={resultRef}></div>
          <div className={cx("hr")}></div>
          <RepaymentCalcDetail response={infoItem} interestRate={interestRate} />
        </>
      )}
      {isKeyboardModalOpen ? <Spacing size={bottomOffset} /> : <Spacing size={70} />}
      {toggle && (
        <SelectBottomSheet modalTitle="대출 원리금 계산기란?" titleAlign="flex-start" onClose={() => setToggle(false)}>
          <span className={cx("txt-sub")}> {content} </span>
        </SelectBottomSheet>
      )}
    </div>
  );
};

export default RepaymentCalculator;
