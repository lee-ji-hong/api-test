import { useFormContext, useWatch } from "react-hook-form";
import React, { useEffect, useState } from "react";

import styles from "../LoanInfoEntryTypeBPage.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

import { sendLoanAdviceReportRequest } from "@/models";
import { useInternalRouter } from "@/hooks/useInternalRouter";
import Button from "@/components/shared/Button";
import Text from "@/components/shared/Text";
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
  const [bottomOffset, setBottomOffset] = useState(0);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const { control } = useFormContext();
  const watchedValues = useWatch({ control });
  const router = useInternalRouter();
  // const keyboardHeight = (window.innerHeight * 0.4 - 207) / 7;
  // 스텝 정보 가져오기
  const stepConfig = inputs.find((input) => input.id === step);
  const isInput =
    stepConfig?.id === 1 || stepConfig?.id === 2 || stepConfig?.id === 5 || stepConfig?.name === "spouseAnnualIncome";

  console.log(window.innerWidth);
  console.log(window.innerHeight);
  console.log(keyboardHeight);
  useEffect(() => {
    const calculateKeyboardHeight = () => {
      if (isInput) {
        if (window.innerWidth < 380) {
          setBottomOffset(window.innerHeight * 0.4 + 20);
          setKeyboardHeight((window.innerHeight * 0.4 - 207) / 10);
        } else if (window.innerWidth >= 380) {
          setBottomOffset(window.innerHeight * 0.4 + 35);
          setKeyboardHeight((window.innerHeight * 0.4 - 207) / 8);
          // setKeyboardHeight(7.5);
        }
      } else if (!isInput) {
        setBottomOffset(34);
        setKeyboardHeight(0);
      }
    };

    window.addEventListener("resize", calculateKeyboardHeight);
    calculateKeyboardHeight();
    return () => {
      window.removeEventListener("resize", calculateKeyboardHeight);
    };
  }, [isInput, selectedItem]);

  useEffect(() => {
    if (stepConfig?.id === 6 && maritalStatus === "SINGLE") {
      handleInputComplete("maritalStatus", 4);
    }
  }, [stepConfig]);

  const onClose = () => {
    setTimeout(() => {
      setSelectedItem(null);
    }, 100);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderComponent = (stepConfig: any) => {
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
          }}
          onBlur={
            stepConfig.id === 7 || stepConfig.id === 4
              ? () => handleInputComplete(stepConfig?.name, stepConfig?.id)
              : onClose
          }
          keyboardHeight={keyboardHeight}
          // keyboardHeight={selectedItem === stepConfig.id && keyboardHeight}
        />
      );
    }
    return null;
  };

  return (
    <div>
      {stepConfig && <Text className={cx("step-txt")} text={stepConfig.modalTitle} />}
      <Spacing size={30} />
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
            onClick={() => {
              if (allFieldsFilled) {
                router.push("/loan-info-entry", { isRecent: "loan-info-B" });
              } else if (stepConfig.id === 5 && maritalStatus === "SINGLE") {
                handleInputComplete("spouseAnnualIncome", 6);
              } else {
                handleInputComplete(stepConfig?.name ?? "monthlyRent", stepConfig?.id ?? 1);
              }
            }}
            bottom={bottomOffset}
            title="다음"
          />
        )
      )}
    </div>
  );
};
