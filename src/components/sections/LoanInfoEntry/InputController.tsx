import { Control, Controller, FieldValues, Path } from "react-hook-form";
import InputModal from "@/components/modal/InputModal";
import { MONEY } from "@/constants/money";

interface Limit {
  value: number;
  ment: string;
}
interface Props<ControlType extends FieldValues> {
  formFieldName: Path<ControlType>;
  control: Control<ControlType>;
  modalTitle?: string;
  buttonText: string;
  min?: Limit;
  max?: Limit;
  onClose: () => void;
}

export const InputController = <ControlType extends FieldValues>({
  onClose,
  formFieldName,
  control,
  modalTitle,
  buttonText,
  min,
  max,
}: Props<ControlType>) => {
  return (
    <>
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
              field.onChange(Math.min(field.value * 100, 210000));
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
            const item = MONEY.find((item) => item.label === label)!;
            if (item) {
              const currentValue = field.value || 0;
              const newValue = currentValue + item.value;
              field.onChange(Math.min(newValue, 99999999));
            }
          };

          return (
            <InputModal
              modalTitle={modalTitle}
              buttonText={buttonText}
              error={isInvalidValue ? true : false}
              {...field}
              value={field.value}
              warningMessage={warningMessage}
              onClose={onClose}
              onChange={field.onChange}
              handleKeyPress={handleKeyPress}
              handleBadgeClick={handleBadgeClick}
            />
          );
        }}
      />
    </>
  );
};
export default InputController;
