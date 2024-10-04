import { Control, Controller, FieldValues, Path } from "react-hook-form";
import InputModal from "@/components/shared/InputModal";

interface Props<ControlType extends FieldValues> {
  formFieldName: Path<ControlType>;
  control: Control<ControlType>;
  modalTitle?: string;
  buttonText?: string;
  onClose: () => void;
}

export const InputController = <ControlType extends FieldValues>({
  onClose,
  formFieldName,
  control,
  modalTitle,
  buttonText,
}: Props<ControlType>) => {
  return (
    <>
      <Controller
        name={formFieldName}
        control={control}
        render={({ field }) => {
          const isInvalidValue = field.value > 0 && (field.value <= 100 || field.value > 200000);
          const warningMessage =
            field.value === 0
              ? ""
              : field.value <= 100
                ? "보증금은 100만원 이상이어야 합니다."
                : "보증금은 20억원을 초과할 수 없습니다.";
          const handleKeyPress = (key: string) => {
            console.log(key);
            if (key === "⌫") {
              field.onChange(Math.floor(field.value / 10));
            } else {
              const numKey = parseInt(key, 10);
              if (!isNaN(numKey)) {
                const currentValue = field.value || 0;
                const newValue = currentValue * 10 + numKey;
                field.onChange(Math.min(newValue, 210000));
              }
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
            />
          );
        }}
      />
    </>
  );
};
export default InputController;
