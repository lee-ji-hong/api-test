import { Control, Controller, FieldValues, Path } from "react-hook-form";
import SelectBottomSheet from "@/components/shared/SelectBottomSheet";
import WheelAgePicker from "@/components/shared/WheelAgePicker";

interface Props<ControlType extends FieldValues> {
  formFieldName: Path<ControlType>;
  control: Control<ControlType>;
  modalTitle?: string;
  onClose: () => void;
}

export const WheelContrller = <ControlType extends FieldValues>({
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
        render={({ field }) => {
          // const handleSelect = (value: number) => {
          //   field.onChange(value);
          //   onClose();
          // };

          return (
            <SelectBottomSheet modalTitle={modalTitle} onClose={onClose}>
              <WheelAgePicker
                initialValue={19}
                onChange={(value) => {
                  field.onChange(value);
                  onClose;
                }}
              />
            </SelectBottomSheet>
          );
        }}
      />
    </>
  );
};
export default WheelContrller;
