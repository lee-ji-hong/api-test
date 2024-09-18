import { Control, Controller, FieldValues, Path } from "react-hook-form";
import AddressSearchInputModal from "@/components/shared/AddressSearchInputModal";

interface Props<ControlType extends FieldValues> {
  formFieldName: Path<ControlType>;
  control: Control<ControlType>;
  modalTitle?: string;
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
        render={({ field }) => <AddressSearchInputModal modalTitle={modalTitle} {...field} onClose={onClose} />}
      />
    </>
  );
};
export default AddressSearchInputControllter;