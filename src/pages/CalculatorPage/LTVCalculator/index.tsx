import { useState } from "react";
import { useRecoilState } from "recoil";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

import ExpandableCard from "@/components/shared/ExpandableCard";
import KeyboardModal from "@/components/modal/KeyboardModal";
import Section02 from "@/components/shared/Section02";
import Spacing from "@/components/shared/Spacing";
import Button from "@/components/shared/Button";

import { validateFormData } from "./validateFormData";
import { sendLtvCalcRequest } from "@/models";
import { ltvCalcState } from "@/recoil/atoms";
import { INPUTS } from "./INPUTS";

import styles from "../CalculatorPage.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const LTVCalculator = () => {
  const [ltvCalc] = useRecoilState<sendLtvCalcRequest>(ltvCalcState);
  const [isKeyboardModalOpen, setIsKeyboardModalOpen] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setFocus,
  } = useForm({
    defaultValues: ltvCalc,
    values: ltvCalc,
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!validateFormData(data, setFocus)) return;
  };

  const handleKeyPress = (key: string) => {
    console.log(`Key pressed: ${key}`);
  };

  const onClose = () => {
    setTimeout(() => {
      setIsKeyboardModalOpen(false);
    }, 100);
  };

  return (
    <div>
      <ExpandableCard
        title="LTV란?"
        content="LTV는 'Loan to Value'의 약자로, 대출금액과 부동산 가치의 비율을 나타냅니다. LTV는 대출 심사 시 중요한 지표로, 대출자가 얼마나 많은 자금을 담보로 제공하는지대출금액과 부동산 가치의 비율을 나타냅니다."
      />
      <form className={cx("form-container")} onSubmit={handleSubmit(onSubmit)}>
        <>
          {INPUTS.map((item, ...rest) => {
            const Component = item.component;
            const handleFocus = () => {
              if (item.label === "담보가치") {
                setIsKeyboardModalOpen(true);
              } else {
                setIsKeyboardModalOpen(false);
              }
            };
            return (
              <Section02 key={item.id} title={item.label}>
                <Component
                  formFieldName={item.name as keyof sendLtvCalcRequest}
                  control={control}
                  options={item.options}
                  min={item.limit?.min}
                  max={item.limit?.max}
                  onFocus={handleFocus}
                  {...rest}
                />
              </Section02>
            );
          })}
          <Spacing size={50} />
          <div className={cx({ fixed: isKeyboardModalOpen })} onClick={() => onClose()}>
            <Button className={cx("button-wraps")} title="리포트 확인하기" type="submit" disabled={isSubmitting} />
            {isKeyboardModalOpen && (
              <KeyboardModal className={cx("keyboard-container")} onKeyPress={handleKeyPress} keyboardHeight={20} />
            )}
          </div>
        </>
      </form>
      <Spacing size={70} />

      <DevTool control={control} />
    </div>
  );
};

export default LTVCalculator;
