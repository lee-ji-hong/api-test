import { useRecoilState } from "recoil";
import React, { useState } from "react";
import { DevTool } from "@hookform/devtools";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
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
import { sendLoanAdviceReportRequest } from "@/models";
import { formData } from "@/recoil/atoms";

import classNames from "classnames/bind";
import styles from "./LoanInfoEntryPage.module.scss";
const cx = classNames.bind(styles);

export const LoanInfoEntryPage = () => {
  const router = useInternalRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [recoilFormData, setRecoilFormData] = useRecoilState<sendLoanAdviceReportRequest>(formData);
  const [currentInputIndex, setCurrentInputIndex] = useState(1);
  const [loading, setLoading] = useState(false);
  const { loanAdviceReport } = useSendLoanAdviceReport();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    getValues,
  } = useForm({
    defaultValues: recoilFormData,
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FieldValues> = async () => {
    setLoading(true);
    const updatedFormData = {
      ...recoilFormData,
      rentalDeposit: (recoilFormData.rentalDeposit ?? 0) * 10000,
      monthlyRent: (recoilFormData.monthlyRent ?? 0) * 10000,
      cashOnHand: (recoilFormData.cashOnHand ?? 0) * 10000,
      annualIncome: (recoilFormData.annualIncome ?? 0) * 10000,
      spouseAnnualIncome: (recoilFormData.spouseAnnualIncome ?? 0) * 10000,
    };

    await new Promise((r) => setTimeout(r, 5000));
    loanAdviceReport(updatedFormData as sendLoanAdviceReportRequest);
    setLoading(false);
  };

  const handleRowClick = (item: number) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedItem(null);
  };

  const handleInputComplete = (name: string) => {
    const value = getValues(name as keyof sendLoanAdviceReportRequest);
    setRecoilFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (currentInputIndex < INPUTS.length - 1) {
      setCurrentInputIndex(currentInputIndex + 1);
    }
  };

  if (loading) return <FullScreenMessage type="loading" />;

  return (
    <>
      <Header className={cx("cancel")} onLeftClick={() => router.goBack()} left="Back_btn" />
      <div className={cx("container")}>
        <Spacing size={16} />
        <Text className={cx("txt-title")} text="당신에게 맞는 대출은?" />
        <Spacing size={20} />

        <form className={cx("form-container")} onSubmit={handleSubmit(onSubmit)}>
          <List className={cx("list-wrap")}>
            <>
              {INPUTS?.map((item) => {
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
                          className={cx(["txt-right", value === undefined && "txt-empty-color"])}
                          text={value === undefined ? "선택하기" : String(value2)}
                        />
                      }
                      withArrow={true}
                    />
                    {modalOpen && selectedItem === item.id && (
                      <Component
                        formFieldName={item.name as keyof sendLoanAdviceReportRequest}
                        control={control}
                        onClose={() => {
                          handleModalClose();
                          handleInputComplete(item.name);
                        }}
                        modalTitle={item.modalTitle}
                        modalSubTitle={item.modalSubTitle}
                        options={item.options}
                        buttonText={item.modalButton}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </>
          </List>
          <Spacing size={90} />
          <Button
            className={cx("button-wrap")}
            title="리포트 확인하기"
            type="submit"
            disabled={
              isSubmitting
              // || currentInputIndex < INPUTS.length - 1
            }
          />
        </form>
      </div>
      <DevTool control={control} />
    </>
  );
};
export default LoanInfoEntryPage;
