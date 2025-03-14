import { Control, Controller, FieldValues, Path } from "react-hook-form";

import { GlobalPortal } from "@/components/shared/GlobalPortal";
import KeyboardModal from "@/components/modal/KeyboardModal";
import Input from "@/components/shared/Input";
import { MONEY } from "@/constants/money";

import styles from "@/pages/CalculatorPage/CalculatorPage.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

interface Limit {
  value: number;
  ment: string;
}

interface Props<ControlType extends FieldValues> {
  id: number;
  userValue?: number;
  formFieldName: Path<ControlType>;
  control: Control<ControlType>;
  keyboardHeight: number;
  onFocus?: () => void;
  onBlur?: () => void;
  min?: Limit;
  max?: Limit;
  unit?: string;
}

const InputController = <ControlType extends FieldValues>({
  id,
  userValue,
  formFieldName,
  keyboardHeight,
  control,
  min,
  max,
  unit,
  onFocus,
  onBlur,
}: Props<ControlType>) => {
  return (
    <Controller
      name={formFieldName}
      control={control}
      render={({ field }) => {
        const isInvalidValue = field.value <= (min?.value ?? -1) || field.value > (max?.value ?? Infinity);
        const warningMessage = field.value <= (min?.value ?? -1) ? (min?.ment ?? "") : (max?.ment ?? "");
        console.log(userValue, field);
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

        const handleBadgeClick = (label: string) => {
          const filteredMoney = field.name in MONEY ? MONEY[field.name as keyof typeof MONEY] : MONEY.default;
          const item = filteredMoney.find((item) => item.label === label)!;
          if (item) {
            const currentValue = field.value || 0;
            const newValue = currentValue + item.value;
            field.onChange(Math.min(newValue, 99999999));
          }
        };

        return (
          <div className={cx("input-container")}>
            <Input
              id={id.toString()}
              error={isInvalidValue ? true : false}
              value={userValue ?? field.value}
              onChange={field.onChange}
              warningMessage={warningMessage}
              onFocus={onFocus}
              onBlur={onBlur}
              unit={unit}
              ref={field.ref}
            />

            {keyboardHeight > 0 && (
              <GlobalPortal.Consumer>
                <KeyboardModal
                  className={cx("keyboard-container")}
                  onKeyPress={handleKeyPress}
                  isBadge={true}
                  handleBadgeClick={handleBadgeClick}
                  keyboardHeight={keyboardHeight}
                  name={field.name}
                />
              </GlobalPortal.Consumer>
            )}
          </div>
        );
      }}
    />
  );
};

export default InputController;
