import { Control, Controller, FieldValues, Path } from "react-hook-form";
import BottomSheet from "@/components/modal/BottomSheet";
import WheelAgePicker from "@/components/shared/WheelAgePicker";

interface Props<ControlType extends FieldValues> {
  formFieldName: Path<ControlType>;
  control: Control<ControlType>;
  modalTitle?: string;
  buttonText: string;
  onClose: () => void;
}

export const WheelContrller = <ControlType extends FieldValues>({
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
          <BottomSheet modalTitle={modalTitle} buttonText={buttonText} onClose={onClose}>
            <WheelAgePicker
              initialValue={9}
              onChange={(value) => {
                field.onChange(value);
                onClose;
              }}
            />
          </BottomSheet>
        )}
      />
    </>
  );
};
export default WheelContrller;
