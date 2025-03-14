import styles from "./LoanInfoEntryTypeBPage.module.scss";
import { FormProvider, useForm } from "react-hook-form";
import classNames from "classnames/bind";
import { useRecoilState } from "recoil";
const cx = classNames.bind(styles);

import Header from "@/components/sections/Header";
import Spacing from "@/components/shared/Spacing";
import Badge from "@/components/shared/Badge";
import { sendLoanAdvicePreRequest, sendLoanAdviceReportRequest } from "@/models";
import { ProgressPercentage } from "@/components";
import { useInternalRouter } from "@/hooks/useInternalRouter";
import { LoanResult } from "./LoanResult";
import { StepContent } from "./Steps";
import { INPUTS, OptionInputs } from "./Steps/INPUTS";
import { useEffect, useMemo, useState } from "react";
import { FieldValues } from "react-hook-form";
import { SubmitHandler } from "react-hook-form";
import { setAdviceReportData } from "@/utils/localStorage";
import { formData, loanInfoStepState } from "@/recoil/atoms";
import { useSendLoanAdvicePreTerms } from "@/hooks/queries/useSendLoanAdvicePreTerms";
// import { validateFormData } from "@/utils/validateFormData";
import { useSendLoanAdviceReport } from "@/hooks/queries/useSendLoanAdviceReport";
export const LoanInfoEntryTypeBPage = () => {
  const router = useInternalRouter();
  const [currentStep, setCurrentStep] = useRecoilState(loanInfoStepState);
  const [recoilFormData, setRecoilFormData] = useRecoilState<sendLoanAdviceReportRequest>(formData);
  const [inputs, setInputs] = useState(INPUTS);

  const { loanAdvicPreReport, infoItem } = useSendLoanAdvicePreTerms();
  const { loanAdviceReport } = useSendLoanAdviceReport();
  const { maritalStatus } = recoilFormData;
  const methods = useForm({
    defaultValues: recoilFormData,
    mode: "onChange",
    criteriaMode: "all",
  });
  console.log(infoItem);
  console.log(recoilFormData);

  // 필요한 함수들 분해 할당으로 추출
  const {
    handleSubmit,
    formState: { isSubmitting },
    // setFocus,
    getValues,
    // watch,
  } = methods;

  useEffect(() => {
    methods.reset(recoilFormData);
  }, [recoilFormData, methods]);

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.push("/deposit-result"); // 첫 스텝에서 뒤로가기
    }
  };

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
  }, [filteredInputs, recoilFormData, getValues]);

  const handleInputComplete = (name: string, id: number) => {
    const value = getValues(name as keyof sendLoanAdviceReportRequest);
    if (id === 7) {
      setCurrentStep(1);
      setInputs(OptionInputs);
      return;
    }
    // logEvent(name, {
    //   page_title: "./LoanInfoEntryPage",
    //   page_location: window.location.href,
    //   page_path: window.location.pathname,
    // });

    setRecoilFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    const updatedFormData = {
      rentalDeposit: (recoilFormData.rentalDeposit ?? 0) * 10000,
      monthlyRent: (recoilFormData.monthlyRent ?? 0) * 10000,
      cashOnHand: (recoilFormData.cashOnHand ?? 0) * 10000,
      annualIncome: (recoilFormData.annualIncome ?? 0) * 10000,
      spouseAnnualIncome: (recoilFormData.spouseAnnualIncome ?? 0) * 10000,
      age: recoilFormData.age ?? 0,
      maritalStatus: maritalStatus ?? "SINGLE",
      childStatus: recoilFormData.childStatus ?? "NO_CHILD",
      hasNewborn: recoilFormData.hasNewborn ?? false,
      houseOwnershipType: recoilFormData.houseOwnershipType ?? "NO_HOUSE",
      isSMEEmployee: recoilFormData.isSMEEmployee ?? false,
      isNetAssetOver345M: recoilFormData.isNetAssetOver345M ?? false,
    };
    console.log(updatedFormData);
    loanAdvicPreReport(updatedFormData as sendLoanAdvicePreRequest);

    const filteredInputs =
      maritalStatus === "SINGLE" ? INPUTS.filter((input) => input.name !== "spouseAnnualIncome") : INPUTS;

    for (let i = id - 1; i < filteredInputs.length; i++) {
      const nextInput = filteredInputs.find((input) => input.id === i + 2);

      if ((maritalStatus === undefined && id === 5) || id === 5) {
        setCurrentStep(6);
        return;
      }
      if (nextInput) {
        const nextValue = getValues(nextInput.name as keyof sendLoanAdviceReportRequest);
        if (nextValue === undefined || nextValue === null) {
          setCurrentStep(nextInput.id);
          return;
        }
      }
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    // if (!validateFormData(data, setFocus, handleRowClick)) return;

    // setLoading(true);
    const updatedFormData = {
      ...recoilFormData,
      rentalDeposit: (recoilFormData.rentalDeposit ?? 0) * 10000,
      monthlyRent: (recoilFormData.monthlyRent ?? 0) * 10000,
      cashOnHand: (recoilFormData.cashOnHand ?? 0) * 10000,
      annualIncome: (recoilFormData.annualIncome ?? 0) * 10000,
      spouseAnnualIncome: (recoilFormData.spouseAnnualIncome ?? 0) * 10000,
    };
    localStorage.setItem("formData", JSON.stringify(recoilFormData));
    console.log("LoanInfoEntryPage");
    // logEvent("LoanInfoEntryPage", {
    //   page_title: "./LoanInfoEntryPage",
    //   page_location: window.location.href,
    //   page_path: window.location.pathname,
    // });

    setAdviceReportData(JSON.stringify(updatedFormData)); // 비로그인 상태의 리포트 데이터를 저장하기 위함

    loanAdviceReport(updatedFormData as sendLoanAdviceReportRequest);

    await new Promise((r) => setTimeout(r, 5000));
    // setLoading(false);
  };

  return (
    <>
      <ProgressPercentage currentStep={currentStep} length={inputs.length} />
      <Header
        className={cx("cancel")}
        onLeftClick={handlePrevStep}
        left="Back_btn"
        right={inputs.length === 2 && "JumpBtn"}
        onRightClick={() => router.push("/loan-info-entry", { isRecent: "loan-info-B" })}
      />
      <Spacing size={53} />
      <div className={cx("container")}>
        <LoanResult />
        <Spacing size={35} />
        <Badge
          className={cx("button")}
          title={`${inputs.length === 2 ? "추가정보 입력" : ""}${currentStep}/${inputs.length}`}
          theme="light"
        />
        <Spacing size={10} />
        <FormProvider {...methods}>
          <form className={cx("form-container")} onSubmit={handleSubmit(onSubmit)}>
            <StepContent
              step={currentStep}
              maritalStatus={maritalStatus}
              isSubmitting={isSubmitting}
              inputs={inputs}
              handleInputComplete={handleInputComplete}
              allFieldsFilled={allFieldsFilled}
            />
          </form>
        </FormProvider>
      </div>
    </>
  );
};
export default LoanInfoEntryTypeBPage;
