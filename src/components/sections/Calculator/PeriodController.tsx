import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { useRecoilValue } from "recoil";

import { GlobalPortal } from "@/components/shared/GlobalPortal";
import KeyboardModal from "@/components/modal/KeyboardModal";
import Spacing from "@/components/shared/Spacing";
import Badge from "@/components/shared/Badge";
import Input from "@/components/shared/Input";
import { periodState } from "@/recoil/atoms";
import { OptionItem, OptionsType } from "@/models";
import styles from "@/pages/CalculatorPage/CalculatorPage.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

interface Limit {
  value: number;
  ment: string;
}

interface Props<ControlType extends FieldValues> {
  formFieldName: Path<ControlType>;
  control: Control<ControlType>;
  keyboardHeight: number;
  onFocus?: () => void;
  onBlur?: () => void;
  options?: OptionItem[] | OptionsType;
  formattedAmount?: boolean;
  min?: Limit;
  max?: Limit;
}

const PeriodController = <ControlType extends FieldValues>({
  formFieldName,
  formattedAmount,
  keyboardHeight,
  control,
  options,
  min,
  max,
  onFocus,
  onBlur,
}: Props<ControlType>) => {
  const selectedBadge = useRecoilValue(periodState);
  const isOptionsType = (options: OptionItem[] | OptionsType | undefined): options is OptionsType => {
    return options !== undefined && "year" in options && "month" in options;
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
          if (key === "⌫") {
            field.onChange(Math.floor(field.value / 10));
          } else if (key === "00") {
            field.onChange(Math.min(field.value * 100, 99999999));
          } else {
            const numKey = parseInt(key, 10);
            if (!isNaN(numKey)) {
              const currentValue = field.value || 0;
              const newValue = currentValue * 10 + numKey;
              field.onChange(Math.min(newValue, 99999999));
            }
          }
        };

        // 금액 뱃지 이벤트
        const handleBadgeClick = (label: string) => {
          if (isOptionsType(options)) {
            const item = (selectedBadge === "년" ? options?.year : options?.month)?.find(
              (item) => item.label === label,
            );
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
          <>
            <div className={cx("input-container")}>
              <Input
                error={isInvalidValue ? true : false}
                value={field.value}
                onChange={field.onChange}
                warningMessage={warningMessage}
                onFocus={onFocus}
                onBlur={onBlur}
                unit={selectedBadge === "년" ? "년" : "개월"}
                formattedAmount={formattedAmount}
                ref={field.ref}
                // {...field}
              />
              <Spacing size={12} />
              <div className={cx("badge-container")}>
                {isOptionsType(options) &&
                  (selectedBadge === "년" ? options?.year : options?.month)?.map(({ label, value }) => (
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
                  <KeyboardModal
                    className={cx("keyboard-container")}
                    onKeyPress={handleKeyPress}
                    keyboardHeight={keyboardHeight}
                  />
                </GlobalPortal.Consumer>
              )}
            </div>
          </>
        );
      }}
    />
  );
};

export default PeriodController;
