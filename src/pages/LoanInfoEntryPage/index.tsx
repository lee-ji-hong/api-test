import { useRecoilState } from "recoil";
import React, { useState } from "react";
import { DevTool } from "@hookform/devtools";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { INPUTS } from "./INPUTS";

import Header from "@/components/sections/Header";
import Spacing from "@/components/shared/Spacing";
import Button from "@/components/shared/Button";
import Text from "@/components/shared/Text";
import List from "@/components/shared/List";

import { useSendLoanAdviceReport } from "@/hooks/queries/useSendLoanAdviceReport";
import { useInternalRouter } from "@/hooks/useInternalRouter";
import { formData } from "@/recoil/atoms";
import { sendLoanAdviceReportRequest } from "@/models";

import classNames from "classnames/bind";
import styles from "./LoanInfoEntryPage.module.scss";
const cx = classNames.bind(styles);

export const LoanInfoEntryPage = () => {
  const router = useInternalRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [recoilFormData, setRecoilFormData] = useRecoilState<sendLoanAdviceReportRequest>(formData);
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

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // setRecoilFormData(getValues());
    setRecoilFormData((prevState) => ({
      ...prevState,
      ...data,
    }));
    console.log(recoilFormData); // 디버깅용 콘솔 로그 추가
    console.log("폼이 제출되었습니다.", data); // 디버깅용 콘솔 로그 추가
    await new Promise((r) => setTimeout(r, 1000));
    loanAdviceReport(data as sendLoanAdviceReportRequest);
    alert(JSON.stringify(getValues()));
  };

  const handleRowClick = (item: number) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedItem(null);
  };

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
                return (
                  <React.Fragment key={item.id}>
                    <List.Row
                      onClick={() => handleRowClick(item.id)}
                      topText={item.label}
                      right={
                        <Text
                          className={cx(["txt-right", value === undefined && "txt-empty-color"])}
                          text={value === undefined ? "선택하기" : String(value)}
                        />
                      }
                      withArrow={true}
                    />
                    {modalOpen && selectedItem === item.id && (
                      <Component
                        formFieldName={item.name as keyof sendLoanAdviceReportRequest}
                        control={control}
                        onClose={handleModalClose}
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
            title="맞춤형 전월세대출 더 알아보기"
            type="submit"
            disabled={isSubmitting}
          />
        </form>
      </div>
      <DevTool control={control} />
    </>
  );
};
export default LoanInfoEntryPage;
