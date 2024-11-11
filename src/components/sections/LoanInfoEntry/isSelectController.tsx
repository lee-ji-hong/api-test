import { Control, Controller, FieldValues, Path } from "react-hook-form";
import SelectBottomSheet from "@/components/modal/SelectBottomSheet";

import classNames from "classnames/bind";
import styles from "@/components/modal/SelectBottomSheet/SelectBottomSheet.module.scss";
const cx = classNames.bind(styles);

interface Props<ControlType extends FieldValues> {
  formFieldName: Path<ControlType>;
  control: Control<ControlType>;
  modalTitle?: string;
  modalSubTitle?: string;
  options?: { label: string; value: boolean | string }[];
  onClose: () => void;
}

export const isSelectController = <ControlType extends FieldValues>({
  onClose,
  formFieldName,
  control,
  modalTitle,
  modalSubTitle,
  options,
}: Props<ControlType>) => {
  return (
    <>
      <Controller
        name={formFieldName}
        control={control}
        render={({ field }) => {
          const handleSelect = (value: boolean | string) => {
            field.onChange(value);
            onClose();
          };

          return (
            <SelectBottomSheet modalTitle={modalTitle} modalSubTitle={modalSubTitle} onClose={onClose}>
              {options?.map(({ label, value }) => (
                <li
                  key={value.toString()}
                  className={cx("option-button")}
                  onClick={(e) => {
                    e.stopPropagation(); // 이벤트 전파 중단
                    handleSelect(value); // 선택 동작 실행
                  }}>
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
export default isSelectController;
