import { useFormContext } from "react-hook-form";
import styles from "../LoanInfoEntryTypeBPage.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
import React, { useEffect, useState } from "react";

import { sendLoanAdviceReportRequest } from "@/models";
import { useInternalRouter } from "@/hooks/useInternalRouter";
import Button from "@/components/shared/Button";
import Text from "@/components/shared/Text";
import { INPUTS } from "./INPUTS";
import Spacing from "@/components/shared/Spacing";

interface StepContentProps {
  step: number;
  maritalStatus: sendLoanAdviceReportRequest["maritalStatus"];
  // isSubmitting: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  inputs: any[];
  allFieldsFilled: boolean;
  handleInputComplete: (name: string, id: number) => void;
}

export const StepContent: React.FC<StepContentProps> = ({
  step,
  inputs,
  maritalStatus,
  // isSubmitting,
  allFieldsFilled,
  handleInputComplete,
}) => {
  const [isKeyboardModalOpen, setIsKeyboardModalOpen] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [bottomOffset, setBottomOffset] = useState(0);

  const { control } = useFormContext();
  const router = useInternalRouter();

  console.log(maritalStatus);

  // 스텝 정보 가져오기
  const stepConfig = inputs.find((input) => input.id === step);

  useEffect(() => {
    const calculateKeyboardHeight = () => {
      const height = (window.innerHeight * 0.4 - 207) / 7;
      setKeyboardHeight(height);

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
  }, [isKeyboardModalOpen]);

  const onClose = () => {
    setTimeout(() => {
      setIsKeyboardModalOpen(false);
    }, 100);
  };

  // // 현재 스텝에 맞는 필드 가져오기control
  const filteredFields =
    maritalStatus !== "SINGLE" ? INPUTS.filter((input) => input.id === 5 || input.id === 10) : [stepConfig];
  console.log(filteredFields);

  const renderComponent = () => {
    if (stepConfig && stepConfig.component) {
      const FieldComponent = stepConfig.component;

      return (
        <FieldComponent
          control={control}
          id={stepConfig.id}
          formFieldName={stepConfig.name}
          options={stepConfig.options}
          unit={stepConfig.unit}
          //   min={stepConfig.limit?.min}
          max={stepConfig.limit?.max}
          onFocus={() => setIsKeyboardModalOpen(true)}
          onBlur={
            stepConfig.name === "houseOwnershipType" || stepConfig.name === "isNetAssetOver345M" || stepConfig.id === 4
              ? () => handleInputComplete(stepConfig?.name, stepConfig?.id)
              : stepConfig.id === 7
                ? () => {
                    handleInputComplete(stepConfig?.name, stepConfig?.id);
                  }
                : onClose
          }
          keyboardHeight={keyboardHeight}
        />
      );
    }
    return null;
  };

  if (stepConfig?.id === 5 || stepConfig?.id === 8) {
    return (
      <>
        {filteredFields.map((field) => (
          <React.Fragment key={field?.id}>
            <div>
              <Text className={cx("step-txt")} text={field?.modalTitle} />
              <Spacing size={35} />
              {renderComponent()}
              {stepConfig?.id !== 4 && (
                <Button
                  className={cx("button-wrap-focus")}
                  subClassName={cx("button-container")}
                  disabled={field?.isValue && field?.value === undefined}
                  onClick={() =>
                    allFieldsFilled
                      ? router.push("/loan-info-entry", { isRecent: "loan-info-B" })
                      : handleInputComplete(field?.name ?? "monthlyRent", field?.id ?? 1)
                  }
                  bottom={bottomOffset}
                  title="다음"
                />
              )}
            </div>
            <Spacing size={50} />
          </React.Fragment>
        ))}
      </>
    );
  }

  return (
    <div>
      {stepConfig && <Text className={cx("step-txt")} text={stepConfig.modalTitle} />}
      <Spacing size={35} />
      {renderComponent()}
      {stepConfig?.name === "houseOwnershipType" ||
        stepConfig?.name === "isNetAssetOver345M" ||
        (stepConfig?.id !== 4 && stepConfig?.id !== 7 && (
          <Button
            className={cx("button-wrap-focus")}
            subClassName={cx("button-container")}
            disabled={stepConfig?.isValue && stepConfig?.value === undefined}
            onClick={() =>
              allFieldsFilled
                ? router.push("/loan-info-entry", { isRecent: "loan-info-B" })
                : handleInputComplete(stepConfig?.name ?? "monthlyRent", stepConfig?.id ?? 1)
            }
            bottom={bottomOffset}
            title="다음"
          />
        ))}
    </div>
  );
};
