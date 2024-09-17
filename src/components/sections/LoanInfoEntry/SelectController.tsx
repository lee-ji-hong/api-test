import { Control, Controller, FieldValues, Path } from "react-hook-form";
import SelectBottomSheet from "@/components/shared/SelectBottomSheet";

interface Props<ControlType extends FieldValues> {
  formFieldName: Path<ControlType>;
  control: Control<ControlType>;
  modalTitle?: string;
  onClose: () => void;
}

export const SelectController = <ControlType extends FieldValues>({
  onClose,
  formFieldName,
  control,
  modalTitle,
}: Props<ControlType>) => {
  return (
    <>
      <Controller
        name={formFieldName}
        control={control}
        render={({ field }) => (
          <SelectBottomSheet modalTitle={modalTitle} onClose={onClose} onChange={field.onChange} />
        )}
      />
    </>
  );
};
export default SelectController;
