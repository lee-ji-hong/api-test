import { useForm } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import { OptionItem, OptionsType, sendDSRCalcRequest } from "@/models";
import { useRecoilState, useSetRecoilState } from "recoil";

import SelectBottomSheet from "@/components/modal/SelectBottomSheet";
import Section02 from "@/components/shared/Section02";
import Spacing from "@/components/shared/Spacing";

import { annualIncomeState, periodState } from "@/recoil/atoms";
import { INPUTS } from "./INPUTS";

import styles from "../../../CalculatorPage.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const YearIncomeInput = () => {
  const [focusedInput, setFocusedInput] = useState("");
  const [isKeyboardModalOpen, setIsKeyboardModalOpen] = useState(false);
  const [, setSelectedBadge] = useRecoilState(periodState);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [bottomOffset, setBottomOffset] = useState(0);
  const [toggle, setToggle] = useState(false);

  const inputRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const setValue = useSetRecoilState(annualIncomeState);
  const {
    control,
    watch, // watch 추가
  } = useForm({
    mode: "onChange",
  });

  // watch로 모든 값 모니터링
  const formValues = watch();
  useEffect(() => {
    setValue(formValues.annualIncome);
  }, [formValues]); // 값이 변경될 때마다 실행

  useEffect(() => {
    const calculateKeyboardHeight = () => {
      if (focusedInput) {
        const height = (window.innerHeight * 0.4 - 207) / 7;
        setKeyboardHeight(height);
      }

      if (!isKeyboardModalOpen) {
        setBottomOffset(0);
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

  useEffect(() => {
    const element = inputRefs.current[focusedInput];
    if (element && bottomOffset !== 0) {
      let topPosition = 0;
      if (focusedInput === "interestRate") {
        topPosition = element.getBoundingClientRect().top + window.pageYOffset;
      } else if (focusedInput === "loanTerm") {
        topPosition = element.getBoundingClientRect().top + window.pageYOffset + 70;
      } else {
        topPosition = element.getBoundingClientRect().top + window.pageYOffset + 50;
      }

      window.scrollTo({
        top: topPosition - bottomOffset,
        behavior: "smooth",
      });
    }
  }, [isKeyboardModalOpen, bottomOffset]);

  const onClose = () => {
    setIsKeyboardModalOpen(false);
    setFocusedInput("");
  };

  const handleBadgeSelect = (item: string) => {
    setSelectedBadge(item);
  };

  const content = "매월 얼마씩 갚아야하는지, 대출기간동안 총 상환 금액관 대출이자는 얼마인지 확인해 보세요.";
  return (
    <div>
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
                  formFieldName={item.name as keyof sendDSRCalcRequest}
                  control={control}
                  options={isOptionsType(item.options) ? item.options : (item.options as OptionItem[])}
                  min={item.limit?.min}
                  max={item.limit?.max}
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
      </>
      {isKeyboardModalOpen ? <Spacing size={bottomOffset} /> : <Spacing size={70} />}
      {toggle && (
        <SelectBottomSheet modalTitle="대출 원리금 계산기란?" titleAlign="flex-start" onClose={() => setToggle(false)}>
          <span className={cx("txt-sub")}> {content} </span>
        </SelectBottomSheet>
      )}
    </div>
  );
};

export default YearIncomeInput;
