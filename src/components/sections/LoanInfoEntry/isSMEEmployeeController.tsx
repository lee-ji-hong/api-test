import { Control, Controller, FieldValues, Path } from "react-hook-form";
import SelectBottomSheet from "@/components/shared/SelectBottomSheet";

import classNames from "classnames/bind";
import styles from "@/components/shared/SelectBottomSheet.module.scss";
const cx = classNames.bind(styles);

interface Props<ControlType extends FieldValues> {
  formFieldName: Path<ControlType>;
  control: Control<ControlType>;
  modalTitle?: string;
  modalSubTitle?: string;
  onClose: () => void;
}

const options = [
  { label: "예", value: true },
  { label: "아니요", value: false },
];

export const isSMEEmployeeController = <ControlType extends FieldValues>({
  onClose,
  formFieldName,
  control,
  modalTitle,
  modalSubTitle,
}: Props<ControlType>) => {
  return (
    <>
      <Controller
        name={formFieldName}
        control={control}
        render={({ field }) => {
          const handleSelect = (value: boolean) => {
            field.onChange(value);
            onClose();
          };

          return (
            <SelectBottomSheet modalTitle={modalTitle} modalSubTitle={modalSubTitle} onClose={onClose}>
              {options.map(({ label, value }) => (
                <li key={value.toString()} className={cx("option-button")} onClick={() => handleSelect(value)}>
                  {label}
                </li>
              ))}
            </SelectBottomSheet>
          );
        }}
      />
    </>
  );
};
export default isSMEEmployeeController;