import { Control, Controller, FieldValues, Path } from "react-hook-form";
import SelectBottomSheet from "@/components/shared/SelectBottomSheet";

interface Props<ControlType extends FieldValues> {
  formFieldName: Path<ControlType>;
  control: Control<ControlType>;
  modalTitle?: string;
  buttonText?: string;
  onClose: () => void;
}

export const SelectContrller = <ControlType extends FieldValues>({
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
          <SelectBottomSheet modalTitle={modalTitle} buttonText={buttonText} {...field} onClose={onClose} />
        )}
      />
    </>
  );
};
export default SelectContrller;
