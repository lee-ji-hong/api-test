import { useFormContext, useWatch } from "react-hook-form";
import React, { useEffect, useState } from "react";

import styles from "../LoanInfoEntryTypeBPage.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

import { sendLoanAdviceReportRequest } from "@/models";
import { useInternalRouter } from "@/hooks/useInternalRouter";
import Button from "@/components/shared/Button";
import Text from "@/components/shared/Text";
import { INPUTS, SpouseAnnualIncome } from "./INPUTS";
import Spacing from "@/components/shared/Spacing";

interface StepContentProps {
  step: number;
  maritalStatus: sendLoanAdviceReportRequest["maritalStatus"];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  inputs: any[];
  allFieldsFilled: boolean;
  handleInputComplete: (name: string, id: number) => void;
}

export const StepContent: React.FC<StepContentProps> = ({
  step,
  inputs,
  maritalStatus,
  allFieldsFilled,
  handleInputComplete,
}) => {
  const [isKeyboardModalOpen, setIsKeyboardModalOpen] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [bottomOffset, setBottomOffset] = useState(0);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const { control, setFocus } = useFormContext();
  const watchedValues = useWatch({ control });
  const spouseAnnualIncomeValue = useWatch({ control, name: "spouseAnnualIncome" }); // useWatch로 값 감시
  const router = useInternalRouter();

  // 스텝 정보 가져오기
  const stepConfig = inputs.find((input) => input.id === step);

  useEffect(() => {
    const calculateKeyboardHeight = () => {
      const height = (window.innerHeight * 0.4 - 207) / 7;
      setKeyboardHeight(selectedItem !== null ? height : 0);

      if (!isKeyboardModalOpen) {
        setBottomOffset(34);
        setKeyboardHeight(0);
      } else {
        if (window.innerWidth < 380) {
          setBottomOffset(window.innerHeight * 0.5);
        }
        setBottomOffset(window.innerHeight * 0.4 + 55);
        // const newBottomOffset = height < 668 ? height * 0.4 + 15 : height < 900 ? height * 0.4 + 25 : height * 0.4 + 45;
        // setBottomOffset(newBottomOffset);
      }
    };

    window.addEventListener("resize", calculateKeyboardHeight);
    calculateKeyboardHeight();
    return () => {
      window.removeEventListener("resize", calculateKeyboardHeight);
    };
  }, [isKeyboardModalOpen, selectedItem]);

  const onClose = () => {
    setTimeout(() => {
      setIsKeyboardModalOpen(false);
      setSelectedItem(null);
    }, 100);
  };

  // 포커스 이동 및 스크롤 이동
  const focusAndScrollTo = (name: string) => {
    // alert("배우자 연소득을 입력해주세요");
    setFocus(name);
    setTimeout(() => {
      const target = document.querySelector(`input[name="${name}"]`);
      target?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
    setIsKeyboardModalOpen(true);
  };

  // // 현재 스텝에 맞는 필드 가져오기control
  const filteredFields =
    maritalStatus !== "SINGLE" ? [...INPUTS.filter((input) => input.id === 5), SpouseAnnualIncome] : [stepConfig];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderComponent = (stepConfig: any) => {
    const fieldValue = watchedValues[stepConfig.name]; // Get the specific field value
    console.log(fieldValue);
    if (stepConfig && stepConfig.component) {
      const FieldComponent = stepConfig.component;
      return (
        <FieldComponent
          control={control}
          id={stepConfig.id}
          formFieldName={stepConfig.name}
          options={stepConfig.options}
          unit={stepConfig.unit}
          min={stepConfig.limit?.min}
          max={stepConfig.limit?.max}
          onFocus={() => {
            setSelectedItem(stepConfig.id);
            setIsKeyboardModalOpen(true);
          }}
          onBlur={
            stepConfig.id === 7 || stepConfig.id === 4
              ? () => handleInputComplete(stepConfig?.name, stepConfig?.id)
              : onClose
          }
          keyboardHeight={selectedItem === stepConfig.id && keyboardHeight}
        />
      );
    }
    return null;
  };

  if (stepConfig?.id === 5) {
    return (
      <>
        {filteredFields.map((field) => (
          <React.Fragment key={field?.id}>
            <div>
              <Text className={cx("step-txt")} text={field?.modalTitle} />
              <Spacing size={35} />
              {renderComponent(field)}
            </div>
            <Spacing size={50} />
            {/* {isKeyboardModalOpen && <Spacing size={500} />} */}
          </React.Fragment>
        ))}
        <Button
          className={cx("button-wrap-focus")}
          subClassName={cx("button-container")}
          disabled={watchedValues["annualIncome"] === undefined}
          onClick={() => {
            if (allFieldsFilled) {
              router.push("/loan-info-entry", { isRecent: "loan-info-B" });
            } else if (stepConfig.name === "annualIncome" && spouseAnnualIncomeValue === undefined) {
              focusAndScrollTo("spouseAnnualIncome");
            } else {
              handleInputComplete(stepConfig?.name ?? "monthlyRent", stepConfig?.id ?? 1);
            }
          }}
          bottom={bottomOffset}
          title="다음"
        />
        <Spacing size={800} />
      </>
    );
  }

  return (
    <div>
      {stepConfig && <Text className={cx("step-txt")} text={stepConfig.modalTitle} />}
      <Spacing size={35} />
      {renderComponent(stepConfig)}

      {stepConfig?.name === "rentHousingType" || stepConfig?.name === "isNetAssetOver345M" ? (
        <div className={cx("button-wrap-divide")}>
          <Button
            className={cx("button")}
            title="건너뛰기"
            theme="light"
            onClick={() => router.push("/loan-info-entry", { isRecent: "loan-info-B" })}
          />
          <Button
            className={cx("button")}
            title="다음"
            onClick={() => handleInputComplete(stepConfig?.name ?? "monthlyRent", stepConfig?.id ?? 1)}
            disabled={watchedValues[stepConfig.name] === undefined}
          />
        </div>
      ) : (
        stepConfig?.id !== 4 &&
        stepConfig?.id !== 7 && (
          <Button
            className={cx("button-wrap-focus")}
            subClassName={cx("button-container")}
            disabled={watchedValues[stepConfig.name] === undefined}
            onClick={() =>
              allFieldsFilled
                ? router.push("/loan-info-entry", { isRecent: "loan-info-B" })
                : handleInputComplete(stepConfig?.name ?? "monthlyRent", stepConfig?.id ?? 1)
            }
            bottom={bottomOffset}
            title="다음"
          />
        )
      )}
    </div>
  );
};
