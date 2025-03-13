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
                  className={cx("option-button")}
                  onClick={(e) => {
                    e.stopPropagation(); // 이벤트 전파 중단
                    handleSelect(value); // 선택 동작 실행
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
