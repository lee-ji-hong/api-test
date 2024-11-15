import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import React, { useState, useEffect, useMemo } from "react";
// import { DevTool } from "@hookform/devtools";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { INPUTS } from "./INPUTS";

import FullScreenMessage from "@/components/sections/FullScreenMessage";
import Header from "@/components/sections/Header";
import Spacing from "@/components/shared/Spacing";
import Button from "@/components/shared/Button";
import Text from "@/components/shared/Text";
import List from "@/components/shared/List";

import { useSendLoanAdviceReport } from "@/hooks/queries/useSendLoanAdviceReport";
import { useInternalRouter } from "@/hooks/useInternalRouter";
import { getUnitForField } from "@/utils/loanAdviceValues";
import { validateFormData } from "@/utils/validateFormData";

import { sendLoanAdviceReportRequest } from "@/models";
import { formData } from "@/recoil/atoms";

import classNames from "classnames/bind";
import styles from "./LoanInfoEntryPage.module.scss";
const cx = classNames.bind(styles);

export const LoanInfoEntryPage = () => {
  const location = useLocation();
  const router = useInternalRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [recoilFormData, setRecoilFormData] = useRecoilState<sendLoanAdviceReportRequest>(formData);
  const isRecent = location.state?.isRecent || false;
  const [loading, setLoading] = useState(false);
  const { loanAdviceReport } = useSendLoanAdviceReport();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setFocus,
    getValues,
    watch,
  } = useForm({
    defaultValues: recoilFormData,
    mode: "onChange",
    criteriaMode: "all",
  });

  useEffect(() => {
    handleRowClick(1);
  }, []);

  const maritalStatus = watch("maritalStatus");
  const filteredInputs = useMemo(() => {
    return INPUTS.filter((input) => {
      if (input.name === "spouseAnnualIncome") {
        return maritalStatus && maritalStatus !== "SINGLE";
      }
      return true;
    });
  }, [maritalStatus]);

  const allFieldsFilled = useMemo(() => {
    return filteredInputs.every((input) => {
      const value = getValues(input.name as keyof sendLoanAdviceReportRequest);
      return value !== undefined && value !== "";
    });
  }, [filteredInputs, recoilFormData]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!validateFormData(data, setFocus, handleRowClick)) return;

    setLoading(true);
    const updatedFormData = {
      ...recoilFormData,
      rentalDeposit: (recoilFormData.rentalDeposit ?? 0) * 10000,
      monthlyRent: (recoilFormData.monthlyRent ?? 0) * 10000,
      cashOnHand: (recoilFormData.cashOnHand ?? 0) * 10000,
      annualIncome: (recoilFormData.annualIncome ?? 0) * 10000,
      spouseAnnualIncome: (recoilFormData.spouseAnnualIncome ?? 0) * 10000,
    };
    localStorage.setItem("formData", JSON.stringify(recoilFormData));
    loanAdviceReport(updatedFormData as sendLoanAdviceReportRequest);
    await new Promise((r) => setTimeout(r, 5000));
    setLoading(false);
  };

  const handleRowClick = (item: number) => {
    setSelectedItem(item);
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedItem(null);
    document.body.style.overflow = "auto";
  };

  const handleInputComplete = (name: string, id: number) => {
    const value = getValues(name as keyof sendLoanAdviceReportRequest);

    setRecoilFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    const filteredInputs =
      maritalStatus === "SINGLE" ? INPUTS.filter((input) => input.name !== "spouseAnnualIncome") : INPUTS;

    for (let i = id - 1; i < filteredInputs.length; i++) {
      const nextInput = filteredInputs.find((input) => input.id === i + 2);

      if ((maritalStatus === undefined && id === 6) || (maritalStatus === "SINGLE" && id === 6)) {
        handleRowClick(8);
        return;
      }
      if (nextInput) {
        const nextValue = getValues(nextInput.name as keyof sendLoanAdviceReportRequest);
        if (nextValue === undefined || nextValue === null) {
          handleRowClick(nextInput.id);
          return;
        }
      }
    }
  };

  if (loading) return <FullScreenMessage type="loading" />;

  return (
    <>
      <Header className={cx("cancel")} onLeftClick={() => router.push("/deposit-result")} left="Back_btn" />
      <Spacing size={53} />
      <div className={cx("container")}>
        <Spacing size={16} />
        <Text className={cx("txt-title")} text={isRecent ? "산출 조건을 적용해주세요" : "당신에게 맞는 대출은?"} />
        <Spacing size={4} />

        <form className={cx("form-container")} onSubmit={handleSubmit(onSubmit)}>
          <List className={cx("list-wrap")}>
            <>
              {filteredInputs?.map((item, ...rest) => {
                const Component = item.component;
                const value = getValues(item.name as keyof sendLoanAdviceReportRequest);
                const value2 = getUnitForField(item.name, value !== undefined ? value : "");
                return (
                  <React.Fragment key={item.id}>
                    <List.Row
                      onClick={() => handleRowClick(item.id)}
                      topText={item.label}
                      right={
                        <Text
                          className={cx(["txt-right", { "txt-empty-color": value === undefined || value === null }])}
                          text={value === undefined || value === null ? "선택하기" : String(value2)}
                        />
                      }
                      withArrow={true}
                    />
                    {modalOpen && selectedItem === item.id && (
                      <Component
                        formFieldName={item.name as keyof sendLoanAdviceReportRequest}
                        control={control}
                        onClose={(isBackdropClick = false) => {
                          handleModalClose();
                          if (!isBackdropClick) {
                            handleInputComplete(item.name, item.id);
                          }
                        }}
                        modalTitle={item.modalTitle}
                        modalSubTitle={item.modalSubTitle}
                        options={item.options}
                        buttonText={item.modalButton!}
                        min={item.limit?.min}
                        max={item.limit?.max}
                        {...rest}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </>
          </List>
          <Spacing size={109} />
          <Button
            className={cx("button-wrap")}
            title={isRecent ? "리포트 다시 산출하기" : "리포트 확인하기"}
            type="submit"
            disabled={isSubmitting || !allFieldsFilled}
          />
        </form>
      </div>
      {/* <DevTool control={control} /> */}
    </>
  );
};
export default LoanInfoEntryPage;
