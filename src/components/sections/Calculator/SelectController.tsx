import { Control, Controller, FieldValues, Path } from "react-hook-form";

import Badge from "@/components/shared/Badge";

import styles from "@/pages/CalculatorPage/CalculatorPage.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

interface Props<ControlType extends FieldValues> {
  formFieldName: Path<ControlType>;
  control: Control<ControlType>;
  options?: { label: string; value: boolean | string }[];
}

const SelectController = <ControlType extends FieldValues>({ formFieldName, control, options }: Props<ControlType>) => {
  return (
    <Controller
      name={formFieldName}
      control={control}
      render={({ field }) => {
        const handleSelect = (value: boolean | string) => {
          field.onChange(value);
        };

        return (
          <div className={cx("button-container")}>
            {options?.map(({ label, value }) => (
              <Badge
                className={cx("button")}
                key={value.toString()}
                title={label}
                onClick={() => handleSelect(value)}
                theme={field.value === value ? "blue" : "primary"}
              />
            ))}
          </div>
        );
      }}
    />
  );
};

export default SelectController;
