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
  isSubmitting: boolean;
  allFieldsFilled: boolean;
  handleInputComplete: (name: string, id: number) => void;
}

export const StepContent: React.FC<StepContentProps> = ({
  step,
  maritalStatus,
  isSubmitting,
  allFieldsFilled,
  handleInputComplete,
}) => {
  const [isKeyboardModalOpen, setIsKeyboardModalOpen] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [bottomOffset, setBottomOffset] = useState(0);
  const { control } = useFormContext();
  const router = useInternalRouter();

  console.log(maritalStatus);
  // 현재 스텝에 맞는 필드 가져오기
  //   const fields = INPUTS.filter((input) => {
  //     if (input.name === "spouseAnnualIncome") {
  //       return maritalStatus && maritalStatus !== "SINGLE";
  //     }
  //     return true;
  //   });

  // 스텝 정보 가져오기
  const stepConfig = INPUTS.find((input) => input.id === step);

  useEffect(() => {
    const calculateKeyboardHeight = () => {
      const height = (window.innerHeight * 0.4 - 207) / 7;
      setKeyboardHeight(height);

      if (!isKeyboardModalOpen) {
        setBottomOffset(34);
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

  const onClose = () => {
    setTimeout(() => {
      setIsKeyboardModalOpen(false);
    }, 100);
  };

  const renderComponent = () => {
    if (stepConfig && stepConfig.component) {
      const FieldComponent = stepConfig.component;

      return (
        // <FieldComponent
        //   control={control}
        //   label={stepConfig.label}
        //   modalTitle={stepConfig.modalTitle}
        //   modalButton={stepConfig.modalButton}
        //   options={stepConfig.options}
        //   limit={stepConfig.limit}
        //   isValue={stepConfig.isValue}
        //   //   {...rest}
        // />

        <FieldComponent
          control={control}
          id={stepConfig.id}
          formFieldName={stepConfig.name}
          options={stepConfig.options}
          //   min={stepConfig.limit?.min}
          max={stepConfig.limit?.max}
          onFocus={() => setIsKeyboardModalOpen(true)}
          onBlur={stepConfig.id === 4 ? () => handleInputComplete(stepConfig?.name, stepConfig?.id) : onClose}
          keyboardHeight={keyboardHeight}
          //   {...rest}
        />
      );
    }
    return null;
  };

  console.log(stepConfig);
  return (
    <div>
      {stepConfig && <Text className={cx("step-txt")} text={stepConfig.modalTitle} />}
      <Spacing size={35} />
      {renderComponent()}
      {stepConfig?.id !== 4 && (
        <Button
          className={cx("button-wrap-focus")}
          subClassName={cx("button-container")}
          disabled={isSubmitting}
          onClick={() =>
            allFieldsFilled
              ? router.push("/loan-info-entry", { isRecent: "loan-info-B" })
              : handleInputComplete(stepConfig?.name, stepConfig?.id)
          }
          bottom={bottomOffset}
          title="다음"
        />
      )}
    </div>
  );
};
