import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { AddressSearchInputModal } from "@/components";

interface Props<ControlType extends FieldValues> {
  formFieldName: Path<ControlType>;
  control: Control<ControlType>;
  modalTitle?: string | undefined;
  onClose: () => void;
}

export const AddressSearchInputControllter = <ControlType extends FieldValues>({
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
        render={({ field }) => <AddressSearchInputModal modalTitle={modalTitle} onClose={onClose} {...field} />}
      />
    </>
  );
};
export default AddressSearchInputControllter;
