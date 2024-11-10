import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import { OptionItem, OptionsType, sendRepaymentCalcRequest } from "@/models";
import { useRecoilState } from "recoil";
import Section02 from "@/components/shared/Section02";
import Spacing from "@/components/shared/Spacing";
import Button from "@/components/shared/Button";
import { IMAGES } from "@/constants/images";

import { validateFormData } from "./validateFormData";
import { periodState, repaymentCalcState } from "@/recoil/atoms";
// import { getLabelFromOptions } from "@/utils/getLabelFromOptions";
// import { resultState, repaymentOptions } from "./options";
import { INPUTS } from "./INPUTS";

import styles from "../../CalculatorPage.module.scss";
import styles2 from "./LoanAddPage.module.scss";
import classNames from "classnames/bind";
import { useSendRepaymentCalc } from "@/hooks/queries/useSendRepaymentCalc";
import Image from "@/components/shared/Image";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);
const cx2 = classNames.bind(styles2);

const LoanAddPage = () => {
  const [ReapymentCalc] = useRecoilState<sendRepaymentCalcRequest>(repaymentCalcState);
  const [focusedInput, setFocusedInput] = useState("");
  const [isKeyboardModalOpen, setIsKeyboardModalOpen] = useState(false);
  const [, setSelectedBadge] = useRecoilState(periodState);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [bottomOffset, setBottomOffset] = useState(0);
  const { RepaymentCalcInfo } = useSendRepaymentCalc();
  const navigate = useNavigate();

  const inputRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setFocus,
    // reset,
  } = useForm({
    defaultValues: ReapymentCalc,
    values: ReapymentCalc,
    mode: "onChange",
  });

  useEffect(() => {
    const calculateKeyboardHeight = () => {
      if (focusedInput) {
        const height = (window.innerHeight * 0.4 - 207) / 7;
        setKeyboardHeight(height);

        // focusedInput으로 스크롤 이동
        console.log("focusedInput", focusedInput);
        const inputElement = document.getElementById(focusedInput); // 입력 필드에 id가 있어야 함
        console.log("inputElement", inputElement);
        if (inputElement) {
          console.log("inputElement", inputElement);
          inputElement.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    };

    window.addEventListener("resize", calculateKeyboardHeight);
    calculateKeyboardHeight();
    return () => {
      window.removeEventListener("resize", calculateKeyboardHeight);
    };
  }, [isKeyboardModalOpen, focusedInput]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!validateFormData(data, setFocus)) return;

    const updatedFormData = {
      ...data,
      principal: (data.principal ?? 0) * 10000,
      interestRatePercentage: data.interestRatePercentage ?? 0,
      term: data.term ?? 0,
      gracePeriod: data.gracePeriod ?? 0,
      repaymentType: data.repaymentType ?? "",
      maturityPaymentAmount: (data.principal ?? 0) * 10000,
    };
    RepaymentCalcInfo(updatedFormData as sendRepaymentCalcRequest);
  };

  const onClose = () => {
    setIsKeyboardModalOpen(false);
    setFocusedInput("");
  };

  // const handleReset = () => {
  //   reset();
  // };

  const handleBadgeSelect = (item: string) => {
    setSelectedBadge(item);
  };

  return (
    <div>
      <div className={cx2("headerContainer")}>
        <div className={cx2("title")}>DSR 대출 추가</div>
        <div
          className={cx2("cancelButton")}
          onClick={() => {
            navigate("/calculator", {
              state: { calculator: "DSR" }, // 전달할 데이터
            });
          }}>
          <Image className={cx("img-comment")} imageInfo={IMAGES?.Cancel_btn} />
        </div>
      </div>
      <Spacing size={30} />
      <form className={cx("form-container")} onSubmit={handleSubmit(onSubmit)}>
        <>
          {INPUTS.map((item, ...rest) => {
            const Component = item.component;
            const isOptionsType = (options: OptionItem[] | OptionsType | undefined): options is OptionsType => {
              return options !== undefined && "year" in options && "month" in options;
            };
            return (
              <div ref={(el) => (inputRefs.current[item.name] = el)} key={item.id}>
                <Section02 title={item.label} isPeriodBadge={item?.isPeriod} onClick={handleBadgeSelect}>
                  <Component
                    id={item.name}
                    formFieldName={item.name as keyof sendRepaymentCalcRequest}
                    control={control}
                    options={isOptionsType(item.options) ? item.options : (item.options as OptionItem[])}
                    min={item.limit?.min}
                    max={item.limit?.max}
                    unit={item?.unit}
                    formattedAmount={item?.formattedAmount}
                    onFocus={() => {
                      setIsKeyboardModalOpen(true);
                      setFocusedInput(item.name);
                    }}
                    onBlur={onClose}
                    keyboardHeight={focusedInput === item.name ? keyboardHeight : 0}
                    {...rest}
                  />
                </Section02>
              </div>
            );
          })}
          <Spacing size={50} />
          <Button className={cx("button")} title="추가하기" type="submit" disabled={isSubmitting} />
        </>
      </form>
    </div>
  );
};

export default LoanAddPage;
