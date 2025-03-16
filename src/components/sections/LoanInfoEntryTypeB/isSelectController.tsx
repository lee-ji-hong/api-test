import { Control, Controller, FieldValues, Path } from "react-hook-form";

import classNames from "classnames/bind";
import styles from "@/pages/LoanInfoEntryTypeBPage/LoanInfoEntryTypeBPage.module.scss";
const cx = classNames.bind(styles);

interface Props<ControlType extends FieldValues> {
  formFieldName: Path<ControlType>;
  control: Control<ControlType>;
  modalTitle?: string;
  modalSubTitle?: string;
  options?: { label: string; value: boolean | string }[];
  onBlur: () => void;
}

export const isSelectController = <ControlType extends FieldValues>({
  onBlur,
  formFieldName,
  control,
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
            onBlur();
          };

          return (
            <ul className={cx("options")}>
              {options?.map(({ label, value }) => (
                <li
                  key={value.toString()}
                  className={cx("option-button", {
                    selected: field.value === value,
                  })}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(value);
                  }}>
                  {label}
                </li>
              ))}
            </ul>
          );
        }}
      />
    </>
  );
};
export default isSelectController;
