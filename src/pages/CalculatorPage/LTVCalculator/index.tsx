import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import { DevTool } from "@hookform/devtools";
import { useRecoilState } from "recoil";

import SelectBottomSheet from "@/components/modal/SelectBottomSheet";
import Section02 from "@/components/shared/Section02";
import Spacing from "@/components/shared/Spacing";
import Button from "@/components/shared/Button";
import Text from "@/components/shared/Text";

import { useSendLtvCalc } from "@/hooks/queries/useSendLtvCalc";
import { validateFormData } from "./validateFormData";
import { sendLtvCalcRequest } from "@/models";
import { ltvCalcState } from "@/recoil/atoms";
import { INPUTS } from "./INPUTS";

import styles from "../CalculatorPage.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const LTVCalculator = () => {
  const [ltvCalc] = useRecoilState<sendLtvCalcRequest>(ltvCalcState);
  const [toggle, setToggle] = useState(false);
  const [isKeyboardModalOpen, setIsKeyboardModalOpen] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [bottomOffset, setBottomOffset] = useState(0);
  const { LtvCalcInfo } = useSendLtvCalc();

  const inputRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
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
      const topPosition = element.getBoundingClientRect().top + window.pageYOffset;
      console.log(bottomOffset);
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
  const content =
    "LTV는 'Loan to Value'의 약자로, 대출금액과 부동산 가치의 비율을 나타냅니다. LTV는 대출 심사 시 중요한 지표로, 대출자가 얼마나 많은 자금을 담보로 제공하는지대출금액과 부동산 가치의 비율을 나타냅니다.";
  return (
    <div>
      <div className={cx("reason-box")}>
        <Text className={cx("txt-title")} text="LTV란?" />
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
                <Section02 title={item.label}>
                  <Component
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
            <Button className={cx("button")} title="계산하기" type="submit" disabled={isSubmitting} />
          </div>
        </>
      </form>
      {isKeyboardModalOpen ? <Spacing size={bottomOffset} /> : <Spacing size={70} />}
      {toggle && (
        <SelectBottomSheet modalTitle="LTV란?" titleAlign="flex-start" onClose={() => setToggle(false)}>
          <span className={cx("txt-sub")}> {content} </span>
        </SelectBottomSheet>
      )}
      <DevTool control={control} />
    </div>
  );
};

export default LTVCalculator;
