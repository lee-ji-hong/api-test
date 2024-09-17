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
        render={({ field }) => (
          <InputModal modalTitle={modalTitle} buttonText={buttonText} {...field} onClose={onClose} />
        )}
      />
    </>
  );
};
export default InputController;
