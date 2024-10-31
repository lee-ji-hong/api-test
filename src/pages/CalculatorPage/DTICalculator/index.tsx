import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
// import { DevTool } from "@hookform/devtools";
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
import { dtiCalcState } from "@/recoil/atoms";
import { getLabelFromOptions } from "@/utils/getLabelFromOptions";
import { resultState, repaymentOptions } from "./options";
import { INPUTS } from "./INPUTS";

import styles from "../CalculatorPage.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const DTICalculator = () => {
  const [DtiCalc] = useRecoilState<sendDtiCalcRequest>(dtiCalcState);
  const [toggle, setToggle] = useState(false);
  const [isKeyboardModalOpen, setIsKeyboardModalOpen] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [bottomOffset, setBottomOffset] = useState(0);
  const [contents, setContents] = useState(resultState);
  const { DtiCalcInfo, infoItem } = useSendDtiCalc();

  const inputRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
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
    const element = inputRefs.current["annualIncome"];
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
        // collateralValue: data.collateralValue,
        repaymentType: getLabelFromOptions(data.repaymentType, repaymentOptions) as string,
      },
    }));
    const updatedFormData = {
      ...data,
      annualIncome: (data.annualIncome ?? 0) * 10000,
      loanAmount: (data.annualIncome ?? 0) * 10000,
      interestRate: (data.annualIncome ?? 0) * 10000,
      loanTerm: (data.annualIncome ?? 0) * 10000,
      yearlyLoanInterestRepayment: (data.annualIncome ?? 0) * 10000,
    };
    DtiCalcInfo(updatedFormData as sendDtiCalcRequest);
  };

  const onClose = () => {
    setTimeout(() => {
      setIsKeyboardModalOpen(false);
    }, 100);
  };

  const handleReset = () => {
    reset();
  };
  const content =
    "DTI는 주택담보대출의 연간 원리금의 상환액과 기타 부채에 대해 연간 상환한 이자의 합을 연소득으로 나눈 비율을 말합니다. 담보대출을 받을 경우, 채무자의 소득 중 얼마나 대출 상환에 할애되는지를 나타냅니다. DTI가 높을수록 소득 대비 부채 부담이 큰 상태로, 금융기관은 DTI를 기준으로 대출 한도를 결정하여 채무자의 상환 능력을 평가합니다. ";
  return (
    <div>
      <div className={cx("reason-box")}>
        <Text className={cx("txt-title")} text="DTI란?" />
        <div>
          <span className={cx("txt-sub")}>{content.substring(0, 100)}...</span>
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
                <Section02 title={item.label} isPeriodBadge={item?.isPeriod}>
                  <Component
                    formFieldName={item.name as keyof sendDtiCalcRequest}
                    control={control}
                    options={item.options}
                    min={item.limit?.min}
                    max={item.limit?.max}
                    unit={item?.unit}
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
            <Button className={cx("button")} title="계산하기" type="submit" disabled={isSubmitting} />
          </div>
        </>
      </form>

      {infoItem && (
        <>
          <div className={cx("hr")}></div>
          <ResultInfo contents={contents}>
            <div className={cx("box-txt-container")}>
              <Text className={cx("box-txt-left")} text="LTV" />
              <Text className={cx("box-txt-right")} text={infoItem?.dtiRatio} />
            </div>
            <div className={cx("box-txt-container")}>
              <Text className={cx("box-txt-left")} text="예상대출가능금액" />
              <Text className={cx("box-txt-right")} text={infoItem?.annualRepaymentAmount} />
            </div>
          </ResultInfo>
        </>
      )}
      {isKeyboardModalOpen ? <Spacing size={bottomOffset} /> : <Spacing size={70} />}
      {toggle && (
        <SelectBottomSheet modalTitle="DTI란?" titleAlign="flex-start" onClose={() => setToggle(false)}>
          <span className={cx("txt-sub")}> {content} </span>
        </SelectBottomSheet>
      )}
    </div>
  );
};

export default DTICalculator;
