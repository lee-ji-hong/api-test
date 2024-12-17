import { Control, Controller, FieldValues, Path } from "react-hook-form";

import { GlobalPortal } from "@/components/shared/GlobalPortal";
import CalculatorKeyboardModal from "@/components/modal/CalculatorKeyboardModal";
import Spacing from "@/components/shared/Spacing";
import Badge from "@/components/shared/Badge";
import Input from "@/components/shared/Input";
import { OptionItem, OptionsType } from "@/models";

import styles from "@/pages/CalculatorPage/CalculatorPage.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

interface Limit {
  value: number;
  ment: string;
}

interface Props<ControlType extends FieldValues> {
  id: string;
  userValue?: number;
  formFieldName: Path<ControlType>;
  control: Control<ControlType>;
  keyboardHeight: number;
  onFocus?: () => void;
  onBlur?: () => void;
  options?: OptionItem[] | OptionsType;
  min?: Limit;
  max?: Limit;
  unit?: string;
}

const DotInputController = <ControlType extends FieldValues>({
  id,
  userValue,
  formFieldName,
  keyboardHeight,
  control,
  options,
  min,
  max,
  unit,
  onFocus,
  onBlur,
}: Props<ControlType>) => {
  const isOptionItemArray = (options: OptionItem[] | OptionsType | undefined): options is OptionItem[] => {
    return Array.isArray(options);
  };
  return (
    <Controller
      name={formFieldName}
      control={control}
      render={({ field }) => {
        const isInvalidValue = field.value <= (min?.value ?? -1) || field.value > (max?.value ?? Infinity);
        const warningMessage = field.value <= (min?.value ?? -1) ? (min?.ment ?? "") : (max?.ment ?? "");

        // 키보드 입력 이벤트
        const handleKeyPress = (key: string) => {
          const currentValue = field.value?.toString() || "";
          if (key === "⌫") {
            const newValue = currentValue.slice(0, -1) || "0";
            field.onChange(newValue);
          } else if (key === "00") {
            field.onChange(Math.min(field.value * 100, 99999999));
          } else if (key === "·") {
            if (!currentValue.includes(".")) {
              field.onChange(currentValue === "" ? "0." : currentValue + ".");
            }
          } else {
            const newValue = currentValue === "0" ? key : currentValue + key;
            // const newValue = field.value.toString() + key || 0;
            if (!isNaN(Number(newValue))) {
              field.onChange(newValue); // 문자열로 추가
            }
            // const numKey = parseInt(key, 10);
            // if (!isNaN(numKey)) {
            //   const currentValue = field.value || 0;
            //   const newValue = currentValue * 10 + numKey;
            //   field.onChange(Math.min(newValue, 99999999));
            // }
          }
        };

        // 금액 뱃지 이벤트
        const handleBadgeClick = (label: string) => {
          if (isOptionItemArray(options)) {
            const item = options?.find((item) => item.label === label);
            if (item && typeof item.value === "number") {
              const currentValue = field.value || 0;
              const newValue = currentValue + item.value;
              field.onChange(Math.min(newValue, 99999999));
            }
          }
        };

        const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, label: string) => {
          e.preventDefault();
          handleBadgeClick(label);
        };

        return (
          <div className={cx("input-container")}>
            <Input
              id={id}
              error={isInvalidValue ? true : false}
              value={userValue ?? field.value}
              onChange={field.onChange}
              warningMessage={warningMessage}
              onFocus={onFocus}
              onBlur={onBlur}
              unit={unit}
              ref={field.ref}
              // {...field}
            />
            <Spacing size={12} />
            <div className={cx("badge-container")}>
              {isOptionItemArray(options) &&
                options?.map(({ label, value }) => (
                  <Badge
                    className={cx("button")}
                    key={value.toString()}
                    title={label}
                    onClick={(e) => handleClick(e, label)}
                  />
                ))}
            </div>
            {keyboardHeight > 0 && (
              <GlobalPortal.Consumer>
                <CalculatorKeyboardModal
                  className={cx("keyboard-container")}
                  onKeyPress={handleKeyPress}
                  keyboardHeight={keyboardHeight}
                />
              </GlobalPortal.Consumer>
            )}
          </div>
        );
      }}
    />
  );
};

export default DotInputController;
